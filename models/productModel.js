const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },  
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("products", productSchema);