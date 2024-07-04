var express = require('express');
var router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post('/', async function(req, res, next) {
  //login 
  const { username, password } = req.body;
    try {
      if (!username) throw { status: 400, message: "Username is required" };
      if (!password) throw { status: 400, message: "Password is required" };

      let validUser = await User.findOne({ username });
      if (!validUser)
        throw { status: 400, message: "Username or Password is incorrect" };

      let isMatch = await bcrypt.compare(password, validUser.password);

      if (!isMatch)
        throw { status: 400, message: "Username or Password is incorrect" };
      const payload = {
        _id: validUser._id.toString(),
        username: validUser.username,
      };
      // const access_token = createAccessToken(payload);
      // const refresh_token = createRefreshToken(payload);

      // res.cookie("refreshToken", refresh_token, {
      //   httpOnly: true,
      //   path: "/",
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 1day
      // });
      validUser = validUser.toObject();
      delete validUser.password;
      res.status(200).json({
        data: [{ ...validUser }],
        message: "Login successful",
        success: true,
      });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message, error: true });
    }
  },
);
module.exports = router;