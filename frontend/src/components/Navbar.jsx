import {Link} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Navbar(){

    const{
        token,logout
    }=useContext(AuthContext)

    return(
        <nav>
            <Link to='/'>Home</Link>
            {!token ?(
                <>
                <Link to="/login">
                Login
                </Link>
                   <Link to="/register">
                Register
                </Link>
                </>
            ):(
                <button onClick={logout} >Logout</button>
            )}
        </nav>
    )
}export default Navbar