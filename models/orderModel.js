const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
      customer_id: {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
      quantity: Number,
      totalPrice: Number,
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("orders", orderSchema)