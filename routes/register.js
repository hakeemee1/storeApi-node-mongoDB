var express = require("express");
var router = express.Router();
const User = require("../models/userModel"); // นำเข้าโมเดล User
const bcrypt = require("bcrypt");


//get users
router.get("/", async function (req, res, next) {
  try {
    const users = await User.find();
    return res.status(200).send({
      data: users,
      message: "Get users successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
});
// Register
router.post("/", async function (req, res, next) {
  try {
    const { username, password, email } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password : hashPassword,
      email,
    });
    let user = await newUser.save();
    user = user.toObject();
    return res.status(200).send({
      data: user,
      message: "User created successfully",
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
