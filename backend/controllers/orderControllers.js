const Order = require("../models/order");
const Cart = require("../models/cart");

const placeOrder = async (req, res) => {
  try {
    const { address, paymentMethod, paymentStatus, paymentId } = req.body;

    const cart = await Cart.find({ user: req.user.id }).populate("product");

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const items = [];

    for (const item of cart) {
      if (!item.product) continue;

      totalAmount += item.product.price * item.quantity;

      items.push({
        product: item.product._id,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      address,
      paymentMethod,
      paymentStatus: paymentStatus || "Pending",
      paymentId,
    });

    await Cart.deleteMany({ user: req.user.id });

    res.status(201).json(order);
  } catch (err) {
    console.error("PLACE ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .lean(); // 🔥 optional performance boost

    res.status(200).json(orders);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("items.product", "name price image");

    const io = req.app.get("io");
    io.emit("orderUpdated", order);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price image");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
};