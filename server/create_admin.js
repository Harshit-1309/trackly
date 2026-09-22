const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const UserModel = require('./model/User'); // Import the correct model

dotenv.config({ path: path.join(__dirname, '.env') });

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = "admin@timetracker.local";
        const plainPassword = "adminpassword123";
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        
        // Generate a random empId
        const empId = "ADM" + Math.floor(Math.random() * 10000);

        const newAdmin = new UserModel({
            name: "System Admin",
            email: email,
            password: hashedPassword,
            empId: empId,
            role: "admin"
        });

        await newAdmin.save();

        console.log("-----------------------------------------");
        console.log("Admin User Created Successfully!");
        console.log("ID (Email):", email);
        console.log("Password:", plainPassword);
        console.log("-----------------------------------------");

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error creating admin:", error);
        await mongoose.disconnect();
    }
}

createAdmin();
