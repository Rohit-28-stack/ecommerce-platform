import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetchProduct()
    }, [])

    const addtocart=async()=>{
        try{
            await API.post("/cart",{
                productId:product._id,
                quantity:1
            })
            alert("added to cart")
        }catch(err){
           console.log(err) 
        }
    }

    const addWislist=async()=>{
        try{
            await API.post("/wishlist",{
                productId:product._id
            })
            alert("added to wishlist")

        }catch(err){
            alert(err.response?.data?.message)

        }
    }

    const fetchProduct = async () => {
        const res = await API.get(`/products/${id}`)
        setProduct(res.data.product)
    }
    if (!product) return <h2>Loading....</h2>


    return (
        <div>
            <h1>{product.name}</h1>
            <img src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.name}
                width="250" />
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
            <p>
                Rating:
                {product.averageRating}
            </p>
            <button onClick={addtocart}>Add To Cart</button>
            <button onClick={addWislist}>Add To Wishlist</button>
        </div>
    )
}
export default ProductDetails;