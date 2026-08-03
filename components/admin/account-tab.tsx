"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  User,
  LockKey,
  ShieldCheck,
  Eye,
  EyeSlash,
  FloppyDisk,
  CheckCircle,
  Key,
  Info,
} from "@phosphor-icons/react";

export function AccountTab() {
  const [initialUsername, setInitialUsername] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadProfile() {
      try {
        const res = await fetch("/api/auth/profile");
        if (res.ok) {
          const data = await res.json();
          if (!ignore && data.user?.username) {
            setInitialUsername(data.user.username);
            setUsername(data.user.username);
          }
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (!ignore) {
          setFetching(false);
        }
      }
    }

    loadProfile();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Password saat ini wajib diisi untuk verifikasi keamanan.");
      return;
    }

    const isUsernameChanged = username.trim() !== initialUsername;
    const isPasswordChanged = Boolean(newPassword);

    if (!isUsernameChanged && !isPasswordChanged) {
      toast.info("Tidak ada perubahan username atau password yang dimasukkan.");
      return;
    }

    if (isPasswordChanged) {
      if (newPassword.length < 6) {
        toast.error("Password baru minimal harus 6 karakter.");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("Konfirmasi password baru tidak cocok.");
        return;
      }
    }

    setLoading(true);
    const toastId = toast.loading("Memperbarui akun admin...");

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newUsername: isUsernameChanged ? username.trim() : undefined,
          newPassword: isPasswordChanged ? newPassword : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || "Akun admin berhasil diperbarui!", { id: toastId });
        setInitialUsername(data.username || username);
        setUsername(data.username || username);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.error || "Gagal memperbarui akun.", { id: toastId });
      }
    } catch (err) {
      console.error("Update account error:", err);
      toast.error("Terjadi kesalahan jaringan. Silakan coba lagi.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h3 className="font-heading text-xl font-bold text-[#012d1d] flex items-center gap-2">
            <ShieldCheck size={24} className="text-[#0e6c4a]" weight="duotone" />
            Pengaturan Akun & Keamanan Admin
          </h3>
          <p className="text-xs text-[#414844] mt-1">
            Ubah username login dan perbarui kata sandi untuk mengamankan akses ke CMS Desa Malakosa.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0e6c4a]/10 text-[#0e6c4a] px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-[#0e6c4a]/20 w-fit">
          <CheckCircle size={16} weight="fill" />
          <span>Sesi Login Terverifikasi</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Card Sidebar */}
        <div className="space-y-4">
          <div className="bg-[#f6f3f2] p-6 rounded-3xl border border-zinc-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#012d1d] text-white flex items-center justify-center font-bold">
                <User size={24} weight="bold" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#0e6c4a] font-bold uppercase tracking-wider block">
                  Akun Aktif
                </span>
                <h4 className="font-heading text-lg font-black text-[#012d1d]">
                  {fetching ? "Memuat..." : initialUsername || "Admin"}
                </h4>
              </div>
            </div>

            <hr className="border-zinc-200" />

            <div className="space-y-2 text-xs text-[#414844]">
              <div className="flex justify-between">
                <span className="text-zinc-500">Peran:</span>
                <span className="font-bold text-[#012d1d]">Super Administrator</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Otoritas:</span>
                <span className="font-bold text-[#0e6c4a]">Akses Penuh CMS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Enkripsi:</span>
                <span className="font-mono text-zinc-600 font-bold">Bcrypt (Salted)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0e6c4a]/5 p-5 rounded-2xl border border-[#0e6c4a]/20 text-xs text-[#012d1d] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0e6c4a]">
              <Info size={18} weight="bold" />
              <span>Petunjuk Keamanan</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-[#414844]">
              <li>Password baru minimal memiliki <strong>6 karakter</strong>.</li>
              <li>Wajib mengisi <strong>Password Saat Ini</strong> untuk memvalidasi setiap perubahan.</li>
              <li>Jika hanya ingin mengganti username, biarkan kolom password baru kosong.</li>
            </ul>
          </div>
        </div>

        {/* Change Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-[#f6f3f2] p-6 sm:p-8 rounded-3xl border border-zinc-200 space-y-6">
          <div className="space-y-4">
            <h4 className="font-heading text-base font-bold text-[#012d1d] flex items-center gap-2 border-b border-zinc-200 pb-3">
              <Key size={20} className="text-[#0e6c4a]" /> Form Perubahan Akun
            </h4>

            {/* Username Field */}
            <div className="space-y-1.5">
              <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                Username Administrator
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <User size={18} weight="bold" />
                </div>
                <Input
                  type="text"
                  value={username}
                  onChange={(e: any) => setUsername(e.target.value)}
                  placeholder="Masukkan username baru"
                  required
                  className="w-full pl-11 pr-4 bg-white rounded-xl border border-zinc-300 text-sm font-semibold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                />
              </div>
              <p className="text-[11px] text-[#414844]">
                Nama pengguna yang dipakai saat login ke halaman admin CMS.
              </p>
            </div>

            <hr className="border-zinc-200 my-4" />

            {/* Current Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                  Password Saat Ini <span className="text-red-500">*</span>
                </Label>
                <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wider">
                  Wajib Diisi
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <LockKey size={18} weight="bold" />
                </div>
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e: any) => setCurrentPassword(e.target.value)}
                  placeholder="Ketik password saat ini untuk verifikasi"
                  required
                  className="w-full pl-11 pr-12 bg-white rounded-xl border border-zinc-300 text-sm font-semibold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-700 cursor-pointer"
                >
                  {showCurrentPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[11px] text-[#414844]">
                Masukkan kata sandi lama Anda untuk mengonfirmasi bahwa Anda adalah pemilik akun yang sah.
              </p>
            </div>

            {/* New Password Field */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                  Password Baru (Opsional)
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <LockKey size={18} weight="bold" />
                  </div>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-11 pr-12 bg-white rounded-xl border border-zinc-300 text-sm font-semibold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-700 cursor-pointer"
                  >
                    {showNewPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[11px] text-[#414844]">
                  Kosongkan jika hanya ingin mengganti username.
                </p>
              </div>

              {/* Confirm New Password Field */}
              <div className="space-y-1.5">
                <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                  Konfirmasi Password Baru
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <LockKey size={18} weight="bold" />
                  </div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password baru"
                    disabled={!newPassword}
                    className="w-full pl-11 pr-12 bg-white rounded-xl border border-zinc-300 text-sm font-semibold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a] disabled:bg-zinc-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={!newPassword}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-700 cursor-pointer disabled:opacity-40"
                  >
                    {showConfirmPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {newPassword && confirmPassword && (
                  <p className={`text-[11px] font-semibold ${newPassword === confirmPassword ? "text-[#0e6c4a]" : "text-red-500"}`}>
                    {newPassword === confirmPassword ? "✓ Password cocok" : "✗ Konfirmasi password tidak cocok"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading || fetching}
              className="flex items-center gap-2 bg-[#0e6c4a] hover:bg-[#19724f] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <FloppyDisk size={20} />
              <span>{loading ? "Menyimpan Perubahan..." : "Simpan Perubahan Akun"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
