
const Wishlist=require("../models/wishlist")

const addWishlist=async (req,res)=>{
    try{
        const exists=await Wishlist.findOne({
            user:req.user.id,
            product:req.body.productId
        })
        if(exists){
            return res.status(400).json({
                message:"product alraedy in wishlist"
            })
        }
        const wishlist=await Wishlist.create({
            user:req.user.id,
            product:req.body.productId
        })
        res.status(201).json(wishlist)

    }
    catch(err){
          res.status(500).json({
            message: err.message
        });
    }
}

const getWishlist=async (req,res)=>{
    try{
        const wishlist=await Wishlist.find({
            user:req.user.id
        }).populate("product");
        
        res.status(200).json(wishlist)
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const removeWishlist=async(req,res)=>{
    try{
        await Wishlist.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"removed from wishlist"
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports={
    addWishlist,
    getWishlist,
    removeWishlist
}