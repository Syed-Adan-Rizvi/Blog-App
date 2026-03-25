// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    imageUrl: { 
      type: String, 
      required: true // Yahan hum Cloudinary se aane wala URL save karenge
    },
    
    // 🌟 THE MAGIC: RELATIONSHIP (Dosti)
    author: {
      type: mongoose.Schema.Types.ObjectId, // Iska matlab hai "Yeh ek MongoDB ki ID hogi"
      ref: "User", // Iska matlab hai "Yeh ID 'User' namak collection se aayegi"
      required: true
    }
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);