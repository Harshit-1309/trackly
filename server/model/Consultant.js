const mongoose = require("mongoose");

const ConsultantSchema = new mongoose.Schema({
    consultantId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const ConsultantModel = mongoose.model("consultants", ConsultantSchema);

module.exports = ConsultantModel;
