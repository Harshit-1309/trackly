const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    empId: {
      type: String,
      unique: true
    },
    contactNo: Number,
    role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
    profileImage: String
})

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;