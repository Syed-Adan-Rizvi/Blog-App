// src/components/PremiumEditForm.jsx
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; 

// Editor ko Server Side Rendering se rokna
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function PremiumEditForm({ blog }) {
  // 🌟 Shuru mein hi State ke andar purana data daal diya
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [image, setImage] = useState(null); // Nayi image khali hai shuru mein
  const [imagePreview, setImagePreview] = useState(blog.imageUrl); // Purani image ka preview
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef(null);
  const router = useRouter();

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

  // const handleImageChange = (e) => {
  //   const file = e.target.files;
  //   if (file) {
  //     setImage(file);
  //     setImagePreview(URL.createObjectURL(file)); // Nayi image ka preview dikhao
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    
    // Agar admin ne nayi image select ki hai, tabhi form mein bhejo
    if (image) {
      formData.append("image", image);
    }

    try {
      // 🌟 Hamari pehle bani hui PUT API ko call karna
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        alert("❌ Update karne mein masla aaya!");
      }
    } catch (error) {
      alert("❌ Server connection toot gaya.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 lg:p-12 max-w-5xl mx-auto">
      
      {/* 🌟 TOP ACTION BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 pb-6 border-b border-white/5 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Edit Post</h1>
          <span className="text-gray-600">|</span>
          <span className="text-sm font-medium text-[#a855f7]">Updating Mode</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => router.push("/admin")}
            className="text-sm font-bold text-gray-400 hover:text-white transition-colors px-4 py-2"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-white text-sm font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Story"}
          </button>
        </div>
      </div>

      {/* 🌟 COVER IMAGE UPLOADER (With Purana Preview) */}
      <div 
        onClick={() => fileInputRef.current.click()}
        className="w-full h-[300px] md:h-[400px] rounded-2xl border-2 border-dashed border-white/10 bg-[#111] hover:bg-[#151515] transition-colors flex flex-col items-center justify-center cursor-pointer mb-12 relative overflow-hidden group"
      >
        {/* Yahan hamesha imagePreview nazar aayega (Ya purani, ya nayi) */}
        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 backdrop-blur-md p-4 rounded-full mb-3 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </div>
            <p className="font-bold text-white shadow-black drop-shadow-lg text-lg">Change Cover Image</p>
        </div>

        <input 
          type="file" accept="image/*" 
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden" 
        />
      </div>

      {/* 🌟 CONTENT AREA */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Title Input */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#a855f7] uppercase mb-4">Post Title</p>
          <input 
            type="text" required
            placeholder="Enter a headline that breathes..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-4xl md:text-6xl font-extrabold text-white placeholder-gray-700 outline-none border-none focus:ring-0 p-0"
          />
        </div>

        {/* 🌟 DARK MODE REACT QUILL */}
        <div className="mt-12 [&_.ql-toolbar]:bg-[#111] [&_.ql-toolbar]:border-none [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-white/5 [&_.ql-container]:border-none [&_.ql-container]:bg-transparent [&_.ql-editor]:text-xl [&_.ql-editor]:text-gray-300 [&_.ql-editor]:min-h-[400px] [&_.ql-editor]:p-4 [&_.ql-editor::before]:!text-gray-700 [&_.ql-editor::before]:!font-medium [&_.ql-stroke]:stroke-gray-400 hover:[&_.ql-stroke]:stroke-white [&_.ql-fill]:fill-gray-400 hover:[&_.ql-fill]:fill-white">
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