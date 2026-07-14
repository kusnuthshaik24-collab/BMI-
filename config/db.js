const mongoose = require("mongoose");

const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

module.exports = connectDB;
