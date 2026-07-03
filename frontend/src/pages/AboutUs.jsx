import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

function About() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            About Our Store
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-indigo-100 leading-8">
            Welcome to our online shopping platform, where quality products,
            affordable prices, and customer satisfaction come together to
            create an exceptional shopping experience.
          </p>

          <div className="mt-10">
            <Link
              to="/products"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>

        </div>
      </section>

      {/* About Company */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1738908521678-bc684edb8847?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGVjb21tZXJjZSUyMGFib3V0JTIwdXN8ZW58MHx8MHx8fDA%3D"
              alt="About Us"
              className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
            />
          </div>

          {/* Content */}
          <div>

            <span className="text-indigo-600 font-semibold uppercase tracking-widest">
              Who We Are
            </span>

            <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-6">
              Making Online Shopping Simple & Reliable
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              We are passionate about providing customers with premium-quality
              products at affordable prices. Our platform is designed to make
              online shopping easy, secure, and enjoyable with fast delivery,
              trusted payment options, and dedicated customer support.
            </p>

            <p className="text-gray-600 leading-8">
              From electronics and fashion to accessories and daily essentials,
              we carefully select products that meet the highest standards of
              quality and value.
            </p>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">
            <FaShoppingBag className="text-5xl text-indigo-600 mx-auto mb-5" />
            <h3 className="text-xl font-bold mb-3">
              Premium Products
            </h3>
            <p className="text-gray-600">
              Carefully selected products with the best quality and value.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">
            <FaShippingFast className="text-5xl text-green-600 mx-auto mb-5" />
            <h3 className="text-xl font-bold mb-3">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Reliable shipping with quick and safe delivery nationwide.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">
            <FaShieldAlt className="text-5xl text-blue-600 mx-auto mb-5" />
            <h3 className="text-xl font-bold mb-3">
              Secure Payments
            </h3>
            <p className="text-gray-600">
              Shop confidently with safe and trusted payment methods.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">
            <FaHeadset className="text-5xl text-pink-600 mx-auto mb-5" />
            <h3 className="text-xl font-bold mb-3">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Our support team is always ready to help whenever you need us.
            </p>
          </div>

        </div>

      </section>
            {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Mission */}
            <div className="bg-indigo-50 rounded-3xl p-10 shadow-lg border border-indigo-100">

              <span className="text-indigo-600 font-semibold uppercase tracking-wider">
                Our Mission
              </span>

              <h2 className="text-3xl font-bold text-gray-800 mt-3 mb-5">
                Deliver Quality Shopping Experiences
              </h2>

              <p className="text-gray-600 leading-8">
                Our mission is to make online shopping simple, secure, and
                affordable by providing high-quality products, competitive
                prices, fast delivery, and excellent customer service. We aim
                to build long-term trust with every customer.
              </p>

            </div>

            {/* Vision */}
            <div className="bg-blue-50 rounded-3xl p-10 shadow-lg border border-blue-100">

              <span className="text-blue-600 font-semibold uppercase tracking-wider">
                Our Vision
              </span>

              <h2 className="text-3xl font-bold text-gray-800 mt-3 mb-5">
                Become a Trusted Online Marketplace
              </h2>

              <p className="text-gray-600 leading-8">
                We envision becoming one of the most trusted online shopping
                platforms by offering innovative technology, reliable service,
                and an outstanding shopping experience for customers everywhere.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose Us?
          </h2>

          <p className="text-gray-500 mt-3 max-w-3xl mx-auto">
            We are committed to providing a seamless online shopping experience
            with quality products and customer-first service.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-5">🛍️</div>
            <h3 className="text-xl font-bold mb-3">
              Wide Product Range
            </h3>
            <p className="text-gray-600">
              Discover products across multiple categories for every need.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-5">💰</div>
            <h3 className="text-xl font-bold mb-3">
              Best Prices
            </h3>
            <p className="text-gray-600">
              Competitive pricing with regular offers and discounts.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-5">🚚</div>
            <h3 className="text-xl font-bold mb-3">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Quick and secure delivery right to your doorstep.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-5">🔒</div>
            <h3 className="text-xl font-bold mb-3">
              Safe Shopping
            </h3>
            <p className="text-gray-600">
              Secure checkout and trusted payment options for every order.
            </p>
          </div>

        </div>

      </section>

      {/* Our Services */}
      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold text-gray-800">
              Our Services
            </h2>

            <p className="text-gray-500 mt-3">
              Everything you need for a smooth shopping experience.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                Product Quality
              </h3>
              <p className="text-gray-600 leading-7">
                Every product is carefully selected and quality-checked before
                being made available to our customers.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                Easy Returns
              </h3>
              <p className="text-gray-600 leading-7">
                Hassle-free return and exchange process for eligible products.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                Customer Support
              </h3>
              <p className="text-gray-600 leading-7">
                Friendly support team available to help with orders and queries.
              </p>
            </div>

          </div>

        </div>
      </section>
            {/* Statistics */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center bg-gray-50 rounded-2xl p-8 shadow-md">
              <h2 className="text-5xl font-bold text-indigo-600">10K+</h2>
              <p className="text-gray-600 mt-3 font-medium">
                Happy Customers
              </p>
            </div>

            <div className="text-center bg-gray-50 rounded-2xl p-8 shadow-md">
              <h2 className="text-5xl font-bold text-green-600">500+</h2>
              <p className="text-gray-600 mt-3 font-medium">
                Premium Products
              </p>
            </div>

            <div className="text-center bg-gray-50 rounded-2xl p-8 shadow-md">
              <h2 className="text-5xl font-bold text-blue-600">99%</h2>
              <p className="text-gray-600 mt-3 font-medium">
                Customer Satisfaction
              </p>
            </div>

            <div className="text-center bg-gray-50 rounded-2xl p-8 shadow-md">
              <h2 className="text-5xl font-bold text-pink-600">24/7</h2>
              <p className="text-gray-600 mt-3 font-medium">
                Customer Support
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Call To Action */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-20">

        <div className="max-w-4xl mx-auto px-6 text-center text-white">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>

          <p className="text-lg text-indigo-100 leading-8 mb-10">
            Explore our latest collection of high-quality products and enjoy
            secure shopping, fast delivery, and excellent customer service.
          </p>

          <Link
            to="/products"
            className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Explore Products
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;