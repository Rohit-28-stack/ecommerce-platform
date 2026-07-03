import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import Button from "./Button";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";


function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
      });
      toast.success("Added to cart");

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const addToWishlist = async () => {
    try {
      await API.post("/wishlist", {
        productId: product._id,
      });

      toast.success("Added to wishlist");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to add to wishlist");
    }
  };
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md"
    >

      {/* Image */}
      <div className="relative overflow-hidden">

        <motion.img
          src={
            product.images?.length
              ? product.images[0]
              : product.image || "/placeholder.png"
          }
          alt={product.name}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-64 object-cover"
        />

        {/* Discount Badge */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          20% OFF
        </span>

        {/* Wishlist */}
        <button
          onClick={addToWishlist}
          className="absolute top-3 right-3 bg-white p-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition"
        >
          <FaHeart />
        </button>

      </div>

      {/* Content */}
      <div className="p-5">

        <p className="text-xs uppercase text-blue-600 font-semibold mb-1">
          {product.category}
        </p>

        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">

          <div className="flex text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="text-gray-300" />
          </div>

          <span className="text-sm text-gray-500 ml-2">
            ({product.averageRating || 4.5})
          </span>

        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">

          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>

          <span className="text-gray-400 line-through">
            ₹{Math.round(product.price * 1.25)}
          </span>

        </div>

        <p className="text-green-600 text-sm font-medium mt-2">
          🚚 Free Delivery
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="flex-1"
          >
            <Link to={`/products/${product._id}`}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
                View Details
              </Button>
            </Link>
          </motion.div>

          <button
            onClick={addToCart}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition shadow"
          >
            <FaShoppingCart />
          </button>

        </div>

      </div>
    </motion.div>
  );
}

export default ProductCard;