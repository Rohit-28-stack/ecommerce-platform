import { useEffect, useState } from "react";
import API from "../services/api"
import toast from "react-hot-toast";

function Cart() {
  const [cartItems, setcartItems] = useState([])
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });


  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setcartItems(res.data);
    } catch (err) {

      toast.error(err.response?.data?.message || "Failed to load cart");
    }
  }
  const removeitem = async (id) => {
    try {
      await API.delete(`/cart/${id}`)
      toast.success("Item removed from cart");
      fetchCart()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove item");
    }
  }

  const updateQuantity = async (id, quantity) => {
    try {
      await API.put(`/cart/${id}`, {
        quantity: Number(quantity)
      })

      fetchCart()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update quantity");
    }
  }

  const total = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0)
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const placeOrder = async () => {

    const loaded = await loadRazorpayScript();

    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {

      const { data: order } = await API.post("/payment/create-order", {
        amount: total
      });
      console.log("Order:", order);
      console.log("Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "My Ecommerce",

        description: "Order Payment",

        order_id: order.id,

        handler: async function (response) {
          try {

            await API.post("/orders", {
              address,
              paymentMethod: "Razorpay",
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id
            });

            toast.success("Payment Successful");
            fetchCart();

          } catch (err) {
            toast.error("Order saving failed");
          }
        },

        prefill: {
          name: "Customer",
          email: "customer@gmail.com",
        },

        theme: {
          color: "#4F46E5",
        },

      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

    } catch (err) {

      console.log(err);

      toast.error("Payment Failed");

    }

  };
  const demoPayment = async () => {
    try {
      await API.post("/orders", {
        address,
        paymentMethod: "Demo"
      });

      toast.success("Order placed successfully");
      fetchCart();

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Order failed");
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-12">

          <span className="inline-block rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-indigo-700">
            Shopping Cart
          </span>

          <h1 className="mt-4 text-5xl font-extrabold text-slate-900">
            My Cart
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Review your items before placing your order.
          </p>

        </div>

        {cartItems.length === 0 ? (

          <div className="mb-10 relative overflow-hidden rounded-3xl h-[300px]">

            <img
              src="https://plus.unsplash.com/premium_photo-1681487985079-b299ac8ba1df?q=80&w=1057&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Electronics"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">

              <div className="ml-12 max-w-xl">

                <h2 className="text-5xl font-bold text-white">
                  Ready to Checkout?
                </h2>

                <p className="text-gray-200 mt-4 text-lg">
                  Premium electronics with secure payment and fast delivery.
                </p>

              </div>

            </div>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-3">

            {/* Cart Items */}

            <div className="space-y-6 lg:col-span-2">

              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-6">

                      <img
                        src={item.product.images?.[0] || item.product.image}
                        alt={item.product.name}
                        className="w-28 h-28 object-cover rounded-2xl border"
                      />

                      <div>

                        <h2 className="text-2xl font-bold">
                          {item.product.name}
                        </h2>

                        <p className="text-indigo-600 text-2xl font-bold mt-2">
                          ₹{item.product.price}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, e.target.value)
                        }
                        className="h-12 w-20 rounded-xl border border-slate-300 text-center outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      />

                      <button
                        onClick={() => removeitem(item._id)}
                        className="rounded-xl border border-red-500 px-6 py-3 font-medium text-red-600 transition hover:bg-red-500 hover:text-white"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
            {/* Order Summary */}

            <div className="sticky top-24 h-fit rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

              <h2 className="text-3xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">

                <div className="flex items-center justify-between text-slate-600">

                  <span>Items</span>

                  <span className="font-semibold">
                    {cartItems.length}
                  </span>

                </div>

                <div className="flex items-center justify-between text-slate-600">

                  <span>Shipping</span>

                  <span className="font-semibold text-green-600">
                    Free
                  </span>

                </div>

                <div className="h-px bg-slate-200"></div>

                <div className="flex items-center justify-between">

                  <span className="text-xl font-bold text-slate-900">
                    Total
                  </span>

                  <span className="text-3xl font-bold text-indigo-600">
                    ₹{total}
                  </span>

                </div>

              </div>
              <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200 mb-6">

                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  📍 Delivery Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <input
                    placeholder="Full Name"
                    onChange={(e) =>
                      setAddress({ ...address, fullName: e.target.value })
                    }
                    className="px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />

                  <input
                    placeholder="Phone Number"
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                    className="px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />

                  <input
                    placeholder="Street Address"
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    className="md:col-span-2 px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />

                  <input
                    placeholder="City"
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />

                  <input
                    placeholder="State"
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />

                  <input
                    placeholder="Pincode"
                    onChange={(e) =>
                      setAddress({ ...address, pincode: e.target.value })
                    }
                    className="px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />

                </div>

              </div>

              <button
                onClick={demoPayment}
                className="w-full bg-green-600 text-white py-4 rounded-xl"
              >
                Demo Payment
              </button>

              <button
                onClick={placeOrder}
                className="mt-8 w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
              >
                Place Order
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );





}
export default Cart