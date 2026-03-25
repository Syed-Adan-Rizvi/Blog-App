// src/components/AdminSidebar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname(); // 🌟 Current URL pakarne wala tool

  // Navigation Links ki list
  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path> },
    // { name: "All Blogs", path: "/admin/blogs", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> },
    { name: "Add Blog", path: "/admin/create", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path> },
    { name: "Home Page", path: "/", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"></path> },

  ];

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex-col justify-between hidden md:flex sticky top-0 h-screen">
      <div>
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#a855f7]">
            Luminous
          </Link>
        </div>
        
        <nav className="flex flex-col gap-2 px-4 mt-8">
          {navLinks.map((link) => {
            // 🌟 LOGIC: Check karo kya current URL is link se match karta hai?
            const isActive = pathname === link.path || (link.path === '/admin' && pathname === '/admin');

            return (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive 
                    ? "text-white bg-white/5 border-l-2 border-[#a855f7]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <svg className={`w-5 h-5 ${isActive ? "text-[#a855f7]" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {link.icon}
                </svg>
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-10 h-10 rounded bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7] font-bold">
             A
           </div>
           <div>
             <p className="text-sm font-bold text-white">Editor Portal</p>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Premium Curator</p>
           </div>
        </div>
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0..."></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Settings
          </button>
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7..."></path></svg>
            Logout
          </Link>
        </div>
      </div>
    </aside>
  );
}