const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    role: String
});

const UserModel = mongoose.model('users', UserSchema);

async function resetPassword() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = "Raju@gooner-tech.com";
        const newPassword = "admin123";
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await UserModel.updateOne(
            { email: { $regex: new RegExp(`^${email}$`, 'i') } },
            { $set: { password: hashedPassword } }
        );

        if (result.matchedCount > 0) {
            console.log(`Successfully updated password for ${email}`);
        } else {
            console.log(`User ${email} not found`);
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

resetPassword();
