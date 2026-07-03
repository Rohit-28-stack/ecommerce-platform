import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { FaStar } from "react-icons/fa";
import Button from "../components/Button";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  // Fetch Product
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load product");
    }
  };

  // Add to Cart
  const addtocart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      toast.success("Added to Cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  // Add to Wishlist
  const addWishlist = async () => {
    try {
      await API.post("/wishlist", {
        productId: product._id,
      });

      toast.success("Added to Wishlist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to wishlist");
    }
  };

  // Add Review
  const addReview = async () => {
    try {
      await API.post(`/products/${product._id}/reviews`, {
        rating,
        comment,
      });

      toast.success("Review Added");

      setRating(5);
      setComment("");

      fetchProduct();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add review");
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  // Images Array
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  // Convert Image to URL
  const getImageUrl = (img) => {
    if (!img) return "";

    // String
    if (typeof img === "string") {
      return img.startsWith("http")
        ? img
        : `http://localhost:3000/uploads/${img}`;
    }

    // Object with url
    if (img.url) {
      return img.url.startsWith("http")
        ? img.url
        : `http://localhost:3000/uploads/${img.url}`;
    }

    // Cloudinary
    if (img.secure_url) {
      return img.secure_url;
    }

    return "";
  };

  // Current Selected Image
  const currentImage =
    images.length > 0
      ? getImageUrl(images[selectedImage])
      : "https://placehold.co/600x600?text=No+Image";

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Product Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Images */}
            <div>

              {/* Main Image */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center h-[500px]">

                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />

              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 mt-5 overflow-x-auto">

                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={getImageUrl(img)}
                      alt={`Product ${index}`}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition
                  ${selectedImage === index
                          ? "border-indigo-600 scale-105"
                          : "border-gray-200 hover:border-indigo-400"
                        }`}
                    />
                  ))}

                </div>
              )}

            </div>

            {/* Product Details */}
            <div>

              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                {product.category}
              </span>

              <h1 className="text-5xl font-bold mt-5">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-5">

                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= Math.round(product.averageRating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <span className="text-gray-500">
                  ({product.averageRating?.toFixed(1) || "0.0"})
                </span>

              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mt-6">

                <h2 className="text-4xl font-bold text-blue-600">
                  ₹{product.price}
                </h2>

                <span className="text-xl text-gray-400 line-through">
                  ₹{Math.round(product.price * 1.2)}
                </span>

              </div>

              <p className="text-green-600 font-semibold mt-3">
                Free Delivery Available
              </p>

              {/* Stock */}
              <div className="mt-6">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>

              </div>

              {/* Description */}
              <div className="mt-8">

                <h3 className="text-2xl font-bold mb-3">
                  Description
                </h3>

                <p className="text-gray-600 leading-8">
                  {product.description}
                </p>

              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-5 mt-8">

                <div className="bg-gray-50 rounded-xl p-5 border">
                  <p className="text-gray-500 text-sm">
                    Category
                  </p>

                  <p className="font-bold text-lg">
                    {product.category}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border">
                  <p className="text-gray-500 text-sm">
                    Stock
                  </p>

                  <p className="font-bold text-lg">
                    {product.stock}
                  </p>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-10">

                <Button
                  onClick={addtocart}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
                >
                  Add to Cart
                </Button>

                <Button
                  onClick={addWishlist}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold shadow-lg"
                >
                  Add to Wishlist
                </Button>

              </div>

            </div>

          </div>

        </div>
        {/* Write Review */}
        <div className="mt-12 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">

          <div className="border-b pb-5 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Write a Review
            </h2>

            <p className="text-gray-500 mt-2">
              Share your experience with this product.
            </p>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Very Good</option>
              <option value={3}>3 - Good</option>
              <option value={2}>2 - Fair</option>
              <option value={1}>1 - Poor</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Comment
            </label>

            <textarea
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-xl bg-gray-50 px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <Button
            onClick={addReview}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
          >
            Submit Review
          </Button>

        </div>

        {/* Reviews */}
        <div className="mt-14 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">

          <div className="flex items-center justify-between border-b pb-5 mb-8">

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Customer Reviews
              </h2>

              <p className="text-gray-500 mt-1">
                See what our customers are saying.
              </p>
            </div>

            <div className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full font-semibold">
              {product.reviews?.length || 0} Reviews
            </div>

          </div>

          {product.reviews?.length === 0 ? (

            <div className="text-center py-16">

              <div className="text-6xl">
                💬
              </div>

              <h3 className="text-2xl font-semibold mt-5 text-gray-600">
                No Reviews Yet
              </h3>

              <p className="text-gray-400 mt-2">
                Be the first to review this product.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {product.reviews.map((review) => (

                <div
                  key={review._id}
                  className="bg-gray-50 border rounded-2xl p-6 hover:shadow-lg transition"
                >

                  <div className="flex justify-between">

                    <div className="flex gap-4 items-center">

                      <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold uppercase">
                        {review.user?.name?.charAt(0) || "U"}
                      </div>

                      <div>

                        <h3 className="font-semibold text-lg">
                          {review.user?.name || "Anonymous"}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          Verified Customer
                        </p>

                      </div>

                    </div>

                    <div className="flex">

                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={
                            star <= review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}

                    </div>

                  </div>

                  <p className="mt-5 text-gray-600 leading-7">
                    {review.comment}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </div>
  );

}

export default ProductDetails;