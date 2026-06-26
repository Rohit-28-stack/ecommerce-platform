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
    <div>
      <h1>Admin Dashboard</h1>

      <h3>Total Users: {stats.totalUsers}</h3>

      <h3>Total Products: {stats.totalProducts}</h3>

      <h3>Total Orders: {stats.totalOrders}</h3>

      <h3>Total Revenue: ₹{stats.totalRevenue}</h3>
    </div>
  )
}

export default AdminDashboard