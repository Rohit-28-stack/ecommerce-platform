import { useState, useEffect } from "react";
import API from "../services/api"


function Profile() {
    const [user, setUser] = useState(null)
    
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
            alert("Profile Updated")
            fetchProfile()
        }
        catch (err) {
            console.log(err)

        }
    }
    const addAddress = async () => {
        try {

            await API.post(
                "/users/addresses",
                address
            );

            fetchProfile();

        } catch (err) {

            console.log(err);
        }
    };
    const deleteAddress = async (id) => {
        try {

            await API.delete(
                `/users/addresses/${id}`
            );

            fetchProfile();

        } catch (err) {

            console.log(err);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await API.get("/users/me")
            setUser(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    if (!user) return <h2>Loading....</h2>

    return (
          <div>
            <h1>My Profile</h1>

            <input
                value={user.name}
                onChange={(e) =>
                    setUser({
                        ...user,
                        name: e.target.value
                    })
                }
            />
            <br />

            <input
                value={user.email}
                onChange={(e) =>
                    setUser({
                        ...user,
                        email: e.target.value
                    })
                }
            />
            <br />

            <button onClick={updateProfile}>
                Update Profile
            </button>

            <h3>Name: {user.name}</h3>
            <h3>Email: {user.email}</h3>

            <hr />

            <h2>Saved Addresses</h2>

            {user.addresses?.length > 0 ? (
                user.addresses.map((addr) => (
                    <div
                        key={addr._id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        <p><b>{addr.fullName}</b></p>
                        <p>{addr.mobile}</p>
                        <p>{addr.addressLine}</p>
                        <p>
                            {addr.city}, {addr.state}
                        </p>
                        <p>{addr.pincode}</p>

                        <button onClick={() => deleteAddress(addr._id)}>
                            Delete Address
                        </button>
                    </div>
                ))
            ) : (
                <p>No Address Saved</p>
            )}

            <hr />

            <h2>Add New Address</h2>

            <input
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) =>
                    setAddress({
                        ...address,
                        fullName: e.target.value
                    })
                }
            />
            <br />

            <input
                placeholder="Mobile"
                value={address.mobile}
                onChange={(e) =>
                    setAddress({
                        ...address,
                        mobile: e.target.value
                    })
                }
            />
            <br />

            <input
                placeholder="Address"
                value={address.addressLine}
                onChange={(e) =>
                    setAddress({
                        ...address,
                        addressLine: e.target.value
                    })
                }
            />
            <br />

            <input
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                    setAddress({
                        ...address,
                        city: e.target.value
                    })
                }
            />
            <br />

            <input
                placeholder="State"
                value={address.state}
                onChange={(e) =>
                    setAddress({
                        ...address,
                        state: e.target.value
                    })
                }
            />
            <br />

            <input
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) =>
                    setAddress({
                        ...address,
                        pincode: e.target.value
                    })
                }
            />
            <br />
            <br />

            <button onClick={addAddress}>
                Add Address
            </button>
        </div>
    );
}
export default Profile