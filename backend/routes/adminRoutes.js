const express = require("express");

const router = express.Router();

const isloggedin =
require("../middlewares/isloggedin")

const isadmin =
require("../middlewares/isadmin")

const {
    getDashboard,
     getAllUsers,
    deleteUser,
    getAllOrders,
    updateOrderStatus,
    getAdminStats
    
}
=
require("../controllers/adminControllers")

router.get(
    "/dashboard",
    isloggedin,
    isadmin,
    getDashboard
);
router.get(
    "/users",
    isloggedin,
    isadmin,
    getAllUsers
);
router.delete(
    "/users/:id",
    isloggedin,
    isadmin,
    deleteUser
);
router.get(
    "/orders",
    isloggedin,
    isadmin,
    getAllOrders
);
router.put(
    "/orders/:id",
    isloggedin,
    isadmin,
    updateOrderStatus
);
router.get("/stats", isloggedin, isadmin, getAdminStats);


module.exports = router

