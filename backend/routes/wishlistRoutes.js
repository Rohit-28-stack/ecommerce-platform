const express=require("express")
const router=express.Router()

const isloggedin=require("../middlewares/isloggedin")

const {addWishlist,getWishlist,removeWishlist}=require("../controllers/wishllistControllers")

router.post("/",isloggedin,addWishlist)

router.get("/",isloggedin,getWishlist)

router.delete("/:id",isloggedin,removeWishlist)


module.exports=router