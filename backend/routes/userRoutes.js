const express = require("express");
const router = express.Router();
const isloggedin=require("../middlewares/isloggedin")
const { registerUser,loginuser,addAddress,getAddresses,
    updateAddress,deleteAddress,getProfile,updateProfile,getallusers,deleteUser } = require("../controllers/userControllers");
const isadmin =require("../middlewares/isadmin")


router.post("/register", registerUser);
router.post("/login",loginuser );
router.post("/addresses",isloggedin,addAddress)
router.get("/addresses",isloggedin,getAddresses)
router.put("/addresses/:addressId",isloggedin,updateAddress)
router.delete("/addresses/:addressId",isloggedin,deleteAddress)
router.get("/me", isloggedin, getProfile)
router.put("/me", isloggedin, updateProfile)
router.get("/", isloggedin, isadmin, getallusers);
router.delete("/:id",isloggedin,isadmin,deleteUser);
module.exports = router;