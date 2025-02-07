var express = require("express");
var router = express.Router();
const Product = require("../models/productModel");
const authUser = require("../middlewares/authUser");
const authAdmin = require("../middlewares/AuthAdmin");
const Order = require("../models/orderModel");

//Get all products
router.get("/", async function (req, res, next) {
  try {
    const products = await Product.find();
    return res.status(200).send({
      data: products,
      message: "Get products successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
});

//Post product
router.post("/", authAdmin, async function (req, res, next) {
  try {
    const { product_name, price, amount, description, image } = req.body;
    const newProduct = new Product({
      product_name,
      price,
      amount,
      description,
      image,
    });
    const product = await newProduct.save();
    return res.status(200).send({
      data: product,
      message: "Create product successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
});

//Update product
router.put("/:id", authAdmin, async function (req, res, next) {
  try {
    const { product_name, price, amount, description, image } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, {
      product_name,
      price,
      amount,
      description,
      image,
    });
    return res.status(200).send({
      data: product,
      message: "Update product successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
});

//Get product by id
router.get("/:id", async function (req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).send({
      data: product,
      message: "Get product successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
});

//Delete product
router.delete("/:id", authAdmin, async function (req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      data: product,
      message: "Delete product successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
});

//Post order item
router.post("/:id/orders", authUser, async function (req, res, next) {
  const { customer_id, quantity } = req.body;
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) throw { status: 400, message: "Product not found" };
    if (product.amount < quantity)
      throw { status: 400, message: "Not enough quantity" };
    const totalPrice = product.price * quantity;

    const order = await Order.create({
      customer_id,
      product_id: id,
      quantity,
      totalPrice,
    });
    product.amount -= quantity;
    await product.save();
    return res.status(200).send({
      data: order,
      message: "Create order successfully",
      success: true,
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ message: err.message, error: true });
  }
});

//show all order of product id
router.get("/:id/orders", authUser, async function (req, res, next) {
  const id = req.params.id;
  try {
    const orders = await Order.find({ product_id: id });
    if (orders.length === 0) throw { status: 400, message: "Order not found" };
    return res.status(200).send({
      data: orders,
      message: "Get orders successfully",
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
