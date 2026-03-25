// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@blog.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Database connect kiya
        await connectDB();

        // 2. Email se user dhoonda
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Ghalat Email ya Password!");
        }

        // 3. Password match kiya (Bcrypt se)
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordMatch) {
          throw new Error("Ghalat Email ya Password!");
        }

        // 4. Sab theek hai toh VIP Pass ke liye data de diya
        return { 
          id: user._id.toString(), 
          name: user.name, 
          email: user.email, 
          role: user.role 
        };
      }
    })
  ],

    // 🌟 THE FIX: Callbacks (Data ko aage pass karne ka rasta)
  callbacks: {
    // Step 1: Login ke waqt User se ID nikal kar Token mein daalo
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // Step 2: Jab bhi koi session mange, Token se ID nikal kar Session mein daalo
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Ab yeh id humein api/blogs mein mil jayegi!
        session.user.role = token.role;
      }
      return session;
    }
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Yeh humein .env.local mein dalni hogi
  
  // ager ap ny apna login page bnaya hai to us ko yaha per btay, ta ky ager user login nhi hai to us ko ap ky bnay huy page per ly ker jay, ager ap yah nhi btay gy to NextAuth ka apna b Login page hota hai jo ky humy wo by default deta hai ager developer ny apna login page nhi bnawa to wo apna login page dekha deta hai jo ky bilkul login page ki terha kam kerta hai (wesy us ky apny page a path yah hai : api/auth/signin?callbackUrl=%2Fadmin)
  pages: {
    signIn: "/login", // Guard ko bol diya ke dhakka de kar is page par bhejna hai!
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };