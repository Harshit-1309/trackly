const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    hours: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const ProjectModel = mongoose.model("projects", ProjectSchema);

module.exports = ProjectModel;
