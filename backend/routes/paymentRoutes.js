const express = require("express");

const router = express.Router();

const isloggedin = require("../middlewares/isloggedin");

const {
    createOrder,
} = require("../controllers/paymentControllers");

router.post("/create-order", isloggedin, createOrder);

module.exports = router;