import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-center px-4 relative overflow-hidden">
      
      {/* Background Aurora Glow - Cyan variant */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Massive Background 404 Text */}
      <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/5 to-transparent select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        404
      </h1>

      {/* Glassmorphism Card */}
      <div className="bg-white/5 border border-white/10 p-10 rounded-2xl backdrop-blur-md max-w-lg w-full shadow-[0_0_30px_rgba(6,182,212,0.15)] relative z-10 mt-10">
        
        {/* Search/Compass Icon */}
        <div className="text-cyan-400 mb-6 flex justify-center">
          <svg className="w-20 h-20 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">Lost in the Void</h2>
        <p className="text-gray-400 mb-8 text-base leading-relaxed">
          The article or page you are looking for has either vanished into cyberspace or never existed in the first place.
        </p>

        {/* Return Home Button */}
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-medium shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}