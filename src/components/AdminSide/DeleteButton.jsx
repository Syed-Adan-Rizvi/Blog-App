// src/components/DeleteButton.jsx
"use client"; // Yeh likhna lazmi hai onClick ke liye!
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    // User se confirm karna taake ghalti se delete na ho jaye
    const isConfirmed = confirm("⚠️ Kya aap waqai is blog ko delete karna chahte hain?");
    if (!isConfirmed) return;

    setLoading(true);
    try {
      // Hamari us nayi API par 'DELETE' request bhejna
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("🗑️ Blog successfully delete ho gaya!");
        // 🌟 JADOO: Page ko refresh kiye bina naya data load karwao
        router.refresh(); 
      } else {
        alert("❌ Delete karne mein masla aaya!");
      }
    } catch (error) {
      alert("❌ Server se connection toot gaya.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="disabled:opacity-50" title="Delete Blog">
      {loading ? "..." : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      )}
    </button>
  );
}