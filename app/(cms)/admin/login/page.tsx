"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-surface-container-low rounded-3xl border border-outline-variant shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-on-surface">Admin Login</h1>
          <p className="text-on-surface-variant mt-2">Masuk untuk mengelola Desa Malakosa</p>
        </div>

        {error && (
          <div className="p-3 bg-error-container text-on-error-container rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-on-surface"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-on-surface"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {loading ? "Authenticating..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
