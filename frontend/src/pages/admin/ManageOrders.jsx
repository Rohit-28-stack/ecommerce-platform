import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

function ManageOrders() {
  const [tempStatus, setTempStatus] = useState({});
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/all");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });

    toast.success(`Order status updated to "${status}"`);
      fetchOrders();
    } catch (err) {
         toast.error("Failed to update order status");
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 p-6">

    {/* Header */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Manage Orders
      </h1>
      <p className="text-gray-500 mt-1">
        Track and update all customer orders
      </p>
    </div>

    {/* Table Container */}
    <div className="bg-white rounded-2xl shadow-lg overflow-x-auto border border-gray-100">

      <table className="w-full text-sm">

        {/* HEAD */}
        <thead className="bg-indigo-600 text-white text-sm uppercase tracking-wide">
          <tr>
            <th className="p-4 text-left">Order ID</th>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Products</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Update</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-10 text-gray-500">
                No Orders Found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* Order ID */}
                <td className="p-4 font-medium text-gray-700">
                  #{order._id.slice(-6)}
                </td>

                {/* Customer */}
                <td className="p-4 text-gray-700">
                  {order.user?.name || "Guest"}
                </td>

                {/* Products */}
                <td className="p-4 text-gray-600">
                  {order.items.map((item) => (
                    <div key={item._id} className="text-xs">
                      • {item.product?.name} × {item.quantity}
                    </div>
                  ))}
                </td>

                {/* Total */}
                <td className="p-4 font-semibold text-indigo-600">
                  ₹{order.totalAmount}
                </td>

                {/* Status Badge */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full text-white shadow-sm ${
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

                {/* Date */}
                <td className="p-4 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <select
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                      value={tempStatus[order._id] || order.status}
                      onChange={(e) =>
                        setTempStatus({
                          ...tempStatus,
                          [order._id]: e.target.value,
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      onClick={() =>
                        updateStatus(
                          order._id,
                          tempStatus[order._id] || order.status
                        )
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm shadow transition"
                    >
                      Update
                    </button>

                  </div>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  </div>
);
}

export default ManageOrders;