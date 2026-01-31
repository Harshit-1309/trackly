const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStoreOriginal = require("connect-mongo");
const MongoStore = (typeof MongoStoreOriginal.create === 'function') ? MongoStoreOriginal : MongoStoreOriginal.default;
const crypto = require("crypto");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const UserModel = require("./model/User");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet({
    contentSecurityPolicy: false, // Turn off for now to avoid breaking existing setups
}));
app.use(compression());
app.use(morgan("combined")); // Standard production logging

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB");
        // One-time migration to rename Task ID prefix from GT to SR
        try {
            const TaskModel = require("./model/Task");
            const tasksToUpdate = await TaskModel.find({ taskId: { $regex: /^GT/ } });
            if (tasksToUpdate.length > 0) {
                console.log(`Migrating ${tasksToUpdate.length} tasks from GT to SR prefix...`);
                for (const task of tasksToUpdate) {
                    const newTaskId = task.taskId.replace("GT", "SR");
                    await TaskModel.findByIdAndUpdate(task._id, { taskId: newTaskId });
                }
                console.log("Migration completed successfully.");
            }
        } catch (err) {
            console.error("Migration failed:", err);
        }
    })
    .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(
    cors({
        origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
    })
);

app.use(session({
    name: 'timetracker.sid',
    secret: process.env.SESSION_SECRET || '12345',
    resave: true, 
    saveUninitialized: false, 
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 24 * 60 * 60
    }),
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Enable secure in production
        sameSite: 'lax',
        path: '/'
    }
}));

// V11: Localhost Optimization Logging
app.use((req, res, next) => {
    if (req.url.startsWith('/')) {
        console.log(`[V11: ${new Date().toLocaleTimeString()}] ${req.method} ${req.url} | SID: ${req.sessionID.substring(0,8)} | Auth: ${!!req.session.user}`);
    }
    next();
});

// Auth middleware
const authenticate = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.id) {
        next();
    } else {
        console.log(`[V11 AUTH FAILED] ${req.method} ${req.url} | SID: ${req.sessionID.substring(0,8)}`);
        res.status(401).json({ error: "Unauthorized", sessionId: req.sessionID });
    }
};

app.get("/check-session", (req, res) => {
    res.json({
        sessionId: req.sessionID,
        authenticated: !!req.session.user,
        role: req.session?.user?.role || 'NONE',
        user: req.session?.user || null
    });
});

app.listen(process.env.PORT, () => {
    console.log(`[V11] Server is running on port ${process.env.PORT} (Localhost Only)`);
});

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, empId, contactNo, addAsConsultant } = req.body;
        if (!email || !password || !name || !empId) {
            return res.status(400).json({ error: "Required fields missing" });
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const existingEmpId = await UserModel.findOne({ empId });
        if (existingEmpId) {
            return res.status(400).json({ error: "Employee ID already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            empId,
            contactNo,
            role: req.body.role || "user",
            profileImage: req.body.profileImage || ""
        });
        const savedUser = await newUser.save();

        if (addAsConsultant === "true") {
            try {
                // Generate unique 5-digit alphanumeric ID
                let consultantId;
                let isUnique = false;
                while (!isUnique) {
                    consultantId = crypto.randomBytes(3).toString('hex').slice(0, 5).toUpperCase();
                    const existingConsultant = await ConsultantModel.findOne({ consultantId });
                    if (!existingConsultant) isUnique = true;
                }

                // Check if email already exists in consultant table
                const existingConsultantEmail = await ConsultantModel.findOne({ email });
                if (!existingConsultantEmail) {
                    const newConsultant = new ConsultantModel({
                        consultantId,
                        name,
                        email
                    });
                    await newConsultant.save();
                }
            } catch (consError) {
                console.error("Error creating consultant during signup:", consError);
                // We don't fail the user creation if consultant creation fails, 
                // but we might want to log it or handle it.
            }
        }

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for email:", email);
        const user = await UserModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        if (user) {
            console.log("User found in DB:", user.email);
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log("Password match result:", passwordMatch);
            if (passwordMatch) {
                req.session.user = {
                    id: user._id.toString(), // CRITICAL: Store as string
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    empId: user.empId,
                    contactNo: user.contactNo,
                    profileImage: user.profileImage || ""
                };
                req.session.save((err) => {
                    if (err) {
                        console.error("Session save error:", err);
                        return res.status(500).json({ error: "Session save error" });
                    }
                    console.log("Session saved successfully for user:", user.name);
                    res.json({ status: "Success", role: user.role, user: req.session.user });
                });
            } else {
                res.status(401).json({ error: "Password doesn't match" });
            }
        } else {
            res.status(404).json({ error: "No Records found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ error: "Failed to logout" });
            } else {
                res.status(200).json("Logout successful");
            }
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});

app.get("/user", async (req, res) => {
    if (req.session.user) {
        try {
            const user = await UserModel.findById(req.session.user.id);
            if (user) {
                req.session.user = {
                    id: user._id.toString(), // Ensure string
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    empId: user.empId,
                    contactNo: user.contactNo,
                    profileImage: user.profileImage || ""
                };
                req.session.save(() => {
                    res.json({ user: req.session.user });
                });
            } else {
                req.session.destroy();
                res.status(401).json({ error: "Not authenticated - User not found" });
            }
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    } else {
        res.status(401).json({ error: "Not authenticated - No user in session" });
    }
});

app.get("/users", async (req, res) => {
    try {
        console.log(`[/users] SID: ${req.sessionID.substring(0,8)} | Auth: ${!!req.session.user} | Role: ${req.session?.user?.role || 'NONE'}`);
        if (!req.session.user || req.session.user.role !== 'admin') {
            console.log(`Unauthorized access attempt to /users by: ${req.session.user?.email || 'unauthenticated user'}`);
            return res.status(401).json({ error: "Unauthorized - Admin only" });
        }
        const users = await UserModel.find({}, { password: 0 }).sort({ name: 1 }); // Exclude passwords, sort by name
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/test-auth", (req, res) => {
    res.json({ session: !!req.session, user: req.session.user || "No user in session" });
});

app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, empId, contactNo, profileImage } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { name, email, role, empId, contactNo, profileImage },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch("/users/:id/password", async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.findByIdAndUpdate(id, { password: hashedPassword });
        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const CustomerModel = require("./model/Customer");
const TaskModel = require("./model/Task");
const ConsultantModel = require("./model/Consultant");
const ContractModel = require("./model/Contract");
const ProductModel = require("./model/Product");

app.get("/consultants", async (req, res) => {
    try {
        const consultants = await ConsultantModel.find();
        res.json(consultants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/consultants", async (req, res) => {
    try {
        const { consultantId, name, email } = req.body;
        const newConsultant = new ConsultantModel({ consultantId, name, email });
        await newConsultant.save();
        res.status(201).json(newConsultant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/consultants/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { consultantId, name, email } = req.body;
        const updatedConsultant = await ConsultantModel.findByIdAndUpdate(
            id,
            { consultantId, name, email },
            { new: true }
        );
        res.json(updatedConsultant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/consultants/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await ConsultantModel.findByIdAndDelete(id);
        res.json({ message: "Consultant deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/customers", async (req, res) => {
    try {
        const {
            customerId,
            name,
            email,
            address,
            channelPartnerName,
            phone,
            billingEmail,
            country,
        } = req.body;

        // Auto-generate customerId if not provided (random 5-digit)
        let finalCustomerId = customerId;
        if (!finalCustomerId || finalCustomerId === "") {
            const prefix = (name || "CUS").slice(0, 3).toUpperCase();
            let isUnique = false;
            while (!isUnique) {
                const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
                finalCustomerId = `${prefix}${randomDigits}`;
                const existing = await CustomerModel.findOne({ customerId: finalCustomerId });
                if (!existing) isUnique = true;
            }
        }

        const newCustomer = new CustomerModel({
            customerId: finalCustomerId,
            name,
            email,
            address,
            channelPartnerName,
            phone,
            billingEmail,
            country,
        });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/customers", async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/customers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            customerId,
            name,
            email,
            address,
            channelPartnerName,
            phone,
            billingEmail,
            country,
        } = req.body;
        const updatedCustomer = await CustomerModel.findByIdAndUpdate(
            id,
            { customerId, name, email, address, channelPartnerName, phone, billingEmail, country },
            { new: true }
        );
        res.json(updatedCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/customers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await CustomerModel.findByIdAndDelete(id);
        res.json({ message: "Customer deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/products", async (req, res) => {
    try {
        const { productId, name, description } = req.body;

        // Auto-generate productId if not provided (random 5-digit)
        let finalProductId = productId;
        if (!finalProductId || finalProductId === "") {
            const prefix = (name || "PRO").slice(0, 3).toUpperCase();
            let isUnique = false;
            while (!isUnique) {
                const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
                finalProductId = `${prefix}${randomDigits}`;
                const existing = await ProductModel.findOne({ productId: finalProductId });
                if (!existing) isUnique = true;
            }
        }

        const newProduct = new ProductModel({ productId: finalProductId, name, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, name, description } = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            { productId, name, description },
            { new: true }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await ProductModel.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/contracts", async (req, res) => {
    try {
        const { 
            contractId, 
            contractName, 
            contractType, 
            startDate, 
            endDate, 
            product,
            contractNumber,
            contractStatus,
            effectiveDate,
            renewalType,
            supportLevel,
            supportHours,
            includedTickets,
            excludedServices,
            usageLimit,
            customer
        } = req.body;

        // Auto-generate contractId if not provided (random 5-digit)
        let finalContractId = contractId;
        if (!finalContractId || finalContractId === "") {
            const prefix = (contractName || "CON").slice(0, 3).toUpperCase();
            let isUnique = false;
            while (!isUnique) {
                const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
                finalContractId = `${prefix}${randomDigits}`;
                const existing = await ContractModel.findOne({ contractId: finalContractId });
                if (!existing) isUnique = true;
            }
        }

        const newContract = new ContractModel({
            contractId: finalContractId,
            contractName,
            contractType,
            startDate,
            endDate,
            product: product || null,
            contractNumber,
            contractStatus,
            effectiveDate,
            renewalType,
            supportLevel,
            supportHours,
            includedTickets,
            excludedServices,
            usageLimit,
            usageConsumed: 0,
            usageLeft: usageLimit || 0,
            customer: customer || null,
        });
        await newContract.save();
        res.status(201).json(newContract);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/contracts", async (req, res) => {
    try {
        const contracts = await ContractModel.find()
            .populate("product", "name")
            .populate("customer", "name");
        
        const contractsWithUsage = await Promise.all(contracts.map(async (contract) => {
            const tasks = await TaskModel.find({ contract: contract._id });
            const usageConsumed = tasks.reduce((sum, task) => sum + (Number(task.timeTaken) || 0), 0);
            const usageLeft = (contract.usageLimit || 0) - usageConsumed;
            
            // Convert to object and add calculated fields
            const contractObj = contract.toObject();
            return {
                ...contractObj,
                usageConsumed,
                usageLeft
            };
        }));

        res.json(contractsWithUsage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/contracts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            contractId, 
            contractName, 
            contractType, 
            startDate, 
            endDate, 
            product,
            contractNumber,
            contractStatus,
            effectiveDate,
            renewalType,
            supportLevel,
            supportHours,
            includedTickets,
            excludedServices,
            usageLimit,
            customer
        } = req.body;
        const updatedContract = await ContractModel.findByIdAndUpdate(
            id,
            { 
                contractId, 
                contractName, 
                contractType, 
                startDate, 
                endDate, 
                product: product || null,
                contractNumber,
                contractStatus,
                effectiveDate,
                renewalType,
                supportLevel,
                supportHours,
                includedTickets,
                excludedServices,
                usageLimit,
                // We don't update usageConsumed/usageLeft manually here anymore
                customer: customer || null,
            },
            { new: true }
        );
        res.json(updatedContract);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/contracts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await ContractModel.findByIdAndDelete(id);
        res.json({ message: "Contract deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/tasks", authenticate, async (req, res) => {
    try {
        const {
            customer,
            consultant,
            description,
            startTime,
            endTime,
            timeTaken,
            status,
            contract,
            createdBy,
        } = req.body;
        const tasks = await TaskModel.find({}, { taskId: 1 });
        let maxId = 0;
        tasks.forEach(t => {
            if (t.taskId && (t.taskId.startsWith("GT") || t.taskId.startsWith("SR"))) {
                const prefixMatch = t.taskId.match(/^(?:GT|SR)(\d+)$/);
                if (prefixMatch) {
                    const num = parseInt(prefixMatch[1]);
                    if (!isNaN(num) && num > maxId) maxId = num;
                }
            }
        });
        const taskId = `SR${maxId + 1}`;

        const finalCreatedBy = (req.session.user.role === 'admin' && createdBy) ? createdBy : req.session.user.id;

        const newTask = new TaskModel({
            taskId,
            customer,
            consultant,
            description,
            startTime,
            endTime,
            timeTaken,
            status: status || "Open",
            contract: contract || null,
            createdBy: finalCreatedBy,
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/tasks/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            customer,
            consultant,
            description,
            startTime,
            endTime,
            timeTaken,
            status,
            contract,
            createdBy,
        } = req.body;

        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        const isOwner = task.createdBy && task.createdBy.toString() === req.session.user.id;
        const isAdmin = req.session.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: "Unauthorized to edit this task" });
        }

        const updateData = { customer, consultant, description, startTime, endTime, timeTaken, status, contract };
        if (isAdmin && createdBy) {
            updateData.createdBy = createdBy;
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find()
            .populate("customer", "name")
            .populate("consultant", "name")
            .populate("contract")
            .populate("createdBy", "name");
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/tasks/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        const isOwner = task.createdBy && task.createdBy.toString() === req.session.user.id;
        const isAdmin = req.session.user.role === "admin";
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: "Unauthorized to delete this task" });
        }
        await TaskModel.findByIdAndDelete(id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Production: Serve static files and catch-all for React routing
if (process.env.NODE_ENV === "production" || process.env.SERVE_STATIC === "true") {
    const buildPath = path.join(__dirname, "../client/dist");
    app.use(express.static(buildPath));
    app.get("*", (req, res) => {
        if (!req.url.startsWith("/api")) { // Basic check to not consume API calls
            res.sendFile(path.join(buildPath, "index.html"));
        } else {
            res.status(404).json({ error: "API route not found" });
        }
    });
}
