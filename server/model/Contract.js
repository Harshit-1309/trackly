const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
    contractId: {
        type: String,
        required: true,
        unique: true
    },
    contractName: {
        type: String,
        required: true
    },
    contractType: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    contractNumber: {
        type: String,
        required: false
    },
    contractStatus: {
        type: String,
        required: false
    },
    effectiveDate: {
        type: Date,
        required: false
    },
    renewalType: {
        type: String,
        required: false
    },
    supportLevel: {
        type: String,
        required: false
    },
    supportHours: {
        type: String,
        required: false
    },
    includedTickets: {
        type: Number,
        required: false
    },
    excludedServices: {
        type: String,
        required: false
    },
    usageLimit: {
        type: Number,
        required: false
    },
    usageConsumed: {
        type: Number,
        required: false
    },
    usageLeft: {
        type: Number,
        required: false
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    }
});

const ContractModel = mongoose.model("contracts", ContractSchema);

module.exports = ContractModel;
