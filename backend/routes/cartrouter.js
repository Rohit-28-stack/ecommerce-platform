const express=require("express")
const router=express.Router();
const isloggedin=require("../middlewares/isloggedin")

const{addToCart,getCart,removeFromCart,updateCart}=require("../controllers/cartcontrollers")

router.post("/",isloggedin,addToCart)
router.get("/",isloggedin,getCart)
router.put("/:id",isloggedin, updateCart); 
router.delete("/:id", isloggedin, removeFromCart);
module.exports=router