// src/app/admin/edit/[id]/page.jsx
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, notFound } from "next/navigation";
import PremiumEditForm from "@/components/AdminSide/PremiumEditForm";

export default async function EditBlogPage({ params }) {
  // 1. Guard Check
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params; // Next.js 16 rule: await params

  // 2. Database se Data mangwao
  await connectDB();
  const blog = await Blog.findById(id).lean();

  if (!blog) notFound();

  // 3. Security: Check if admin owns this blog
  if (blog.author.toString() !== session.user.id) {
    return (
      <div className="p-12 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied!</h1>
        <p className="text-gray-400">Aap kisi aur ka blog edit nahi kar sakte.</p>
      </div>
    );
  }

  // Mongoose ID fix
  const serializedBlog = {
    ...blog,
    _id: blog._id.toString(),
    author: blog.author.toString(),
  };

  return (
    // Yahan Navbar/Sidebar lagane ki zaroorat nahi, layout.jsx khud laga dega!
    <div>
      <PremiumEditForm blog={serializedBlog} />
    </div>
  );
}



























// // src/app/admin/edit/[id]/page.jsx
// import { connectDB } from "@/lib/db";
// import { Blog } from "@/models/Blog";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { redirect, notFound } from "next/navigation";
// import Link from "next/link";
// import EditForm from "@/components/AdminSide/EditForm"; // Hamara banaya hua form

// export default async function EditBlogPage({ params }) {
//   // 1. Guard
//   const session = await getServerSession(authOptions);
//   if (!session) redirect("/login");

//   const { id } = await params;

//   // 2. Database se Data mangwao
//   await connectDB();
//   const blog = await Blog.findById(id).lean();

//   if (!blog) notFound();

//   // 3. Security Check: Kya yeh blog isi admin ka hai?
//   if (blog.author.toString() !== session.user.id) {
//     return <div className="p-10 text-red-500 text-2xl font-bold">Aap is blog ko edit nahi kar sakte!</div>;
//   }

//   // Mongoose ki ID ko string banana zaroori hai Client Component ko pass karne se pehle
//   const serializedBlog = {
//     ...blog,
//     _id: blog._id.toString(),
//     author: blog.author.toString(),
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">✏️ Edit Blog</h1>
//           <Link href="/admin" className="text-indigo-600 hover:underline font-medium">
//             &larr; Back to Dashboard
//           </Link>
//         </div>

//         {/* 🌟 FORM KO DATA DE DIYA */}
//         <EditForm blog={serializedBlog} />

//       </div>
//     </div>
//   );
// }