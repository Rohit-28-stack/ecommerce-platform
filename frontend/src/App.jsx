import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import ProtectedRoute from "./components/protectedroute"
import Wishlist from "./pages/Wishlist"
import Profile from "./pages/Profile"
import Orders from "./pages/Orders"
import AdminDashboard from "./pages/AdminDashboard"



function App() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products/:id" element={<ProductDetails/>}/>
                <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
                <Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;