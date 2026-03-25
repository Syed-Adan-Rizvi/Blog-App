// src/app/api/blogs/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // Rasta check kar lijiyega

export async function POST(request) {
  try {
    // 🛑 THE API GUARD: Pehle check karo ke API ko call karne wala Logged In hai ya nahi?
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Aapko blog likhne ki ijazat nahi hai!" }, { status: 401 });
    }

    await connectDB();

    // 📦 1. Frontend se aane wala FormData (Text + Image) pakarna
    const formData = await request.formData();
    console.log("====== FORM DATA ======", formData);
    const title = formData.get("title");
    const content = formData.get("content");
    const image = formData.get("image"); // Yeh ek 'File' object hoga

    console.log("====== IMAGE KA DATA ======", typeof image, image);

    if (!title || !content || !image) {
      return NextResponse.json({ error: "Title, Content aur Image zaroori hain" }, { status: 400 });
    }

    // 🗜️ 2. Image ko Cloudinary ke qabil banana (Buffer Conversion)
    // Next.js mein file direct upload nahi hoti, usko pehle raw bytes (Buffer) mein badalna parta hai
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ☁️ 3. Cloudinary par Upload karna (The Magic Stream)
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "blog_cms_images" }, // Cloudinary mein is naam ka ek naya folder ban jayega
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      // Buffer wali file Cloudinary ko bhej di
      uploadStream.end(buffer); 
    });

    // 💾 4. Database mein Blog Save karna
    const newBlog = await Blog.create({
      title: title,
      content: content,
      imageUrl: uploadResponse.secure_url, // Cloudinary se aane wala live URL
      author: session.user.id // 🌟 Jadoo: Session se Admin ki ID nikal kar as an Author save kar di!
    });

    return NextResponse.json({ 
      success: true, 
      message: "Blog successfully publish ho gaya!", 
      blog: newBlog 
    }, { status: 201 });

  } catch (error) {
    console.log("Blog creation error:", error);
    return NextResponse.json({ error: "Server mein koi masla aa gaya!" }, { status: 500 });
  }
}