import { useState, useEffect } from "react";
import API from "../services/api"
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaStar,
  FaStarHalfAlt
} from "react-icons/fa";

import toast from "react-hot-toast";


function Wishlist() {
  const [wishlist, setwishlist] = useState([])

  useEffect(() => {
    fetchwishlist()
  }, [])

  const fetchwishlist = async () => {
    try {
      const res = await API.get("/wishlist")
      setwishlist(res.data)

    } catch (err) {
      toast.error("Failed to load wishlist");
    }
  }
  const removewishlist = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`)
      fetchwishlist()
      toast.success("Removed from wishlist");

    } catch (err) {
      toast.error("Failed to remove item");

    }

  }
  const movetocart = async (item) => {
    try {
      await API.post("/cart", {
        productId: item.product._id,
        quantity: 1
      })

      await API.delete(`/wishlist/${item._id}`)
      fetchwishlist();
      toast.success("Moved to cart successfully");
    }
    catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Failed to move item");
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* Banner */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-10 mb-12 shadow-2xl">

          <div className="max-w-xl">

            <h1 className="text-5xl font-extrabold">
              My Wishlist
            </h1>

            <p className="mt-3 text-lg text-indigo-100">
              Save your favourite products and buy them later.
            </p>

          </div>

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
            className="absolute right-0 bottom-0 h-full opacity-20 object-cover"
          />

        </div>

        {wishlist.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              className="mx-auto w-48"
            />

            <h2 className="text-3xl font-bold mt-6">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Browse products and add your favourites.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {wishlist
              .filter((item) => item.product) // 🔥 remove broken entries
              .map((item) => (
                <div
                  key={item._id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-3"
                >
                  {/* Image */}

                  <div className="relative bg-gray-100 overflow-hidden">

                    <img
                      src={item.product.images?.[0] || item.product.image}
                      alt={item.product.name}
                      className="w-full h-72 object-contain p-6 group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute top-4 left-4">

                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        🔥 Bestseller
                      </span>

                    </div>

                    <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg">

                      <FaHeart className="text-red-500 text-xl" />

                    </div>

                  </div>

                  {/* Content */}

                  <div className="p-6">

                    <h2 className="text-xl font-bold line-clamp-2">
                      {item.product.name}
                    </h2>

                    {/* Ratings */}

                    <div className="flex items-center gap-1 mt-3 text-yellow-400">

                      <FaStar />

                      <FaStar />

                      <FaStar />

                      <FaStar />

                      <FaStarHalfAlt />

                      <span className="text-gray-500 text-sm ml-2">
                        4.5
                      </span>

                    </div>

                    <div className="mt-5 flex items-center justify-between">

                      <div>

                        <p className="text-3xl font-bold text-indigo-600">
                          ₹{item.product.price}
                        </p>

                        <p className="text-sm text-gray-400 line-through">
                          ₹{Math.floor(item.product.price * 1.2)}
                        </p>

                      </div>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        In Stock
                      </span>

                    </div>

                    <div className="mt-8 flex gap-3">

                      <button
                        onClick={() => movetocart(item)}
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                      >

                        <FaShoppingCart />

                        Move to Cart

                      </button>

                      <button
                        onClick={() => removewishlist(item._id)}
                        className="w-14 flex justify-center items-center rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>

    </div>
  );



}
export default Wishlist