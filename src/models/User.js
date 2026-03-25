// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Yahan Bcrypt wala hashed password aayega
    role: { type: String, default: "admin" } // Hum isko default admin rakh rahe hain kyunki yeh uska apna blog hai
  },
  { timestamps: true } // Yeh automatically createdAt aur updatedAt bana dega
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);