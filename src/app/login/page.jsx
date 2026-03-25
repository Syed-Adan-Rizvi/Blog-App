// src/app/login/page.jsx
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("❌ Invalid Credentials. Please try again.");
      } else {
        router.push("/admin");
      }
    } catch (error) {
      setError("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#a855f7] selection:text-white">
      
      {/* 🔮 THE MAGIC: Background Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#a855f7] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      {/* 🌟 LOGIN CARD (Glassmorphism) */}
      <div className="w-full max-w-md bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 relative z-10 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block text-3xl font-extrabold tracking-tight text-[#a855f7] mb-2 hover:opacity-80 transition-opacity">
            Luminous
          </Link>
          <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">
            Editor Portal Access
          </p>
        </div>

        {/* Error Message Box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center py-3 rounded-lg mb-6 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white px-5 py-4 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all placeholder-gray-600 text-sm"
              placeholder="admin@luminous.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white px-5 py-4 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all placeholder-gray-600 text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 disabled:opacity-50 mt-4"
          >
            {loading ? "Authenticating..." : "Secure Login"}
          </button>
        </form>

        <div className="mt-8 text-center">
                  <p className="text-gray-500 text-sm font-medium">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-[#a855f7] hover:text-white transition-colors font-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>

      </div>

      {/* Back to Home Link */}
      <div className="mt-8 relative z-10">
        <Link href="/" className="text-gray-500 text-sm font-medium hover:text-white transition-colors flex items-center gap-2">
          <span>&larr;</span> Return to Explore
        </Link>
      </div>

    </div>
  );
}




















// // app/login/page.jsx
// "use client";
// import { useState } from "react";
// import { signIn } from "next-auth/react"; // 🌟 THE NEXTAUTH MAGIC
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     // NextAuth ki agency ko login karne ka order dena
//     const res = await signIn("credentials", {
//       email,
//       password,
//       redirect: false, // Hum khud handle karenge ke login ke baad kahan jana hai
//     });

//     if (res.error) {
//       // Agar error aaya toh wo hamare [...nextauth] wale 'throw new Error' se aayega
//       setError(res.error); 
//     } else {
//       // Agar VIP Pass mil gaya, toh sidha Admin Dashboard bhej do!
//       router.push("/admin"); 
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 text-black">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-6 text-center text-purple-600">Admin Login</h1>
        
//         {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</div>}

//         <form onSubmit={handleLogin} className="flex flex-col gap-4">
//           <input 
//             type="email" placeholder="Email Address" required
//             className="border p-2 rounded focus:outline-purple-500"
//             onChange={(e) => setEmail(e.target.value)} 
//           />
//           <input 
//             type="password" placeholder="Password" required
//             className="border p-2 rounded focus:outline-purple-500"
//             onChange={(e) => setPassword(e.target.value)} 
//           />
//           <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 font-bold">
//             Login
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center">
//           Naya account banana hai? <Link href="/register" className="text-purple-600 underline">Register karein</Link>
//         </p>
//       </div>
//     </div>
//   );
// }