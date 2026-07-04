const express = require("express");
const router = express.Router();

const isloggedin = require("../middlewares/isloggedin");
const isadmin=require("../middlewares/isadmin")
const {
    placeOrder,
    getOrders,
   updateOrderStatus,
   getAllOrders
} = require("../controllers/orderControllers");

router.post("/", isloggedin, placeOrder);
router.get("/", isloggedin, getOrders);
router.get("/all", isloggedin, isadmin, getAllOrders);
router.put("/:id/status",isloggedin,isadmin,updateOrderStatus)
module.exports = router;