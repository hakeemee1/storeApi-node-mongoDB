var express = require("express");
var router = express.Router();
const Order = require("../models/orderModel");
const Products = require("../models/productModel");
const User = require("../models/userModel");
const authUser = require("../middlewares/authUser");

//Get all orders
router.get("/", authUser, async function (req, res, next) {
  try {
    let orders;
    // ถ้าผู้ใช้มีสิทธิ์เป็น admin
    if (req.user.role === "admin") {
      // ดึงข้อมูลทั้งหมดจาก collection order โดยการใช้ populate เพื่อดึงข้อมูลจาก collection user และ product
      // โดยเฉพาะฟิลด์ username และ email จาก collection user และ product_name และ price จาก collection product
      orders = await Order.find()
        .populate({
          path: "customer_id",
          model: User,
          select: "username email",
        })
        .populate({
          path: "product_id",
          model: Products,
          select: "product_name price  ",
        });
    } else {
      // ถ้าผู้ใช้ไม่มีสิทธิ์เป็น admin
      // ดึงข้อมูลจาก collection order โดยการใช้ populate เพื่อดึงข้อมูลจาก collection user และ product
      // โดยเฉพาะฟิลด์ username และ email จาก collection user และ product_name และ price จาก collection product
      // และฟิลด์ customer_id ต้องตรงกับ id ของผู้ใช้ที่ใช้งาน
      orders = await Order.find({ customer_id: req.user._id })
        .populate({
          path: "customer_id",
          model: User,
          select: "username email",
        })
        .populate({
          path: "product_id",
          model: Products,
          select: "product_name price ",
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

// //Post order
// router.post("/", async function (req, res, next) {
//   try {
//     const { user_id, product_id, quantity } = req.body;
//     const newOrder = new Order({
//       user_id,
//       product_id,
//       quantity,
//     });
//     await newOrder.save();
//     return res.status(200).send({
//       data: newOrder,
//       message: "Create order successfully",
//       success: true,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       message: err.message,
//       success: false,
//     });
//   }
// });


module.exports = router;
