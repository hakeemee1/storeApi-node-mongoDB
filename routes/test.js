var express = require("express");
var router = express.Router();
const Test = require("../models/testModel");

//get all test
router.get("/", async function (req, res, next) {
    try {
        const tests = await Test.find();
        return res.status(200).send({
            data: tests,
            message: "Get tests successfully",
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