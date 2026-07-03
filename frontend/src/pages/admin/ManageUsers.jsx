import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create User
  const handleCreateUser = async () => {
    try {
      await API.post("/users", form);

         toast.success("User created successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      fetchUsers();
    } catch (err) {
      console.log(err);
       toast.error("Unable to create user");
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      toast.success("User deleted successfully!");
    } catch (err) {
        toast.error("Failed to delete user");
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 p-6">

    {/* HEADER */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Manage Users
      </h1>
      <p className="text-gray-500 mt-1">
        Create, view and manage system users
      </p>
    </div>

    {/* CREATE USER CARD */}
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100">

      <h2 className="text-xl font-semibold text-gray-700 mb-5">
        Create User
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

      </div>

      <button
        onClick={handleCreateUser}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
      >
        + Create User
      </button>

    </div>

    {/* USERS TABLE */}
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">

      {/* TABLE HEADER */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-lg font-semibold">
          All Users
        </h2>
      </div>

      <table className="w-full text-sm">

        <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-10 text-gray-500">
                No Users Found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-medium text-gray-700">
                  {user.name}
                </td>

                <td className="p-4 text-gray-600">
                  {user.email}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm ${
                      user.role === "admin"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm shadow transition"
                  >
                    Delete
                  </button>

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

export default ManageUsers;