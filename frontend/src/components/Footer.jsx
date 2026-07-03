import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold text-white">
              ShopEase
            </h2>

            <p className="mt-4 leading-7">
              ShopEase is your trusted destination for quality electronics,
              mobiles and accessories at affordable prices.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-white transition">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/wishlist" className="hover:text-white transition">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/orders" className="hover:text-white transition">
                  Orders
                </Link>
              </li>

            </ul>

          </div>

          {/* Categories */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Categories
            </h3>

            <ul className="space-y-3">

              <li>Electronics</li>
              <li>Mobiles</li>
              <li>Accessories</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                <span>Mumbai, Maharashtra</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>support@shopease.com</span>
              </div>

            </div>

            <div className="flex gap-4 mt-6">

              <a href="#">
                <FaFacebookF className="hover:text-white transition text-lg" />
              </a>

              <a href="#">
                <FaInstagram className="hover:text-white transition text-lg" />
              </a>

              <a href="#">
                <FaLinkedinIn className="hover:text-white transition text-lg" />
              </a>

              <a href="#">
                <FaGithub className="hover:text-white transition text-lg" />
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-12 pt-6 text-center">

          <p>
            © 2026 ShopEase. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;