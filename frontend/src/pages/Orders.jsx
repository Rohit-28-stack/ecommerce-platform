import { useEffect,useState } from "react";
import API from "../services/api"


function Orders(){
    const [orders, setorders] = useState([])

    useEffect(()=>{
        fetchOrders()
    },[])


    const fetchOrders=async()=>{
        try{
            const res=await API.get("/orders")
            setorders(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

        return(
             <div>
            <h1>My Orders</h1>

            {orders.length === 0 ? (
                <h3>No Orders Found</h3>
            ) : (
                orders.map((order) => (
                    <div key={order._id}>
                        <h3>Order ID: {order._id}</h3>
                        <p>Total: {order.totalAmount}</p>
                        <p>Status: {order.status}</p>

                        <h4>Items:</h4>

                        {order.items.map((item, index) => (
                            <div key={index}>
                                <p>Product: {item.product?.name}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        ))}

                        <hr />
                    </div>
                ))
            )}
        </div>
        )
}
export default Orders