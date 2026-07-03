import { useEffect, useState } from "react";
import API from "../services/api"
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTruck,
  FaBoxOpen,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setorders] = useState([])

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);
    return () => clearInterval(interval);
  }, [])




  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setorders(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load orders");
    }
  };


 if (!orders || orders.length === 0) {
 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-50 px-4">

    <div className="relative bg-white rounded-3xl shadow-2xl p-10 md:p-16 text-center max-w-md w-full border border-slate-200">

      {/* Soft glow background */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-200 blur-3xl opacity-40 rounded-full"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-200 blur-3xl opacity-40 rounded-full"></div>

      {/* Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        className="mx-auto w-40 md:w-52 drop-shadow-lg"
        alt="No Orders"
      />

      {/* Title */}
      <h2 className="text-3xl font-extrabold mt-6 text-slate-800">
        No Orders Yet
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed">
        You haven’t placed any orders yet. Start shopping and your purchased items will appear here.
      </p>

      {/* CTA Button */}
      <a
        href="/products"
        className="inline-block mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition"
      >
        Start Shopping
      </a>

    </div>
  </div>
);
}

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 py-12">

    <div className="max-w-7xl mx-auto px-6">

      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 p-10 text-white shadow-2xl mb-12">

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold">
            📦 My Orders
          </h1>

          <p className="mt-3 text-lg text-indigo-100">
            Track your orders, delivery progress and purchase history.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-10">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition"
          >

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-8">

              <div className="flex flex-col lg:flex-row justify-between">

                <div>
                  <h2 className="text-2xl font-bold">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h2>

                  <p className="text-indigo-200 mt-2">
                    {order._id}
                  </p>
                   {/* ADDRESS SECTION */}
  {order.address && (
  <div className="mt-5 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
    
    <h4 className="text-sm font-semibold text-white mb-3">
      📍 Delivery Address
    </h4>

    <div className="text-sm text-indigo-100 space-y-1">
      <p>
        <span className="font-semibold text-white">Name:</span>{" "}
        {order.address.fullName}
      </p>

      <p>
        <span className="font-semibold text-white">Phone:</span>{" "}
        {order.address.phone}
      </p>

      <p>
        <span className="font-semibold text-white">Address:</span>{" "}
        {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
      </p>
    </div>
  </div>
)}
                </div>

                <div className="mt-6 lg:mt-0 text-left lg:text-right">

                  <h1 className="text-4xl font-bold">
                    ₹{order.totalAmount}
                  </h1>

                  <div className="mt-3">

                    {order.status === "Delivered" && (
                      <span className="inline-flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full">
                        Delivered
                      </span>
                    )}

                    {order.status === "Pending" && (
                      <span className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full">
                        Pending
                      </span>
                    )}

                    {order.status === "Shipped" && (
                      <span className="inline-flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-full text-white">
                        Shipped
                      </span>
                    )}

                  </div>

                </div>
              </div>
            </div>

            {/* Items */}
            <div className="p-8 bg-gradient-to-br from-slate-50 to-white">

  <h3 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
    🛍️ Ordered Items
  </h3>

  <div className="space-y-6">

    {order.items
      ?.filter((item) => item.product)
      .map((item, index) => (
        <div
          key={index}
          className="group flex flex-col md:flex-row items-center justify-between gap-6 p-6 
          bg-white rounded-3xl border border-slate-200 shadow-sm 
          hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >

          {/* LEFT SIDE - IMAGE + DETAILS */}
          <div className="flex items-center gap-5 w-full md:w-auto">

            {/* Product Image */}
            <div className="w-28 h-28 bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center border">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition duration-300"
              />
            </div>

            {/* Product Info */}
            <div>
              <h4 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition">
                {item.product.name}
              </h4>

              <p className="text-sm text-slate-500 mt-1">
                Quantity:{" "}
                <span className="font-semibold text-slate-700">
                  {item.quantity}
                </span>
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Product ID: {item.product._id?.slice(-6)}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - PRICE */}
          <div className="text-right">
            <p className="text-sm text-slate-500">Total Price</p>

            <p className="text-2xl font-bold text-indigo-600">
              ₹{(item.product.price || 0) * item.quantity}
            </p>

            <p className="text-xs text-slate-400">
              ₹{item.product.price} × {item.quantity}
            </p>
          </div>

        </div>
      ))}
  </div>
</div>

          </div>
        ))}

      </div>

    </div>
  </div>
);





}
export default Orders