import { useEffect, useState, useRef } from "react"
import API from "../services/api"
import ProductCard from "../components/ProductCard"
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const categories = [
    "Electronics",
    "Mobiles",
    "Accessories",
  ]
  const featuredRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products?limit=100")
      setProducts(res.data.products)
    } catch (err) {
      toast.dismiss(loadingToast);
       toast.error(err.response?.data?.message || "Failed to load products");
    }
  }
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  const productsPerPage = 8;
  const start = (page - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    start,
    start + productsPerPage
  );
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Hero Section */}
     <section className="relative overflow-hidden rounded-[40px] py-28 px-12 shadow-2xl bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://plus.unsplash.com/premium_photo-1664201889922-66bc3c778c1e?q=80&w=1600&auto=format&fit=crop')",
  }}
>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

  {/* Glow Effects */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/30 blur-[120px] rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>

  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

    {/* LEFT CONTENT */}
    <div className="max-w-2xl">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-5 py-2 text-sm text-white border border-white/20">
        ⚡ New Collection 2026
      </div>

      {/* Heading */}
      <h1 className="mt-8 text-6xl font-extrabold leading-tight text-white">
        Premium <br />
        Electronics Store
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg text-gray-200 leading-8">
        Discover top-quality laptops, mobiles, headphones and accessories
        with secure payments, fast delivery, and exclusive deals.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex gap-5">

        <Link to="/products">
  <button className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition">
    Shop Now
  </button>
</Link>

      

<Link to="/products?category=deals">
  <button className="px-8 py-4 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-105 transition">
    Explore Deals
  </button>
</Link>
      </div>

    </div>

 

  </div>

</section>

        {/* Stats */}
        <section className="mt-16">
  <h2 className="text-3xl font-bold text-center mb-10">
    Why Shop With Us?
  </h2>

  <div className="grid md:grid-cols-4 gap-8">

    <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
      <div className="text-5xl mb-4">🚚</div>
      <h3 className="font-bold text-xl">Fast Delivery</h3>
      <p className="text-gray-500 mt-2">
        Quick and secure delivery across the country.
      </p>
    </div>

    <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
      <div className="text-5xl mb-4">💳</div>
      <h3 className="font-bold text-xl">Secure Payment</h3>
      <p className="text-gray-500 mt-2">
        Multiple payment methods with complete security.
      </p>
    </div>

    <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
      <div className="text-5xl mb-4">🔄</div>
      <h3 className="font-bold text-xl">Easy Returns</h3>
      <p className="text-gray-500 mt-2">
        Hassle-free returns and replacements.
      </p>
    </div>

    <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
      <div className="text-5xl mb-4">🎧</div>
      <h3 className="font-bold text-xl">24/7 Support</h3>
      <p className="text-gray-500 mt-2">
        Our team is always ready to help you.
      </p>
    </div>

  </div>
</section>

    
    

        {/* Featured Products starts here */}
        <div ref={featuredRef} className="mt-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">

            <div>

              <h2 className="text-5xl font-black tracking-tight text-slate-900">
                Featured Products
              </h2>

              <p className="mt-3 text-lg text-slate-500">
                Explore our premium collection with modern design and top quality.
              </p>

            </div>

            <div className="mt-6 md:mt-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-semibold shadow-lg">
              {filteredProducts.length} Products
            </div>

          </div>

          {/* Products */}

          {currentProducts.length === 0 ? (

            <EmptyState message="No Products Found" />

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {currentProducts.map((product) => (

                <div
                  key={product._id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
                >

                  <div className="overflow-hidden">

                    <div className="transition-transform duration-500 group-hover:scale-105">
                      <ProductCard product={product} />
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Pagination */}

        <div className="mt-16 flex items-center justify-center gap-6">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <div className="rounded-xl border border-slate-200 bg-white px-8 py-3 text-lg font-bold shadow-lg">
            {page} / {totalPages}
          </div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  )



}

export default Home