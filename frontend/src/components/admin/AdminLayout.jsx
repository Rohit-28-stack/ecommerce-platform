
import AdminSidebar from "./AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
function AdminLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
  <div className="flex min-h-screen bg-gray-100">

    {/* Sidebar */}
    <AdminSidebar />

    {/* Main Content */}
    <div className="flex-1 p-6">

      {/* Top Bar */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      <Outlet />

    </div>
  </div>
);
}

export default AdminLayout;