// src/components/PremiumBlogList.jsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function PremiumBlogList({ initialBlogs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState("RECENT"); // "RECENT" ya "POPULAR"

  // 1. Search Logic
  let processedBlogs = initialBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Filter Logic (Recent vs Popular)
  if (activeFilter === "RECENT") {
    // Database se already recent aa raha hai, lakin double check ke liye:
    processedBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (activeFilter === "POPULAR") {
    // Dummy Logic: Abhi hamare paas 'views' nahi hain, toh hum alphabetically ya title length se sort kar dete hain just for UI feel.
    // Jab aap views add karenge tab `b.views - a.views` kar dijiyega.
    processedBlogs.sort((a, b) => b.title.length - a.title.length); 
  }

  // 3. Pagination (Load More) Logic
  const displayedBlogs = processedBlogs.slice(0, visibleCount);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-[#a855f7] selection:text-white pb-20">
      
      {/* 🌟 HERO SECTION (Explore Blogs) WITH CIRCULAR GLOW */}
      <div className="relative pt-32 pb-20 px-4 flex flex-col items-center text-center overflow-hidden">
        
        {/* 🔮 THE MAGIC: Background Circular Glowing Gradients */}
        {/* Main Center Purple Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#a855f7] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
        {/* Top Left Blueish Glow for extra depth */}
        <div className="absolute top-0 left-1/3 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-600 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

        {/* Hero Content (z-10 lazmi hai taaki text glow ke upar rahay) */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <p className="text-gray-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">
            The Digital Curator
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-10 tracking-tight">
            Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]">Blogs</span>
          </h1>

          {/* Premium Search Bar */}
          <div className="w-full max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search curated stories, authors, or topics..."
              className="w-full bg-[#1a1a1a]/80 backdrop-blur-md text-white pl-14 pr-32 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all placeholder-gray-500 text-lg shadow-2xl"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(6);
              }}
            />
            <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-white font-semibold px-8 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
        
        {/* Header & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-end border-b border-white/10 pb-6 mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Latest Publications</h2>
          
          <div className="flex gap-6 mt-4 sm:mt-0 text-sm font-semibold tracking-wider">
            <button 
              onClick={() => setActiveFilter("RECENT")}
              className={`transition-colors ${activeFilter === "RECENT" ? "text-[#a855f7]" : "text-gray-500 hover:text-white"}`}
            >
              RECENT
            </button>
            <button 
              onClick={() => setActiveFilter("POPULAR")}
              className={`transition-colors ${activeFilter === "POPULAR" ? "text-[#a855f7]" : "text-gray-500 hover:text-white"}`}
            >
              POPULAR
            </button>
          </div>
        </div>

        {/* 🌟 BLOGS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500">
              No stories found matching your criteria.
            </div>
          ) : (
            displayedBlogs.map((blog) => {
              const plainText = blog.content.replace(/<[^>]+>/g, "");
              
              // UI Avatars se author ki profile pic banana
              const authorName = blog.author?.name || "Unknown";
              const avatarUrl = `https://ui-avatars.com/api/?name=${authorName.replace(" ", "+")}&background=random&color=fff`;

              return (
                <Link href={`/singleBlog/${blog._id.toString()}`} key={blog._id.toString()} className="group flex flex-col bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
                  
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>

                  {/* Content Box */}
                  <div className="p-6 flex flex-col flex-grow">
                    
                    {/* Tags (Abhi static 'EDITORIAL' lagaya hai premium feel ke liye) */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Editorial
                      </span>
                      <span className="text-gray-500 text-xs font-medium">5 min read</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-[#a855f7] transition-colors">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                      {plainText}
                    </p>

                    {/* Author & Date Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-3">
                        <img src={avatarUrl} alt={authorName} className="w-8 h-8 rounded-full border border-white/20" />
                        <span className="text-sm font-medium text-gray-300">{authorName}</span>
                      </div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>

                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* 🌟 LOAD MORE BUTTON (Premium UI) */}
        {visibleCount < processedBlogs.length && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-[#222] hover:bg-[#333] text-white text-sm font-semibold tracking-wider px-10 py-4 rounded-lg transition-colors border border-white/5"
            >
              View All Stories
            </button>
          </div>
        )}

      </div>
    </div>
  );
}