import { useEffect, useState } from "react"
import API from "../services/api"

function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data)
    } catch (err) {
      console.log(err)
    }
  };

  if (!stats) return <h2>Loading...</h2>

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 p-8">

    {/* Header */}
    <h1 className="text-3xl font-bold text-gray-800 mb-8">
      Admin Dashboard
    </h1>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Users */}
      <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition">
        <h3 className="text-gray-500">Total Users</h3>
        <p className="text-3xl font-bold text-purple-600 mt-2">
          {stats.totalUsers}
        </p>
      </div>

      {/* Products */}
      <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition">
        <h3 className="text-gray-500">Total Products</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          {stats.totalProducts}
        </p>
      </div>

      {/* Orders */}
      <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition">
        <h3 className="text-gray-500">Total Orders</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {stats.totalOrders}
        </p>
      </div>

      {/* Revenue */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
        <h3 className="opacity-90">Total Revenue</h3>
        <p className="text-3xl font-bold mt-2">
          ₹{stats.totalRevenue}
        </p>
      </div>

    </div>
  </div>
);
}

export default AdminDashboard