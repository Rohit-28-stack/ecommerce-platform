require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL,
      "https://ecommerce-platform-pied.vercel.app"
    ],
    credentials: true,
  },
});

app.set("io", io);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // 🔥 IMPORTANT

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
};

startServer();