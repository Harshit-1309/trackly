const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true
    },
    consultant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "consultants",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    timeTaken: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Open', 'Working - Customer', 'Working - Consultant', 'On Hold', 'Closed'],
        default: 'Open'
    },
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contracts"
    }
}, { timestamps: true });

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;
