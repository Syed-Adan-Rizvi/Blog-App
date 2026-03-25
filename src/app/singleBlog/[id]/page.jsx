// src/app/blog/[id]/page.jsx
export const dynamic = "force-dynamic"; // 🌟 THE CACHE BUSTER MAGIC
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import Link from "next/link";
import { notFound } from "next/navigation";
import "react-quill-new/dist/quill.snow.css"; 

export default async function SingleBlogPage({ params }) {
  const { id } = await params;
  await connectDB();

  // 1. Current Blog Fetch karna
  const blog = await Blog.findById(id).populate("author", "name").lean();
  if (!blog) notFound();

  // 2. "Keep Reading" ke liye database se 2 aur recent blogs nikalna (jo current na hon)
  const moreBlogs = await Blog.find({ _id: { $ne: id } })
    .sort({ createdAt: -1 })
    .limit(2)
    .lean();

  // 3. Smart Read Time Calculator (Assuming 200 words per minute)
  const wordCount = blog.content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200) || 1;

  // Dynamic Author Data
  const authorName = blog.author?.name || "Unknown";
  const avatarUrl = `https://ui-avatars.com/api/?name=${authorName.replace(" ", "+")}&background=random&color=fff`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a855f7] selection:text-white pb-20 font-sans">
      
      {/* 🌟 PREMIUM NAVBAR */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#a855f7]">
          Luminous
        </Link>
        {/* <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
          <Link href="/" className="text-white border-b-2 border-[#a855f7] pb-1">Explore</Link>
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">About</Link>
        </div> */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="bg-[#e9d5ff] hover:bg-white text-black text-sm font-bold px-6 py-2 rounded-md transition-colors">
            Login
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* 🌟 1. BACK TO BLOG & TAGS */}
        <Link href="/" className="inline-flex items-center text-xs font-bold tracking-widest text-gray-400 hover:text-white mb-10 uppercase transition-colors">
          <span className="mr-2 text-lg leading-none">&larr;</span> Back to Blog
        </Link>

        {/* 🌟 2. HEADER AREA */}
        <header className="mb-10">
          <span className="inline-block bg-[#1a1a1a] border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-6">
            Digital Curations
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white">
            {blog.title}
          </h1>

          {/* Author Meta Row (Avatar, Name, Date, Read Time & Icons) */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 gap-4">
            <div className="flex items-center gap-4">
              <img src={avatarUrl} alt={authorName} className="w-12 h-12 rounded-full border border-white/10" />
              <div>
                <p className="text-white font-semibold text-sm">{authorName}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} 
                  <span className="mx-2">•</span> {readTime} min read
                </p>
              </div>
            </div>
            
            {/* Share & Bookmark Placeholder Icons */}
            <div className="flex items-center gap-4 text-gray-400">
              <button className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
              </button>
              <button className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              </button>
            </div>
          </div>
        </header>

        {/* 🌟 3. MAIN COVER IMAGE */}
        <div className="w-full h-[350px] md:h-[500px] rounded-lg overflow-hidden mb-16 relative bg-[#111]">
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* 🌟 4. CONTENT AREA (Typography fixes for Medium-style reading) */}
        <div className="max-w-3xl mx-auto ql-snow">
          <div 
            className="ql-editor !p-0 !text-gray-300 !text-lg md:!text-[20px] !leading-[1.8] !font-light
            [&>h1]:!text-white [&>h1]:!font-bold [&>h1]:!text-3xl md:[&>h1]:!text-4xl [&>h1]:!mb-6 [&>h1]:!mt-12
            [&>h2]:!text-white [&>h2]:!font-bold [&>h2]:!text-2xl md:[&>h2]:!text-3xl [&>h2]:!mb-6 [&>h2]:!mt-12
            [&>h3]:!text-white [&>h3]:!font-bold [&>h3]:!text-xl md:[&>h3]:!text-2xl [&>h3]:!mb-4
            [&>p]:!mb-8
            [&>blockquote]:!border-l-2 [&>blockquote]:!border-gray-500 [&>blockquote]:!pl-6 [&>blockquote]:!py-2 [&>blockquote]:!my-10 [&>blockquote]:!bg-white/[0.02] [&>blockquote]:!text-gray-400 [&>blockquote]:!font-medium [&>blockquote]:!italic [&>blockquote]:!rounded-r-lg
            [&>strong]:!text-white
            [&>a]:!text-[#a855f7] hover:[&>a]:!underline" 
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>

          {/* 🌟 5. INTERACTION FOOTER (Likes, Comments, Follow) */}
          <div className="flex flex-wrap items-center justify-between border-t border-b border-white/10 py-6 mt-16 mb-20 gap-4">
            <div className="flex items-center gap-6 text-gray-400 text-sm font-medium">
              <button className="flex items-center gap-2 hover:text-white transition-colors">
                <span>❤️</span> 2.4k
              </button>
              <button className="flex items-center gap-2 hover:text-white transition-colors">
                <span>💬</span> 128
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="border border-white/20 hover:border-white text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                Follow {authorName.split(" ")}
              </button>
              <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
                •••
              </button>
            </div>
          </div>
        </div>

        {/* 🌟 6. KEEP READING SECTION */}
        {moreBlogs.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/10">
            <div className="flex items-center gap-4 mb-10">
             
              <h3 className="text-xl font-bold text-white tracking-wide">Keep Reading</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {moreBlogs.map(mb => (
                <Link href={`/singleBlog/${mb._id.toString()}`} key={mb._id.toString()} className="group cursor-pointer ">
                  
                    <div className="w-full h-48 rounded-lg overflow-hidden mb-4 border border-white/5 bg-[#111]">
                    <img src={mb.imageUrl} alt={mb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Editorial</p>
                  <h4 className="text-lg font-bold text-white group-hover:text-[#a855f7] transition-colors line-clamp-2">
                    {mb.title}
                  </h4>
                  
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
        {/* 🌟 PREMIUM FOOTER */}
              <footer className="border-t border-white/10 bg-[#0a0a0a] py-6 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h1 className="text-lg font-bold text-white mb-2">Luminous <span className="text-[#a855f7]">Editor</span></h1>
                    <p className="text-xs text-gray-500 font-medium tracking-wider">
                      © 2026 LUMINOUS EDITOR. DESIGNED FOR DIGITAL CURATORS.
                    </p>
                  </div>
                  <div className="flex gap-8 text-xs font-semibold tracking-wider text-gray-400">
                    <Link href="/" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
                    <Link href="/" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
                    <Link href="/" className="hover:text-white transition-colors">CONTACT</Link>
                  </div>
                </div>
              </footer>
    </div>
  );
}




























// // src/app/blog/[id]/page.jsx
// import { connectDB } from "@/lib/db";
// import { Blog } from "@/models/Blog";
// import { User } from "@/models/User";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import "react-quill-new/dist/quill.snow.css";

// // 🌟 THE MAGIC: Next.js URL se automatically 'id' nikal kar is function ko de deta hai
// export default async function SingleBlogPage({ params }) {
//   // Next.js 16 (jo aap use kar rahe hain) mein params ko 'await' karna zaroori hota hai
//   const { id } = await params;

//   await connectDB();

//   // 🔍 Database se sirf wo ek blog dhoondo jiski ID URL wali ID se match karti ho
//   const blog = await Blog.findById(id).populate("author", "name").lean();

//   // Agar koi ghalat ID likh de aur blog na mile, toh usko 404 Not Found page par bhej do
//   if (!blog) {
//     notFound();
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
      
//       {/* Navbar */}
//       <nav className="bg-white shadow-sm p-4 px-8 flex justify-between items-center">
//         <Link href="/" className="text-2xl font-extrabold text-indigo-600">MyBlog.</Link>
//         <Link href="/login" className="text-gray-600 font-semibold hover:text-indigo-600">
//           Admin Login
//         </Link>
//       </nav>

//       {/* Main Blog Content Area */}
//       <main className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden">
        
//         {/* Cover Image (Bari karke dikhana) */}
//         <img 
//           src={blog.imageUrl} 
//           alt={blog.title} 
//           className="w-full h-[400px] object-cover" 
//         />

//         <div className="p-10">
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blog.title}</h1>
          
//           <div className="flex items-center text-gray-500 mb-8 pb-8 border-b">
//             <span className="font-semibold text-indigo-600 mr-4">✍️ By {blog.author?.name || "Unknown"}</span>
//             <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
//           </div>

//           {/* 🚨 IMPORTANT: 'whitespace-pre-wrap' lagana lazmi hai taaki aapne form mein jo 'Enter' (line breaks) dabaye thay, wo theek se nazar aayein! */}
//           {/* <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
//             {blog.content}
//           </div> */}
//           {/* 🌟 NAYA CODE: HTML tags ko asli design mein badalna */}
//           {/* <div 
//             className="text-gray-700 text-lg leading-relaxed prose whitespace-pre-wrap max-w-none " 
//             dangerouslySetInnerHTML={{ __html: blog.content }}
//           ></div> */}
//           {/* 🌟 THE FIX 2: ql-snow aur ql-editor classes ka Jadoo */}
//           <div className="ql-snow mt-8">
//             <div 
//               className="ql-editor text-gray-700 text-lg leading-relaxed p-0" 
//               dangerouslySetInnerHTML={{ __html: blog.content }}
//             ></div>
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }