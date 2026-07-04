import { useEffect, useState } from "react";
import API from "/Ecommerce-web/frontend/src/services/api";
import toast from "react-hot-toast";

function ManageProducts() {
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      const data = res.data;

      setProducts(Array.isArray(data) ? data : data.products || data.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------------- CREATE PRODUCT ----------------
  const handleCreate = async () => {
    try {
       setLoading(true);
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);
      formData.append("description", form.description);
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append("image", images[i]);
        }
      }

      await API.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      fetchProducts();  

      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
      });

      setImages([]);
      fetchProducts();

    } catch (err) {
      console.log(err);
      toast.error("Error adding product");
    }
    finally {
    setLoading(false);
  }
  };


  // ---------------- EDIT PRODUCT ----------------
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });

    setEditingId(product._id);
  };

  // ---------------- UPDATE PRODUCT ----------------
  const handleUpdate = async () => {
    try {
      await API.put(`/products/${editingId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product updated successfully!");

      setEditingId(null);
      setForm({ name: "", price: "", description: "" });
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  // ---------------- DELETE PRODUCT ----------------
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product deleted successfully!");

      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 p-8">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Product Manager
          </h1>
          <p className="text-gray-500 mt-2">
            Add, update and manage your products easily
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition">

          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Add Product
          </h2>

          <div className="grid gap-4">

            <input className="input" placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input className="input" type="number" placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input className="input" placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <input className="input" type="number" placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <textarea className="input resize-none" rows="4"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

           <div className="mt-4">

  {/* Upload Box */}
  <label className="cursor-pointer block">
    <div className="border-2 border-dashed border-indigo-300 bg-indigo-50 hover:bg-indigo-100 transition rounded-2xl p-6 text-center">
      
      <p className="text-indigo-600 font-semibold">
        + Click or Add Images
      </p>

      <p className="text-xs text-gray-500 mt-1">
        JPG, PNG supported (you can select multiple)
      </p>

      <input
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          const newFiles = Array.from(e.target.files);
          setImages((prev) => [...prev, ...newFiles]);
        }}
      />
    </div>
  </label>

  {/* Preview Grid */}
  {images.length > 0 && (
    <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {images.map((img, index) => (
        <div
          key={index}
          className="relative group rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition"
        >
          <img
            src={URL.createObjectURL(img)}
            alt="preview"
            className="w-full h-24 object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Delete Button */}
          <button
            type="button"
            onClick={() =>
              setImages(images.filter((_, i) => i !== index))
            }
            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center shadow"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )}

</div>

          <button
  onClick={handleCreate}
  disabled={loading}
  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105"
  }`}
>
  {loading && (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  )}

  {loading ? "Uploading..." : "Add Product"}
</button>

          </div>
        </div>

        {/* SHOW BUTTON */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              fetchProducts();
              setShowProducts(true);
            }}
            className="bg-black text-white px-6 py-2 rounded-full shadow hover:bg-gray-800 transition"
          >
            Show All Products
          </button>
        </div>

        {/* PRODUCTS GRID */}
        {showProducts && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {Array.isArray(products) && products.length === 0 ? (
              <p className="text-center text-gray-500 col-span-2">
                No products found
              </p>
            ) : (
              products.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl shadow-lg p-5 border hover:shadow-2xl hover:-translate-y-1 transition"
                >

                  <h3 className="text-xl font-bold text-gray-800">
                    {p.name}
                  </h3>

                  <p className="text-indigo-600 font-semibold mt-1">
                    ₹ {p.price}
                  </p>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {p.description}
                  </p>

                  <div className="flex justify-between mt-5">

                    <button
                      onClick={() => handleEdit(p)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded-full hover:scale-105 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-full hover:scale-105 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default ManageProducts;