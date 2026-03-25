// src/app/admin/page.jsx
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteButton from "@/components//AdminSide/DeleteButton";

export default async function AdminDashboard({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // 🌟 PAGINATION LOGIC
  const params = await searchParams; // Next.js 16 requires await for searchParams
  const page = parseInt(params.page) || 1;
  const limit = 4; // Ek page par 4 blogs dikhayenge (design ke mutabiq)
  const skip = (page - 1) * limit;

  await connectDB();
  
  // Total posts calculate karna
  const totalPosts = await Blog.countDocuments({ author: session.user.id });
  const totalPages = Math.ceil(totalPosts / limit);

  // Sirf us page ka data mangwana
  const blogs = await Blog.find({ author: session.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return (
    <div className="p-8 lg:p-12">
      
      {/* 🌟 TOP HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/5 pb-6 gap-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">All Blogs</h1>
          <span className="bg-white/5 border border-white/10 text-gray-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {totalPosts} Posts
          </span>
        </div>
        
        <div className="flex items-center gap-6 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <svg className="w-4 h-4 absolute left-3 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="Search curated content..." className="w-full bg-[#1a1a1a] text-white pl-10 pr-4 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-[#a855f7]/50 text-sm" />
          </div>
          
          {/* Admin Profile */}
          <div className="hidden md:flex items-center gap-3 border-l border-white/10 pl-6">
            <div className="text-right">
              <p className="text-sm font-bold text-white">{session.user.name}</p>
              <p className="text-[10px] text-[#a855f7] font-bold uppercase tracking-widest">Premium Curator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#a855f7] to-blue-500 p-[2px]">
              <div className="w-full h-full bg-[#1a1a1a] rounded-full flex items-center justify-center text-xs font-bold">
                {session.user.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 HEADER TEXT */}
      <div className="mb-10">
        <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">Content Repository</p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Manage your editorial <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]">masterpieces.</span>
        </h2>
      </div>

      {/* 🌟 PREMIUM DATA TABLE */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.02]">
              <tr>
                <th className="px-6 py-5 font-bold">Blog Title</th>
                <th className="px-6 py-5 font-bold">Author</th>
                <th className="px-6 py-5 font-bold">Date Published</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogs.map((blog) => (
                <tr key={blog._id.toString()} className="hover:bg-white/[0.02] transition-colors group">
                  
                  <td className="px-6 py-5 flex items-center gap-4">
                    <div className="w-16 h-12 rounded bg-[#1a1a1a] overflow-hidden border border-white/5 flex-shrink-0">
                      <img src={blog.imageUrl} alt="thumb" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-base mb-1 line-clamp-1 group-hover:text-[#a855f7] transition-colors">{blog.title}</p>
                      <p className="text-xs text-gray-500">Technology • 5 min read</p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-400">
                    {session.user.name}
                  </td>

                  <td className="px-6 py-5 text-gray-400 whitespace-nowrap">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>

                  <td className="px-6 py-5">
                    <span className="bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
                      Published
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {/* Edit Icon Button */}
                      <Link href={`/admin/edit/${blog._id.toString()}`} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </Link>
                      {/* Delete Component Icon (Make sure to pass icon prop if your component supports it, otherwise it renders text) */}
                      <div className="text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded cursor-pointer">
                         <DeleteButton id={blog._id.toString()} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🌟 PAGE-WISE PAGINATION (Footer of Table) */}
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
          <div>
            Showing {skip + 1} to {Math.min(skip + limit, totalPosts)} of {totalPosts} blog posts
          </div>
          
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            {page > 1 ? (
              <Link href={`/admin?page=${page - 1}`} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors">
                &lt;
              </Link>
            ) : (
              <span className="w-8 h-8 flex items-center justify-center opacity-50 cursor-not-allowed">&lt;</span>
            )}

            {/* Page Numbers (Simplified for now) */}
            <div className="flex items-center gap-1">
              <span className="w-8 h-8 flex items-center justify-center rounded bg-[#a855f7] text-white font-bold">
                {page}
              </span>
              {page < totalPages && (
                <Link href={`/admin?page=${page + 1}`} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors">
                  {page + 1}
                </Link>
              )}
            </div>

            {/* Next Button */}
            {page < totalPages ? (
              <Link href={`/admin?page=${page + 1}`} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors">
                &gt;
              </Link>
            ) : (
              <span className="w-8 h-8 flex items-center justify-center opacity-50 cursor-not-allowed">&gt;</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}



























// // src/app/admin/page.jsx
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
// import LogoutButton from "@/components/AdminSide/LogoutButton";
// import DeleteButton from "@/components/AdminSide/DeleteButton";
// import Link from "next/link";
// import { connectDB } from "@/lib/db"; // Database connection mangwaya
// import { Blog } from "@/models/Blog"; // Blog ka model mangwaya

// export default async function AdminDashboard() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/login");
//   }

//   // 🌟 THE MAGIC: Database connect kiya aur is Admin ke saare blogs nikal liye
//   await connectDB();
  
//   // .lean() isliye lagate hain taaki MongoDB ka complex object plain JavaScript object ban jaye
//   // .sort({ createdAt: -1 }) naye blogs ko sab se upar dikhayega
//   const blogs = await Blog.find({ author: session.user.id }).sort({ createdAt: -1 }).lean();

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
      
//       {/* Sidebar */}
//       <aside className="w-64 bg-indigo-800 text-white p-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold mb-8">My Blog CMS</h2>
//           <ul className="space-y-4">
//             <li className="font-semibold text-indigo-200">📊 Dashboard</li>
//             <li className="font-semibold hover:text-indigo-200">
//               <Link href="/admin/create">📝 Create Blog</Link>
//             </li>
//             <li><Link href="/" className="font-semibold hover:text-indigo-200">📑 Go HOME</Link></li>
            
//           </ul>
//         </div>
        
//         <div className="border-t border-indigo-600 pt-4">
//           <p className="text-sm text-indigo-300">Logged in as:</p>
//           <p className="font-bold truncate">{session?.user?.name}</p>
//           <p className="text-xs text-indigo-300 mb-4 truncate">{session?.user?.email}</p>
//           <LogoutButton />
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 p-10">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-extrabold text-gray-800">
//             Welcome, {session?.user?.name}! 👋
//           </h1>
//           <Link href="/admin/create" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
//             + Write New Blog
//           </Link>
//         </div>
        
//         {/* Stats Cards */}
//         <div className="grid grid-cols-3 gap-6 mb-10">
//           <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
//             <h3 className="text-gray-500 text-sm font-semibold">My Total Blogs</h3>
//             <p className="text-3xl font-bold text-gray-800">{blogs.length}</p>
//           </div>
//         </div>

//         {/* 📝 Blogs Table */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-50 text-gray-600 border-b">
//                 <th className="p-4 font-semibold">Image</th>
//                 <th className="p-4 font-semibold">Title</th>
//                 <th className="p-4 font-semibold">Date</th>
//                 <th className="p-4 font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {blogs.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="p-6 text-center text-gray-500">
//                     Abhi tak koi blog nahi likha. Naya blog banayein!
//                   </td>
//                 </tr>
//               ) : (
//                 blogs.map((blog) => (
//                   <tr key={blog._id.toString()} className="border-b hover:bg-gray-50">
//                     <td className="p-4">
//                       {/* Cloudinary ki image yahan show hogi */}
//                       <img src={blog.imageUrl} alt={blog.title} className="w-16 h-16 object-cover rounded-md" />
//                     </td>
//                     <td className="p-4 font-medium text-gray-800">{blog.title}</td>
//                     <td className="p-4 text-sm text-gray-500">
//                       {new Date(blog.createdAt).toLocaleDateString()}
//                     </td>
//                     {/* <td className="p-4">
//                       <DeleteButton id={blog._id.toString()} />
//                     </td> */}
//                     <td className="p-4 flex gap-4">
//                       <Link href={`/admin/edit/${blog._id.toString()}`} className="text-blue-500 hover:text-blue-700 font-semibold">
//                         Edit
//                       </Link>
//                       <DeleteButton id={blog._id.toString()} />
//                   </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//       </main>
//     </div>
//   );
// }