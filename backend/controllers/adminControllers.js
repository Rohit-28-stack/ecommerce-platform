const User=require("../models/user")
const Product=require("../models/product")
const Order=require("../models/order")

const getDashboard=async (req,res)=>{
    try{
         const totalUsers =
            await User.countDocuments();

        const totalProducts =
            await Product.countDocuments();

        const totalOrders =
            await Order.countDocuments();

        const orders =
            await Order.find();

        const totalRevenue =
            orders.reduce(
                (acc, order) =>
                    acc + order.totalAmount,
                0
            );

        res.status(200).json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue
        });
    }
    catch(err){
         res.status(500).json({
            message: err.message
        })
    }
}
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        res.status(200).json(users);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};
const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.deleteOne();

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};
const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product", "name price image");

        res.status(200).json(orders);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};
const updateOrderStatus = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = req.body.status;

        await order.save();

        res.status(200).json({
            message: "Order status updated",
            order
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};
const getAdminStats = async (req, res) => {
  try {
    const orders = await Order.find();
    const users = await User.find();
    const products = await Product.find();

    const revenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      totalOrders: orders.length,
      totalUsers: users.length,
      totalProducts: products.length,
      totalRevenue: revenue,
      recentOrders: orders.slice(-5).reverse(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
    getDashboard,
    getAllUsers,
    deleteUser,
    getAllOrders,
    updateOrderStatus,
    getAdminStats
    
}