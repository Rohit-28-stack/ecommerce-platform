import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";


function Register() {
   const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/register", form);

        toast.success(res.data.message || "Registration successful!");

      setForm({
        name: "",
        email: "",
        password: "",
      });
          setTimeout(() => {
      navigate("/login");
    }, 1000);
       

    } catch (err) {
     toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-teal-600 to-blue-700 px-4">

      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-600 to-teal-700 text-white p-10">

          <h1 className="text-4xl font-bold mb-4">
            Join ShopEase 🛍️
          </h1>

          <p className="text-green-100 leading-7">
            Create your account to explore thousands of products,
            manage your wishlist, track orders, and enjoy a seamless
            shopping experience.
          </p>

          <div className="text-7xl text-center mt-10">
            🎁
          </div>

        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Register
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Create your new account
          </p>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="relative mb-5">
              <FaUser className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative mb-5">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                type="button"
                className="absolute right-4 top-4 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;