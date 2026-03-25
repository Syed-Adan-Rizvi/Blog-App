// components/LogoutButton.jsx
"use client"; // Kyunki isme onClick event hai
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      // signOut ko bol diya ke logout hone ke baad wapas login page par bhej dena
      onClick={() => signOut({ callbackUrl: "/login" })} 
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Log Out
    </button>
  );
}