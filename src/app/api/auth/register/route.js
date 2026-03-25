// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs"; // Password hash karne wali machine

export async function POST(request) {
  try {
    await connectDB();
    
    // Frontend se aane wala data pakra
    const { name, email, password } = await request.json();

    // Check kiya ke sab kuch likha hai ya nahi
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Saari fields bharna zaroori hai!" }, { status: 400 });
    }

    // Check kiya ke kya is email se pehle hi koi admin toh nahi hai?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Yeh email pehle se register hai!" }, { status: 400 });
    }

    // 🔒 THE MAGIC: Password ka Qeema (Hash) banaya
    const hashedPassword = await bcrypt.hash(password, 10);

    // Naya Admin Database mein save kar diya
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin" // Hamara pehla user by default admin hoga
    });

    return NextResponse.json({ message: "Admin account successfully ban gaya!" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Kuch ghalat ho gaya!", error: error.message }, { status: 500 });
  }
}