const Cart=require("../models/cart")

const addToCart=async(req,res)=>{
    try{
        const cartItem=await Cart.create({
            user:req.user.id,
            product:req.body.productId,
            quantity:req.body.quantity
        })
        res.status(201).json(cartItem)
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })

    }
}

const getCart=async(req,res)=>{
     try {
        let cart = await Cart.find({
            user: req.user.id
        }).populate("product");

     
        cart = cart.filter(item => item.product !== null);

        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


const removeFromCart=async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Item removed"
        });
    }
    catch(err){
        res.status(500).json({
            message: error.message
        });
    }
}
const updateCart=async(req,res)=>{
    try{
        const {quantity}=req.body;
        const cartItem=await Cart.findById(req.params.id)
        if(!cartItem){
            return res.status(404).json({
                message:"cart item not found"
            })
        }
        cartItem.quantity=quantity
        await cartItem.save()
        res.json(cartItem)
    }
    catch(err){
         res.status(500).json({ message: err.message });

    }
}

module.exports={
    addToCart,
    getCart,
    removeFromCart,
    updateCart
}