// src/app/register/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
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
      // 🌟 Yahan aapki register API call hogi
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // Register successful hone par login page bhej do
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "❌ Registration failed. Try again.");
      }
    } catch (error) {
      setError("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#a855f7] selection:text-white">
      
      {/* 🔮 THE MAGIC: Background Glowing Orbs (Thoda different angle) */}
      <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#a855f7] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      {/* 🌟 REGISTER CARD (Glassmorphism) */}
      <div className="w-full max-w-md bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 relative z-10 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block text-3xl font-extrabold tracking-tight text-[#a855f7] mb-2 hover:opacity-80 transition-opacity">
            Luminous
          </Link>
          <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">
            Join Editor Portal
          </p>
        </div>

        {/* Error Message Box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center py-3 rounded-lg mb-6 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name Input */}
          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white px-5 py-4 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all placeholder-gray-600 text-sm"
              placeholder="e.g. Julian Vane"
            />
          </div>

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
              placeholder="curator@luminous.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
              Create Password
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Already a curator?{" "}
            <Link href="/login" className="text-[#a855f7] hover:text-white transition-colors font-bold">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}













// // app/register/page.jsx
// "use client"; // Kyunki hum form aur state use kar rahe hain
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleRegister = async (e) => {
//     e.preventDefault(); // Page ko refresh hone se rokna
//     setError("");

//     try {
//       // 🌟 THE MAGIC: Hamari banayi hui API ko data bhejna
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Agar account ban gaya toh user ko Login page par bhej do
//         alert("Account successfully ban gaya! Ab login karein.");
//         router.push("/login"); 
//       } else {
//         setError(data.message); // API se aane wala error dikhana
//       }
//     } catch (error) {
//       setError("Kuch ghalat ho gaya, dobara try karein.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 text-black">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">Admin Register</h1>
        
//         {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</div>}

//         <form onSubmit={handleRegister} className="flex flex-col gap-4">
//           <input 
//             type="text" placeholder="Full Name" required
//             className="border p-2 rounded focus:outline-indigo-500"
//             onChange={(e) => setName(e.target.value)} 
//           />
//           <input 
//             type="email" placeholder="Email Address" required
//             className="border p-2 rounded focus:outline-indigo-500"
//             onChange={(e) => setEmail(e.target.value)} 
//           />
//           <input 
//             type="password" placeholder="Password" required
//             className="border p-2 rounded focus:outline-indigo-500"
//             onChange={(e) => setPassword(e.target.value)} 
//           />
//           <button type="submit" className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 font-bold">
//             Create Account
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center">
//           Pehle se account hai? <Link href="/login" className="text-indigo-600 underline">Login karein</Link>
//         </p>
//       </div>
//     </div>
//   );
// }