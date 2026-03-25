// src/app/page.jsx
export const dynamic = "force-dynamic"; // 🌟 THE CACHE BUSTER MAGIC 
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { User } from "@/models/User";
import Link from "next/link";
import PremiumBlogList from "@/components/userSide/PremiumBlogList"; // Naya Component Import Kiya

export default async function Home() {
  await connectDB();

  // Database se data lana
  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .populate("author", "name")
    .lean();

  const serializedBlogs = blogs.map(blog => ({
    ...blog,
    _id: blog._id.toString(),
    author: blog.author ? { ...blog.author, _id: blog.author._id.toString() } : null
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* 🌟 PREMIUM NAVBAR */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#a855f7]">
          Luminous
        </Link>

        {/* Center Links (Desktop only) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* <Link href="/" className="text-white border-b-2 border-[#a855f7] pb-1">Home</Link> */}
         
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button> */}
          <Link href="/login" className="bg-[#e9d5ff] hover:bg-white text-black text-sm font-bold px-6 py-2 rounded-md transition-colors">
            Login
          </Link>
        </div>
      </nav>

      {/* 🌟 MAIN COMPONENT (Hero + Grid) */}
      <PremiumBlogList initialBlogs={serializedBlogs} />

      {/* 🌟 PREMIUM FOOTER */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Luminous Editor</h3>
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



























// // src/app/page.jsx
// import { connectDB } from "@/lib/db";
// import { Blog } from "@/models/Blog";
// import { User } from "@/models/User";
// import Link from "next/link";
// import BlogList from "@/components/userSide/BlogList"; // 🌟 Hamara naya component mangwaya

// export default async function Home() {
//   await connectDB();

//   // Database se saare blogs laye
//   const blogs = await Blog.find({})
//     .sort({ createdAt: -1 })
//     .populate("author", "name")
//     .lean();

//   // Mongoose IDs ko string mein convert karna zaroori hai Client Component ke liye
//   const serializedBlogs = blogs.map(blog => ({
//     ...blog,
//     _id: blog._id.toString(),
//     author: blog.author ? { ...blog.author, _id: blog.author._id.toString() } : null
//   }));

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
      
//       {/* Navbar */}
//       <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm p-4 px-8 flex justify-between items-center">
//         <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
//           MyBlog.
//         </h1>
//         <Link href="/login" className="text-gray-600 font-bold hover:text-indigo-600 transition-colors">
//           Admin Login
//         </Link>
//       </nav>

//       {/* Premium Hero Section */}
//       <header className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-24 px-4 text-center relative overflow-hidden">
//         {/* Background Decorative Circles */}
//         <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
//         <div className="relative z-10 max-w-3xl mx-auto">
//           <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
//             Discover Tech Insights <br/> & Coding Magic.
//           </h1>
//           <p className="text-xl text-indigo-200 font-light max-w-2xl mx-auto leading-relaxed">
//             Read the latest tutorials, tips, and tricks from our expert developers.
//           </p>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <main className="max-w-7xl mx-auto p-8 py-16 -mt-12 relative z-20">
        
//         {/* 🌟 NAYA COMPONENT: Search Bar aur Grid ab yahan se control hoga */}
//         <BlogList initialBlogs={serializedBlogs} />

//       </main>

//     </div>
//   );
// }































































// // src/app/page.jsx
// import { connectDB } from "@/lib/db";
// import { Blog } from "@/models/Blog";
// import { User } from "@/models/User"; // Isko import karna zaroori hai 'populate' ke liye
// import Link from "next/link";
// import "react-quill-new/dist/quill.snow.css";

// export default async function Home() {
  
//   await connectDB();

//   // 🌟 THE MAGIC: Database se saare blogs mangwana aur Author ka naam sath lona
//   const blogs = await Blog.find({})
//     .sort({ createdAt: -1 })
//     .populate("author", "name") // Yeh database se Author ki id ke badle uska 'name' utha layega
//     .lean();

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* 🌟 Simple Navbar */}
//       <nav className="bg-white shadow-sm p-4 px-8 flex justify-between items-center">
//         <h1 className="text-2xl font-extrabold text-indigo-600">MyBlog.</h1>
//         <Link href="/login" className="text-gray-600 font-semibold hover:text-indigo-600">
//           Admin Login
//         </Link>
//       </nav>

//       {/* 🌟 Hero Section */}
//       <header className="bg-indigo-600 text-white py-20 text-center">
//         <h1 className="text-5xl font-bold mb-4">Welcome to Our Tech Blog</h1>
//         <p className="text-xl text-indigo-200">Latest coding tips, tricks, and tutorials.</p>
//       </header>

//       {/* 🌟 Blogs Grid Section */}
//       <main className="max-w-6xl mx-auto p-8 py-12">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Articles</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
//           {blogs.length === 0 ? (
//             <p className="text-gray-500 text-lg">Abhi tak koi article publish nahi hua.</p>
//           ) : (
//             blogs.map((blog) => {
              
//               // 🌟 THE MAGIC: HTML Tags ko filter karke sirf Plain Text nikalna
//               // Yeh chota sa code saare < > wale tags ko gayab kar dega
//               const plainText = blog.content.replace(/<[^>]+>/g, '');

//               return (
//                 <div key={blog._id.toString()} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  
//                   {/* Blog Image */}
//                   <img 
//                     src={blog.imageUrl} 
//                     alt={blog.title} 
//                     className="w-full h-48 object-cover"
//                   />
                  
//                   {/* Blog Content */}
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
//                       {blog.title}
//                     </h3>
                    
//                     {/* 🌟 THE FIX: Wapas purana line-clamp-3 laga diya aur sirf plainText paas kiya */}
//                     <p className="text-gray-600 mb-4 line-clamp-3">
//                       {plainText}
//                     </p>
                    
//                     {/* Author & Date */}
//                     <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t">
//                       <span className="font-semibold text-indigo-600">
//                         By {blog.author?.name || "Unknown"}
//                       </span>
//                       <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//                     </div>

//                     {/* Read More Button */}
//                     <div className="mt-6">
//                       <Link 
//                         href={`/singleBlog/${blog._id.toString()}`} 
//                         className="block text-center bg-indigo-50 text-indigo-600 font-bold py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
//                       >
//                         Read Full Article &rarr;
//                       </Link>
//                     </div>

//                   </div>
//                 </div>
//               );
//             })
//           )}

//         </div>
//       </main>

//     </div>
//   );
// }