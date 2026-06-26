import { useState, useEffect } from "react";
import API from "../services/api"


function Wishlist() {
    const [wishlist, setwishlist] = useState([])

    useEffect(() => {
        fetchwishlist()
    }, [])

    const fetchwishlist = async () => {
        try {
            const res = await API.get("/wishlist")
            setwishlist(res.data)

        } catch (err) {
            console.log(err)
        }
    }
    const removewishlist = async (id) => {
        try {
            await API.delete(`/wishlist/${id}`)
            fetchwishlist()

        } catch (err) {
            console.log(err)

        }

    }
    const movetocart = async (item) => {
        try {
            await API.post("/cart", {
                productId: item.product._id,
                quantity: 1
            })

            await API.delete(`/wishlist/${item._id}`)
            fetchwishlist();
            alert("moved to cart")
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>My Wishlist</h1>
            {
                wishlist.length === 0 ? (
                    <h3>no items In wishlist</h3>
                ) : (
                    wishlist.map((item) => (
                        <div key={item._id}>
                            <h3>{item.product.name}</h3>
                            <p>₹{item.product.price}</p>
                            <button onClick={() => removewishlist(item._id)}>
                                Remove
                            </button>
                            <button
                                onClick={() =>
                                    movetocart(item)
                                }
                            >
                                Move to Cart
                            </button>
                        </div>
                    ))
                )
            }
        </div>
    )
}
export default Wishlist