"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKey, User } from "@phosphor-icons/react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh(); 
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#012d1d] overflow-hidden p-6">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <h1 
          className="font-heading font-black text-[20vw] md:text-[15vw] leading-none text-transparent stroke-white uppercase opacity-5 select-none" 
          style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }}
        >
          MALAKOSA
        </h1>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0e6c4a]/50 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#a0f4c8]/20 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-4 font-heading text-xl font-black text-[#a0f4c8] tracking-widest uppercase hover:opacity-80 transition-opacity">
            ← KEMBALI
          </Link>
          <h2 className="font-heading text-4xl font-black text-white uppercase tracking-tight">Portal Admin</h2>
          <p className="text-white/60 font-sans mt-2">Masuk untuk mengelola data digital desa.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-2xl text-sm font-medium text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest text-white/50 pl-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                <User size={20} weight="bold" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 rounded-2xl border border-white/10 focus:outline-none focus:border-[#a0f4c8] focus:bg-white/10 text-white transition-all font-sans"
                required
                placeholder="Masukkan username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest text-white/50 pl-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                <LockKey size={20} weight="bold" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 rounded-2xl border border-white/10 focus:outline-none focus:border-[#a0f4c8] focus:bg-white/10 text-white transition-all font-sans"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-5 bg-[#a0f4c8] text-[#012d1d] rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 shadow-[0_10px_30px_rgba(160,244,200,0.2)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.4)]"
          >
            {loading ? "MENGOTENTIKASI..." : "MASUK KE DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}
