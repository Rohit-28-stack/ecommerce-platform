import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiShoppingBag } from "react-icons/fi";
import SearchBar from "./SearchBar";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";


function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  const handleSearch = () => {
  if (!search.trim()) return;

  navigate(`/products?search=${search}`);
};
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">

        {/* Top Navbar */}
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

          {/* Logo */}


          <Link
            to="/"
            className="flex items-center gap-3 text-3xl font-extrabold text-slate-900 hover:text-indigo-600 transition"
          >
            <FiShoppingBag className="text-indigo-600 text-3xl" />

            ShopEase
          </Link>

          {/* Search */}
      <div className="hidden lg:flex flex-1 max-w-xl mx-10">
  <SearchBar
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onSearch={handleSearch}
  />
</div>

          {/* Right Menu */}

          <div className="flex items-center gap-5">

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">

              {token ? (
                <>
                  <Link
                    to="/wishlist"
                    className="text-slate-700 hover:text-red-500 transition"
                  >
                    <FaHeart size={21} />
                  </Link>

                  <Link
                    to="/cart"
                    className="text-slate-700 hover:text-indigo-600 transition"
                  >
                    <FaShoppingCart size={21} />
                  </Link>

                  <Link
                    to="/profile"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white transition"
                  >
                    <FaUser />
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-xl bg-red-500 px-5 py-2.5 text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>

                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>

            {/* Mobile Button */}

            <button
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>

        </div>

        {/* Category Navigation */}

        <div className="hidden md:block border-t border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-10 px-8 h-14">
            <Link
              to="/"
              className="font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Home
            </Link>

            {token && (
              <Link
                to="/orders"
                className="font-medium text-slate-600 hover:text-indigo-600 transition"
              >
                Orders
              </Link>
            )}

            <Link
              to="/products"
              className="font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              All Products
            </Link>

            <Link
              to="/about"
              className="font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              About Us
            </Link>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="flex flex-col p-5 gap-5">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-slate-700 hover:text-indigo-600"
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-slate-700 hover:text-indigo-600"
              >
                All Products
              </Link>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-slate-700 hover:text-indigo-600"
              >
                About Us
              </Link>

              {token && (
                <>
                  <Link
                    to="/wishlist"
                    onClick={() => setMenuOpen(false)}
                    className="font-medium text-slate-700 hover:text-indigo-600"
                  >
                    Wishlist
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="font-medium text-slate-700 hover:text-indigo-600"
                  >
                    Cart
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="font-medium text-slate-700 hover:text-indigo-600"
                  >
                    Orders
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="font-medium text-slate-700 hover:text-indigo-600"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              )}

              {!token && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="font-medium text-slate-700 hover:text-indigo-600"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-indigo-600 text-white py-3 rounded-xl text-center hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

      </nav>
    </>
  );






}

export default Navbar;