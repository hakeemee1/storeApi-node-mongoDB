var express = require("express");
var router = express.Router();
const Product = require("../models/productModel");
const authUser = require("../middlewares/authUser");

//Get all products
router.get("/", authUser, async function (req, res, next) {
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
router.post("/", async function (req, res, next) {
    try {
        const { product_name, price, amount } = req.body;
        const newProduct = new Product({
            product_name,
            price,
            amount
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
router.put("/:id", async function (req, res, next) {
    try {
        const { product_name, price, amount } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, {
            product_name,
            price,
            amount
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
router.delete("/:id", async function (req, res, next) {
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

module.exports = router;