import { useEffect, useState } from "react";
import API from "../services/api"


function Cart() {
    const [cartItems, setcartItems] = useState([])

    useEffect(() => {
        fetchCart()
    }, [])

    const fetchCart = async () => {
        try {
            const res = await API.get("/cart")
            setcartItems(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const removeitem = async (id) => {
        try {
            await API.delete(`/cart/${id}`)
            fetchCart()
        } catch (err) {
            console.log(err)
        }
    }

    const updateQuantity = async (id, quantity) => {
        try {
            await API.put(`/cart/${id}`, {
                quantity: Number(quantity)
            })

            fetchCart()
        } catch (err) {
            console.log(err)
        }
    }

    const total = cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0)
    const placeOrder = async () => {
        try {
            await API.post("/orders")
            alert(
                "Order Placed Successfully"
            )
            fetchCart()
        }
        catch (err) {
            console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log(err);
        }
    }

    return (
        <div>
            <h1>My Cart</h1>
            {cartItems.length === 0 ? (
                <h3>Cart is Empty</h3>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item._id}>
                            <h3>{item.product.name}</h3>

                            <p>Price: ₹{item.product.price}</p>

                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) =>
                                    updateQuantity(item._id, e.target.value)
                                }
                            />

                            <button onClick={() => removeitem(item._id)}>
                                Remove
                            </button>
                          


                            <hr />
                        </div>
                    ))}

                    <h2>Total: ₹{total}</h2>
                      <button onClick={placeOrder}>
                                Place Order
                            </button>


                </>
            )}
        </div>
    )
}
export default Cart