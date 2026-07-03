import { useState, useEffect } from "react";
import API from "../services/api"
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null)
  const [editingId, setEditingId] = useState(null);
  const [address, setAddress] =
    useState({
      fullName: "",
      mobile: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: ""
    });

  useEffect(() => {
    fetchProfile();
  }, [])

  const updateProfile = async () => {
    try {
      await API.put("/users/me", {
        name: user.name,
        email: user.email
      })
         toast.success("Profile updated successfully");
      fetchProfile()
    }
    catch (err) {
       toast.error(err.response?.data?.message || "Failed to update profile");

    }
  }
  const addAddress = async () => {
    if (
      !address.fullName ||
      !address.mobile ||
      !address.addressLine ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
       toast.error("Please fill all fields");
      return;
    }

    try {
      await API.post("/users/addresses", address);

     toast.success("Address added successfully");

      setAddress({
        fullName: "",
        mobile: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      });

      fetchProfile();

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add address");
    }
  };

  const updateAddress = async () => {
    try {
      await API.put(`/users/addresses/${editingId}`, address);

        toast.success("Address updated successfully");

      setEditingId(null);

      setAddress({
        fullName: "",
        mobile: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      });

      fetchProfile();
    } catch (err) {
       toast.error(err.response?.data?.message || "Failed to update address");
    }
  };
  const deleteAddress = async (id) => {
    try {

      await API.delete(
        `/users/addresses/${id}`
      );
       toast.success("Address deleted successfully");

      fetchProfile();

    } catch (err) {

      toast.error(err.response?.data?.message || "Failed to delete address");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me")
      setUser(res.data)
    }
    catch (err) {
       toast.error("Failed to load profile");
    }
  }
  if (!user) return <h2>Loading....</h2>

 return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-50 to-purple-100 py-12 px-5">
    <div className="max-w-6xl mx-auto space-y-10">

      {/* ================= PROFILE ================= */}
      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-white text-indigo-600 flex items-center justify-center text-5xl font-bold shadow-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {user.name}
              </h1>

              <p className="text-indigo-100 mt-2">
                {user.email}
              </p>

              <span className="inline-block mt-4 bg-white/20 px-4 py-1 rounded-full text-sm">
                Premium Member
              </span>
            </div>

          </div>
        </div>

        {/* Profile Form */}

        <div className="p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold">
                Full Name
              </label>

              <input
                value={user.name}
                onChange={(e)=>
                  setUser({
                    ...user,
                    name:e.target.value
                  })
                }
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                value={user.email}
                onChange={(e)=>
                  setUser({
                    ...user,
                    email:e.target.value
                  })
                }
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
              />
            </div>

          </div>

          <button
            onClick={updateProfile}
            className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition duration-300 px-8 py-3 rounded-xl text-white font-bold shadow-lg"
          >
            Save Changes
          </button>
        </div>

      </div>



      {/* ================= ADDRESS ================= */}

      <div className="bg-white rounded-3xl shadow-2xl p-8">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            📍 Saved Addresses
          </h2>

          <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full">
            {user.addresses?.length || 0} Address
          </span>

        </div>

        {user.addresses?.length > 0 ? (

          <div className="grid lg:grid-cols-2 gap-6">

            {user.addresses.map((addr)=>(
              <div
                key={addr._id}
                className="group border border-gray-200 rounded-3xl p-6 hover:border-indigo-400 hover:-translate-y-2 hover:shadow-2xl transition duration-300 bg-gradient-to-br from-white to-gray-50"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-xl">
                      {addr.fullName}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      📞 {addr.mobile}
                    </p>

                  </div>

                  <div className="text-4xl">
                    🏠
                  </div>

                </div>

                <div className="mt-5 space-y-2 text-gray-700">

                  <p>{addr.addressLine}</p>

                  <p>
                    {addr.city}, {addr.state}
                  </p>

                  <p>{addr.pincode}</p>

                </div>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={()=>{
                      setEditingId(addr._id)

                      setAddress({
                        fullName:addr.fullName,
                        mobile:addr.mobile,
                        addressLine:addr.addressLine,
                        city:addr.city,
                        state:addr.state,
                        pincode:addr.pincode,
                      })
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl text-white py-3 font-semibold transition"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={()=>deleteAddress(addr._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 rounded-xl text-white py-3 font-semibold transition"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        ) : (

          <div className="text-center py-20">

            <div className="text-7xl">
              📭
            </div>

            <h3 className="text-2xl font-bold mt-5">
              No Address Saved
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first delivery address.
            </p>

          </div>

        )}

      </div>



      {/* ================= ADD ADDRESS ================= */}

      <div className="bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold mb-8">
          {editingId ? "✏ Update Address" : "➕ Add New Address"}
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {[
            {
              label:"Full Name",
              key:"fullName"
            },
            {
              label:"Mobile",
              key:"mobile"
            },
            {
              label:"Address",
              key:"addressLine",
              span:true
            },
            {
              label:"City",
              key:"city"
            },
            {
              label:"State",
              key:"state"
            },
            {
              label:"Pincode",
              key:"pincode",
              span:true
            }
          ].map((item)=>(
            <input
              key={item.key}
              placeholder={item.label}
              value={address[item.key]}
              onChange={(e)=>
                setAddress({
                  ...address,
                  [item.key]:e.target.value
                })
              }
              className={`border-2 border-gray-200 rounded-xl p-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition ${
                item.span ? "md:col-span-2" : ""
              }`}
            />
          ))}

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={editingId ? updateAddress : addAddress}
            className={`px-8 py-3 rounded-xl text-white font-bold shadow-lg transition hover:scale-105 ${
              editingId
                ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                : "bg-gradient-to-r from-green-500 to-emerald-600"
            }`}
          >
            {editingId ? "Update Address" : "Add Address"}
          </button>

          {editingId && (
            <button
              onClick={()=>{
                setEditingId(null)

                setAddress({
                  fullName:"",
                  mobile:"",
                  addressLine:"",
                  city:"",
                  state:"",
                  pincode:"",
                })
              }}
              className="px-8 py-3 bg-gray-500 hover:bg-gray-600 rounded-xl text-white font-bold transition"
            >
              Cancel
            </button>
          )}

        </div>

      </div>

    </div>
  </div>
);
}
export default Profile