// src/components/BlogList.jsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function BlogList({ initialBlogs }) {
  const [searchTerm, setSearchTerm] = useState("");
  // 🌟 JADOO 1: Shuru mein sirf 6 blogs dikhane hain
  const [visibleCount, setVisibleCount] = useState(6); 

  // Live Filtering Logic (Search)
  const filteredBlogs = initialBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🌟 JADOO 2: Filter hone ke baad, sirf utne blogs lo jitne 'visibleCount' mein hain
  const displayedBlogs = filteredBlogs.slice(0, visibleCount);

  // Load More Button ka function
  const handleLoadMore = () => {
    // Har click par 6 mazeed blogs add kar do
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div>
      {/* Premium Search Bar UI */}
      <div className="max-w-2xl mx-auto mb-12 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-xl">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Search for articles by title..."
          className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg transition-all"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // Agar koi search kare toh wapas limit 6 kar do taaki results theek nazar aayein
            setVisibleCount(6); 
          }}
        />
        {/* Results Counter */}
        {searchTerm && (
          <p className="text-sm text-gray-500 mt-3 text-center">
            Found {filteredBlogs.length} result(s) for "{searchTerm}"
          </p>
        )}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedBlogs.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-xl">Koi blog nahi mila! 🕵️‍♂️</p>
          </div>
        ) : (
          displayedBlogs.map((blog) => {
            const plainText = blog.content.replace(/<[^>]+>/g, "");

            return (
              <div
                key={blog._id.toString()}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Blog Image */}
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />

                {/* Blog Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed flex-grow">
                    {plainText}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100 mb-6">
                    <span className="font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      By {blog.author?.name || "Unknown"}
                    </span>
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Button ko hamesha bottom par rakhne ke liye auto margin */}
                  <div className="mt-auto">
                    <Link
                      href={`/blog/${blog._id.toString()}`}
                      className="block text-center bg-gray-50 text-indigo-600 font-bold py-3 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                    >
                      Read Article &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 🌟 JADOO 3: The "Load More" Button */}
      {/* Yeh button sirf tab nazar aayega jab mazeed blogs baqi honge */}
      {visibleCount < filteredBlogs.length && (
        <div className="mt-16 text-center">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-300"
          >
            Load More Articles ⬇️
          </button>
        </div>
      )}

    </div>
  );
}