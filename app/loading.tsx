export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#fcf9f8] flex flex-col items-center justify-center overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#a0f4c8]/50 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      
      {/* Huge Text */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#012d1d] to-[#0e6c4a] tracking-tighter animate-pulse drop-shadow-xl">
          MALAKOSA
        </h1>
        <div className="mt-8 flex gap-3">
          <div className="w-3 h-3 rounded-full bg-[#0e6c4a] animate-bounce shadow-md" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 rounded-full bg-[#0e6c4a] animate-bounce shadow-md" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 rounded-full bg-[#0e6c4a] animate-bounce shadow-md" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
