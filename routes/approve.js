var express = require("express");
const authAdmin = require("../middlewares/AuthAdmin");
const User = require("../models/userModel");
var router = express.Router();

/* GET users listing. */
router.put("/:id", authAdmin, async function (req, res, next) {
  const userId = req.params.id;
  const user = await User.findById(userId);
  user.approved = true;
  await user.save();
  res.send(user);
});

module.exports = router;
