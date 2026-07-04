const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // ✅ ADD THIS LINE
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("❌ MongoDB Connection Error:");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;