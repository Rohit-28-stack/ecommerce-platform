const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path=require("path")
const cors = require("cors");


const userRoutes = require("./routes/userRoutes");
const productrouter=require("./routes/productrotes")
const cartRouter=require("./routes/cartrouter")
const orderRoutes = require("./routes/orderRouter");
const wishlistroutes=require("./routes/wishlistRoutes")
const adminroutes=require("./routes/adminRoutes")
const paymentRoutes = require("./routes/paymentRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-platform-pied.vercel.app",
      "https://ecommerce-platform-4zddxz20j-rohits-projects-61d648e9.vercel.app",
      "https://ecommerce-platform-git-main-rohits-projects-61d648e9.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/users", userRoutes);
app.use("/products",productrouter)
app.use("/cart",cartRouter)
app.use("/orders", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/wishlist",wishlistroutes)
app.use("/admin",adminroutes)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


module.exports = app;