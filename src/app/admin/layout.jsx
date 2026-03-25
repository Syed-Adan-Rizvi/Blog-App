// src/app/admin/layout.jsx
import AdminSidebar from "@/components/AdminSide/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#a855f7] selection:text-white">
      {/* 🌟 Naya Smart Sidebar */}
      <AdminSidebar />

      {/* 🌟 MAIN CONTENT AREA */}
      <main className="flex-1 bg-[#0a0a0a] h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}