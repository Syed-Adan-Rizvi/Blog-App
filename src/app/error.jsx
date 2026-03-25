"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Error({ error, reset }) {
  const router = useRouter();

  // Console mein error print karne ke liye taaki aapko pata chale masla kya tha
  useEffect(() => {
    console.error("Luminous Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-center px-4 relative overflow-hidden">
      
      {/* Background Aurora Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Glassmorphism Error Card */}
      <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl backdrop-blur-md max-w-md w-full shadow-[0_0_30px_rgba(168,85,247,0.15)] relative z-10">
        
        {/* Error Icon */}
        <div className="text-purple-400 mb-6 flex justify-center">
          <svg className="w-20 h-20 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">Connection Lost</h2>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
          It seems we've hit a glitch in the Matrix. Don't worry, you can easily navigate back to safety.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Go Back Button */}
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition-colors duration-200 font-medium w-full sm:w-auto"
          >
            Go Back
          </button>
          
          {/* Go Home Button */}
          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-200 w-full sm:w-auto"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}