const express = require("express");
const router = express.Router();

const isloggedin=require("../middlewares/isloggedin")
const isadmin=require("../middlewares/isadmin")
const{createProduct,getProducts,getProduct,updateProduct,deleteProduct, addReview, getReviews}=require("../controllers/productcontroller")
const uploads=require('../middlewares/uploads')

// router.post('/',isloggedin,isadmin,uploads.single("image"),createProduct)
router.post(
  "/",
  isloggedin,
  isadmin,
  uploads.array("image", 10),
  createProduct
);
router.get("/",getProducts);
router.get("/:id",getProduct);
router.put('/:id',isloggedin,isadmin,uploads.array("image", 10),updateProduct)
router.delete("/:id",isloggedin,isadmin,deleteProduct)
router.post("/:id/reviews",isloggedin,addReview)
router.get("/:id/reviews",getReviews)
module.exports = router;