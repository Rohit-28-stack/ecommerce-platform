const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    paymentMethod: {
      type: String,
      enum: ["Demo", "Razorpay", "COD"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    paymentId: String,

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);