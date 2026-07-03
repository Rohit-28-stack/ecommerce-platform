import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";


function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      login(res.data.token, res.data.user);
     
      toast.success("Login successful!");
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 px-4">

      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back 👋
          </h1>

          <p className="text-blue-100 leading-7">
            Login to continue shopping, manage your orders,
            wishlist, and profile all in one place.
          </p>

          <div className="mt-10 text-7xl text-center">
            🛍️
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Login
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="relative mb-5">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="absolute right-4 top-4 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </button>

            {/* Register */}
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Login;