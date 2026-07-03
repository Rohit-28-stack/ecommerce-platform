import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-8 text-center">
        Admin Panel
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          Dashboard
        </NavLink>


        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          Manage Products
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          Manage Users
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          Manage Orders
        </NavLink>

      </nav>

    </div>
  );
}

export default AdminSidebar;