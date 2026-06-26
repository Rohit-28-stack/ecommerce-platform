import { Link } from "react-router-dom"

function ProductCard({product}){
    return (
        <div>
            <img src={`http://localhost:3000/uploads/${product.image}`} 
            alt={product.name}
            width="200"/>
            <h3>{product.name}</h3>

            <p>{product.price}</p>

            <p>{product.category}</p>

            <p>
                Rating:
                {product.averageRating||0}
            </p>

            <Link to={`/products/${product._id}`}>
            View Details</Link>
        </div>
    )
}

export default ProductCard;