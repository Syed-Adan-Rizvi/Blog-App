// src/app/api/blogs/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import cloudinary from "@/lib/cloudinary"; // 🌟 Cloudinary ko import kiya

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Aapko ijazat nahi hai!" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog nahi mila" }, { status: 404 });
    }
    
    if (blog.author.toString() !== session.user.id) {
      return NextResponse.json({ error: "Aap kisi aur ka blog delete nahi kar sakte!" }, { status: 403 });
    }

    // 🌟 JADOO: Ek 'Smart Flag' jo poore function mein nazar aayega
    let isImageDeleted = true; 

    // ☁️ THE ULTIMATE BULLETPROOF MAGIC: Cloudinary Image Deletion
    if (blog.imageUrl) {
      try {
        console.log("🔍 Original Image URL:", blog.imageUrl);
        const folderName = "blog_cms_images";
        const startIndex = blog.imageUrl.indexOf(folderName);
        
        if (startIndex !== -1) {
          const pathWithExtension = blog.imageUrl.substring(startIndex);
          const publicId = pathWithExtension.substring(0, pathWithExtension.lastIndexOf('.'));

          console.log("👉 Target Public ID:", publicId);

          // Cloudinary ko order diya
          const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);
          console.log("☁️ Cloudinary Ka Jawab:", cloudinaryResponse);

          // Agar Cloudinary na 'ok' kahe aur na 'not found', tabhi masla hai
          if (cloudinaryResponse.result !== "ok" && cloudinaryResponse.result !== "not found") {
             isImageDeleted = false; // Flag ko gira do taaki DB se delete na ho
          }
        } else {
          console.log("⚠️ Is URL mein hamara Cloudinary folder nahi mila, skipping deletion.");
          // Kyunki image hamare system ki nahi hai, hum isko true hi rehne denge taaki blog delete ho jaye
        }
      } catch (cloudError) {
        console.error("❌ Cloudinary Delete Error:", cloudError);
        isImageDeleted = false; // Error aane par flag gira do
      }
    }

    // 💥 FINAL STRIKE: Ab Database se blog uda do
    if (!isImageDeleted) {
      return NextResponse.json({ error: "Image delete hone mein masla aaya, isliye blog delete nahi kiya!" }, { status: 500 });
    }
    
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Blog completely delete ho gaya!" });

  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



// Update Logic:


// src/app/api/blogs/[id]/route.js ke aakhir mein yeh add karein 👇

export async function PUT(request, { params }) {
  try {
    // 🛑 GUARD: VIP Pass Check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Aapko ijazat nahi hai!" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    // 🔍 Purana Blog dhoondo
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ error: "Blog nahi mila" }, { status: 404 });
    if (blog.author.toString() !== session.user.id) return NextResponse.json({ error: "Aap kisi aur ka blog edit nahi kar sakte!" }, { status: 403 });

    // 📦 Frontend se naya data pakro
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const image = formData.get("image"); // Yeh tasveer ho sakti hai ya phir khali (null)
    console.log("====== UPDATE API MEIN KYA AAYA? ======");
    console.log("Title:", title);
    console.log("Image Type:", typeof image);
    console.log("Image Data:", image);
    console.log("=======================================")

    let newImageUrl = blog.imageUrl; // By default: Purani tasveer hi rakho

    // 🌟 THE MAGIC: Agar admin ne koi NAYI file select ki hai (text nahi)
    if (image && typeof image !== 'string' && image.arrayBuffer) {
      console.log("🔄 Nayi image detect hui! Purani ko delete kar rahe hain...");

      // 1. Purani tasveer ko Cloudinary se aag lagao (Iron-Man Logic)
      if (blog.imageUrl) {
        const folderName = "blog_cms_images";
        const startIndex = blog.imageUrl.indexOf(folderName);
        if (startIndex !== -1) {
          const pathWithExtension = blog.imageUrl.substring(startIndex);
          const publicId = pathWithExtension.substring(0, pathWithExtension.lastIndexOf('.'));
          await cloudinary.uploader.destroy(publicId);
        }
      }

      // 2. Nayi tasveer ko Buffer bana kar upload karo
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "blog_cms_images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      // 3. Nayi tasveer ka URL save kar lo
      newImageUrl = uploadResponse.secure_url;
    }

    // 💾 Database mein naya Title, Content aur Image URL save kar do
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.imageUrl = newImageUrl;
    
    await blog.save();

    return NextResponse.json({ success: true, message: "Blog successfully update ho gaya!" });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}