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
    <div className="min-h-screen relative flex items-center justify-center bg-white overflow-hidden p-6">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <h1 
          className="font-heading font-black text-[20vw] md:text-[15vw] leading-none text-transparent stroke-black uppercase opacity-[0.03] select-none" 
          style={{ WebkitTextStroke: "2px rgba(0,0,0,1)" }}
        >
          MALAKOSA
        </h1>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0e6c4a]/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#a0f4c8]/40 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white border border-gray-200 rounded-[2rem] p-8 shadow-2xl">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-4 font-heading text-xl font-black text-[#012d1d] tracking-widest uppercase hover:opacity-80 transition-opacity">
            ← KEMBALI
          </Link>
          <h2 className="font-heading text-4xl font-black text-gray-900 uppercase tracking-tight">Portal Admin</h2>
          <p className="text-gray-600 font-sans mt-2">Masuk untuk mengelola data digital desa.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 pl-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <User size={20} weight="bold" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#012d1d] focus:bg-white text-gray-900 transition-all font-sans"
                required
                placeholder="Masukkan username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 pl-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <LockKey size={20} weight="bold" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#012d1d] focus:bg-white text-gray-900 transition-all font-sans"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-5 bg-[#012d1d] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#0e6c4a] transition-colors disabled:opacity-50 shadow-xl hover:shadow-2xl"
          >
            {loading ? "MENGOTENTIKASI..." : "MASUK KE DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}
