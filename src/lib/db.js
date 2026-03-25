// lib/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  // Agar pehle se connection bana hua hai (readyState 1 ka matlab connected hai)
  if (mongoose.connection.readyState === 1) {
    console.log("Database pehle se connected hai!");
    return true;
  }

  // Agar nahi hai, toh naya connection banao
  try {
    // Apni .env.local file mein MONGODB_URI zaroor daaliyega
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Successfully Connected! 🎉");
    return true;
  } catch (error) {
    console.log("Database connection error: ", error);
    return false;
  }
};