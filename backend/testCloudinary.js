require("dotenv").config();

const cloudinary = require("cloudinary").v2;

// STEP 1: Load env first
console.log("ENV CHECK:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});

// STEP 2: CONFIGURE BEFORE ANY API CALL
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("CONFIG DONE");

// STEP 3: NOW TEST
(async () => {
  try {
    const res = await cloudinary.api.ping();
    console.log("CLOUDINARY CONNECTED:", res);
  } catch (err) {
    console.log("ERROR:", err);
  }
})();