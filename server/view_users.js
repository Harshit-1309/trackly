const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserModel = require("./model/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const users = await UserModel.find({}, { password: 0 });
        console.log("Users in database:");
        console.log(JSON.stringify(users, null, 2));
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
