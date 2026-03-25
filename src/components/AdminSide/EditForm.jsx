// src/components/EditForm.jsx
"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Editor ka khoobsurat design (CSS)

// 🌟 THE MAGIC: Editor ko server par load hone se rokna
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ blog }) {
  // 🌟 JADOO: State mein pehle se hi 'blog' ka purana data daal diya!
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [image, setImage] = useState(null); // Nayi image khali hai shuru mein
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    
    // Agar admin ne nayi image select ki hai, tabhi usko form mein dalo
    if (image) {
      formData.append("image", image[0]);
    }

    try {
      // 🌟 PUT Request hamari nayi API par
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Balle Balle! Blog successfully update ho gaya!");
        router.refresh(); // Data refresh karo
        setTimeout(() => {
          router.push("/admin"); // Wapas dashboard bhejo
        }, 2000);
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (error) {
      setMessage("❌ Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded font-bold ${message.includes("🎉") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      {/* Title Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title</label>
        <input 
          type="text" required
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Content Input */}
      {/* <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Content</label>
        <textarea 
          required rows="8"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div> */}
      {/* 🌟 NAYA JADOO WALA EDITOR */}
            <div className="bg-white rounded-lg overflow-hidden">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                className="h-64 mb-12" // mb-12 isliye taaki editor ke neechay thodi jagah bache
              />
            </div>

      {/* Image Input (With Preview) */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
        
        {/* Purani Image ka Preview */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Current Image:</p>
          <img src={blog.imageUrl} alt="Current" className="h-24 object-cover rounded shadow-sm" />
        </div>

        <p className="text-xs text-indigo-600 mb-2 font-semibold">
          * Agar tasveer change nahi karni, toh isko khali chhor dein.
        </p>
        <input 
          type="file" accept="image/*" 
          className="w-full text-sm"
          onChange={(e) => setImage(e.target.files)}
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
      >
        {loading ? "🔄 Updating..." : "Update Blog"}
      </button>
    </form>
  );
}