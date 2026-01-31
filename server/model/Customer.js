const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    billingEmail: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    channelPartnerName: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
});

const CustomerModel = mongoose.model("customers", CustomerSchema);

module.exports = CustomerModel;
