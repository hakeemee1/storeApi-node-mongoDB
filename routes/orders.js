var express = require('express');
var router = express.Router();
const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

//Get all orders
router.get("/", async function (req, res, next) {
    try {
        let orders;
        if (1) {
          orders = await Order.find()
            .populate({
              path: "customer_id",
              model: User,
              select: "username",
            })
            .populate({
              path: "orderItems",
              model: OrderItem,
              select: "quantity product",
              populate: {
                path: "product",
                model: Product,
                select: " product_name price amount ",
              },
            });
        } else {
          orders = await Order.find({ customer_id: req.user._id })
            .populate({
              path: "customer_id",
              model: User,
              select: "username ",
            })
            .populate({
              path: "orderItems",
              model: OrderItem,
              select: "quantity product",
              populate: {
                path: "product",
                model: Product,
                select: "product_name price amount ",
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
    },
);

//Create order
router.post("/", async function (req, res, next) { 
    try {
        const { customer_id, orderItems, totalPrice } = req.body;
        const newOrder = new Order({
            customer_id,
            orderItems,
            totalPrice
        });
        const order = await newOrder.save();
        return res.status(200).send({
            data: order,
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

