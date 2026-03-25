export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
      <div className="relative flex items-center justify-center">
        {/* Glowing Spinning Ring */}
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        {/* Inner Pulse Glow */}
        <div className="absolute w-8 h-8 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      <h2 className="mt-6 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse tracking-widest uppercase">
        Loading Masterpiece...
      </h2>
    </div>
  );
}