const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
