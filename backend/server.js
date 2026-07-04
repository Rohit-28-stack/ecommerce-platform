require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

// 🔥 Create HTTP server from Express app
const server = http.createServer(app);

// 🔥 Attach Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  },
});

// 🔥 Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 🔥 Make io accessible in controllers
app.set("io", io);

// 🔥 IMPORTANT: use server.listen instead of app.listen
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});