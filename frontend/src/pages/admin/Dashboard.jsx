import { FaBoxOpen, FaShoppingCart, FaUsers, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
function Dashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalUsers: 0,
        totalProducts: 0,
        totalRevenue: 0,
        recentOrders: [],
    });
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get("/admin/stats");
                setStats(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchStats();
    }, []);


    return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 p-8">

    {/* HEADER */}
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold text-gray-800">
        Admin Dashboard
      </h1>
      <p className="text-gray-500 mt-2">
        Overview of your store performance
      </p>
    </div>

    {/* STATS GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl hover:-translate-y-1 transition">
        <FaBoxOpen className="text-4xl text-blue-600 mb-3" />
        <h2 className="text-gray-500">Products</h2>
        <h1 className="text-3xl font-bold text-gray-800">
          {stats.totalProducts}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl hover:-translate-y-1 transition">
        <FaShoppingCart className="text-4xl text-green-600 mb-3" />
        <h2 className="text-gray-500">Orders</h2>
        <h1 className="text-3xl font-bold text-gray-800">
          {stats.totalOrders}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl hover:-translate-y-1 transition">
        <FaUsers className="text-4xl text-purple-600 mb-3" />
        <h2 className="text-gray-500">Users</h2>
        <h1 className="text-3xl font-bold text-gray-800">
          {stats.totalUsers}
        </h1>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition">
        <FaRupeeSign className="text-4xl mb-3" />
        <h2 className="opacity-90">Revenue</h2>
        <h1 className="text-3xl font-bold">
          ₹{stats.totalRevenue}
        </h1>
      </div>

    </div>

    {/* RECENT ORDERS */}
    <div className="bg-white rounded-2xl shadow-lg mt-10 p-6 border">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>
            <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {stats.recentOrders?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No Recent Orders
                </td>
              </tr>
            ) : (
              stats.recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-medium text-gray-700">
                    #{order._id.slice(-6)}
                  </td>

                  <td className="p-4 text-gray-600">
                    {order.user?.name || "Guest"}
                  </td>

                  <td className="p-4 font-semibold text-indigo-600">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Shipped"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  </div>
);
}

export default Dashboard;