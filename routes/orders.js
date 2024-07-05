var express = require("express");
var router = express.Router();
const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItem");
const Product = require("../models/productModel");
const authUser = require("../middlewares/authUser");

//Get all orders
router.get("/", async function (req, res, next) {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find()
        .populate({
          path: "customer_id",
          model: User,
          select: "username email",
        })
        .populate({
          path: "orderItems",
          model: OrderItem,
          select: "quantity product",
          populate: {
            path: "product",
            model: Product,
            select: "product_code product_name price amount detail",
          },
        });
    } else {
      orders = await Order.find({ customer_id: req.user._id })
        .populate({
          path: "customer_id",
          model: User,
          select: "username email",
        })
        .populate({
          path: "orderItems",
          model: OrderItem,
          select: "quantity product",
          populate: {
            path: "product",
            model: Product,
            select: "product_code product_name price amount ",
          },
        });
    }
    res.status(200).json({
      data: orders || [],
      message: "Get orders successful",
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ message: err.message, error: true });
  }
});

//Post order
router.post("/", async function (req, res, next) {
  try {
    const { user_id, product_id, quantity } = req.body;
    const newOrder = new Order({
      user_id,
      product_id,
      quantity,
    });
    await newOrder.save();
    return res.status(200).send({
      data: newOrder,
      message: "Create order successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
});


module.exports = router;
