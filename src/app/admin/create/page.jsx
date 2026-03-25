// src/app/admin/create/page.jsx
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; 

// Quill Editor without SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 🌟 Image dikhane ke liye
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Image Preview Logic
  const handleImageChange = (e) => {
    // 🌟 THE FIX: Safe tareeqe se file ko pakarna
    const file = e.target.files?.[0];

    // Agar file nahi mili (maslan user ne cancel daba diya), toh chup chaap yahin ruk jao
    if (!file) {
      return; 
    }

    // Agar asli tasveer mil gayi hai, toh preview banao
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Bhai, Cover Image lazmi hai!");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        alert("❌ Error aagaya!");
      }
    } catch (error) {
      alert("❌ Server Connection Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 lg:p-12 max-w-5xl mx-auto">
      
      {/* 🌟 TOP ACTION BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 pb-6 border-b border-white/5 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">New Post</h1>
          <span className="text-gray-600">|</span>
          <span className="text-sm font-medium text-gray-400">Drafting Mode</span>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="text-sm font-bold text-gray-400 hover:text-white transition-colors px-4 py-2">
            Save Draft
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-white text-sm font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Story"}
          </button>
        </div>
      </div>

      {/* 🌟 COVER IMAGE UPLOADER */}
      <div 
        onClick={() => fileInputRef.current.click()}
        className="w-full h-[300px] md:h-[400px] rounded-2xl border-2 border-dashed border-white/10 bg-[#111] hover:bg-[#151515] transition-colors flex flex-col items-center justify-center cursor-pointer mb-12 relative overflow-hidden group"
      >
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-3 text-white">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
               </div>
               <p className="font-bold text-white shadow-black drop-shadow-lg">Change Image</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white/5 p-4 rounded-full mb-4 text-[#a855f7]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            </div>
            <p className="font-bold text-lg text-white mb-2">Upload Hero Image</p>
            <p className="text-gray-500 text-sm">Recommended size: 1920×800px (Max 5MB)</p>
          </>
        )}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden" 
        />
      </div>

      {/* 🌟 CONTENT AREA */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Title Input (Borderless, Huge) */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Post Title</p>
          <input 
            type="text" 
            required
            placeholder="Enter a headline that breathes..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-4xl md:text-6xl font-extrabold text-white placeholder-gray-700 outline-none border-none focus:ring-0 p-0"
          />
        </div>

        {/* 🌟 DARK MODE REACT QUILL */}
        {/* Tailwind Arbitrary Variants se Quill ki CSS ko hack kiya hai */}
        <div className="mt-12 [&_.ql-toolbar]:bg-[#111] [&_.ql-toolbar]:border-none [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-white/5 [&_.ql-container]:border-none [&_.ql-container]:bg-transparent [&_.ql-editor]:text-xl [&_.ql-editor]:text-gray-300 [&_.ql-editor]:min-h-[400px] [&_.ql-editor]:p-4 [&_.ql-editor::before]:!text-gray-700 [&_.ql-editor::before]:!font-medium [&_.ql-stroke]:stroke-gray-400 hover:[&_.ql-stroke]:stroke-white [&_.ql-fill]:fill-gray-400 hover:[&_.ql-fill]:fill-white ">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            placeholder="Start your narrative here..."
          />
        </div>

      </div>
    </form>
  );
}































// // src/app/admin/create/page.jsx
// "use client";
// import dynamic from "next/dynamic";
// import "react-quill-new/dist/quill.snow.css"; // Editor ka khoobsurat design (CSS)

// // 🌟 THE MAGIC: Editor ko server par load hone se rokna
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { compareSync } from "bcryptjs";

// export default function CreateBlog() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null); // File ke liye state
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
  
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     // Choti si checking: Image lazmi honi chahiye
//     if (!image) {
//       setMessage("❌ Please ek cover image select karein!");
//       setLoading(false);
//       return;
//     }
//         console.log("image", image[0]);
//     // 📦 THE MAGIC: JSON ki jagah 'FormData' ka use
//     // Kyunki JSON mein files nahi ja saktin, hum ek virtual box (FormData) banate hain
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     formData.append("image", image[0]);

//     try {
//       // Apni secure API ko hit karna
//       const res = await fetch("/api/blogs", {
//         method: "POST",
//         body: formData, // Yahan headers mein 'Content-Type': 'application/json' NAHI likhna!
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("🎉 Balle Balle! Blog successfully publish ho gaya!");
//         // 2 second baad wapas dashboard bhej do
//         setTimeout(() => {
//           router.push("/admin");
//         }, 2000);
//       } else {
//         setMessage("❌ Error: " + data.error);
//       }
//     } catch (error) {
//       setMessage("❌ Server se connection toot gaya.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">📝 Create New Blog</h1>
//           <Link href="/admin" className="text-indigo-600 hover:underline font-medium">
//             &larr; Back to Dashboard
//           </Link>
//         </div>

//         {/* Message Alert */}
//         {message && (
//           <div className={`p-4 mb-6 rounded font-bold ${message.includes("🎉") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
          
//           {/* Title Input */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title</label>
//             <input 
//               type="text" required
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//               placeholder="E.g. Next.js 14 kyu best hai?"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           {/* Content Input */}
//           {/* 🌟 NAYA JADOO WALA EDITOR */}
//             <div className="bg-white rounded-lg overflow-hidden">
//               <ReactQuill 
//                 theme="snow" 
//                 value={content} 
//                 onChange={setContent} 
//                 className="h-64 mb-12" // mb-12 isliye taaki editor ke neechay thodi jagah bache
//               />
//             </div>

//           {/* Image Input */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image (Cloudinary)</label>
//                   <input 
//                         type="file"  
//                         className="w-full border border-gray-300 p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        
//                         // 🚨 DHYAN SE DEKHEIN: files ke aage lazmi lagana hai!
//                         onChange={(e) => setImage(e.target.files)} 
//                         />
//           </div>
//           {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, ab quisquam reprehenderit beatae eum, perferendis dolorum harum doloremque minus nisi rem temporibus. Quam ipsam vero et suscipit exercitationem quas voluptate.</p> */}

//           {/* Submit Button */}
//           <button 
//             type="submit" disabled={loading}
//             className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all ${
//               loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {loading ? "🚀 Publishing to Cloudinary..." : "Publish Blog"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }