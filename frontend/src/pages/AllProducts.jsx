import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import { useSearchParams } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(
  searchParams.get("search") || ""
);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sort, setSort] = useState("");
  const categories = [
   
    "Mobiles",
    "Laptop",
    "Headphones",
    "AirPods",
    "Smart Watch",
    "Accessories"
   
  ];
  useEffect(() => {
  setSearch(searchParams.get("search") || "");
  setPage(1);
}, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [page, search, category, minPrice, maxPrice, stock, sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products", {
        params: {
          page,
          search,
          category,
          minprice: minPrice,
          maxPrice,
          stock,
          sort,
        },
      });

      // If backend returns object
      if (res.data.products) {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages || 1);
      }
      // If backend returns array
      else {
        setProducts(res.data);
        setTotalPages(1);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setStock("");
    setSort("");
    setPage(1);
  };
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

    {/* Hero */}
    <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <h1 className="text-5xl font-extrabold">
          🛍️ Discover Products
        </h1>

        <p className="text-lg text-blue-100 mt-3">
          Find the latest products at the best prices.
        </p>

      </div>

    </div>

    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Filter Card */}

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white p-8 mb-10">

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Filters
            </h2>

            <p className="text-gray-500">
              {products.length} Products Found
            </p>

          </div>

          <button
            onClick={clearFilters}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Clear Filters
          </button>

        </div>

        <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-5">

          <div className="relative">

            <span className="absolute left-4 top-3.5 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e)=>{
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full border-2 border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
            />

          </div>

          <select
            value={category}
            onChange={(e)=>{
              setCategory(e.target.value)
              setPage(1)
            }}
            className="border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500"
          >
            <option value="">All Categories</option>

            {categories.map(cat=>(
              <option key={cat}>
                {cat}
              </option>
            ))}

          </select>

          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e)=>{
              setMinPrice(e.target.value)
              setPage(1)
            }}
            className="border-2 border-gray-200 rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e)=>{
              setMaxPrice(e.target.value)
              setPage(1)
            }}
            className="border-2 border-gray-200 rounded-xl p-3"
          />

          <select
            value={stock}
            onChange={(e)=>{
              setStock(e.target.value)
              setPage(1)
            }}
            className="border-2 border-gray-200 rounded-xl p-3"
          >
            <option value="">Stock</option>
            <option value="instock">In Stock</option>
            <option value="outofstock">Out of Stock</option>
          </select>

          <select
            value={sort}
            onChange={(e)=>{
              setSort(e.target.value)
              setPage(1)
            }}
            className="border-2 border-gray-200 rounded-xl p-3"
          >
            <option value="">Sort</option>
            <option value="priceAsc">Price ↑</option>
            <option value="priceDesc">Price ↓</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

        </div>

      </div>

      {/* Products */}

      {loading ? (

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {[...Array(8)].map((_,i)=>(
            <div
              key={i}
              className="bg-white rounded-3xl h-96 animate-pulse"
            />
          ))}

        </div>

      ) : products.length===0 ? (

        <EmptyState />

      ) : (

        <>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {products.map(product=>(
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

          {/* Pagination */}

          {totalPages>1 && (

            <div className="flex justify-center items-center gap-3 mt-14">

              <button
                onClick={()=>setPage(page-1)}
                disabled={page===1}
                className="px-5 py-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 transition"
              >
                ← Previous
              </button>

              {[...Array(totalPages)].map((_,i)=>(

                <button
                  key={i}
                  onClick={()=>setPage(i+1)}
                  className={`w-12 h-12 rounded-xl font-bold transition ${
                    page===i+1
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg scale-110"
                    : "bg-white hover:bg-indigo-50 shadow"
                  }`}
                >
                  {i+1}
                </button>

              ))}

              <button
                onClick={()=>setPage(page+1)}
                disabled={page===totalPages}
                className="px-5 py-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 transition"
              >
                Next →
              </button>

            </div>

          )}

        </>

      )}

    </div>

  </div>
);
}

export default AllProducts;