"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCMSData, VillageCMSData } from "@/lib/cms-store";
import { toast } from "sonner";
import {
  Users,
  SquaresFour,
  Plant,
  FloppyDisk,
  CalendarCheck,
  House,
  Sparkle,
  SlidersHorizontal,
  Compass,
  MapPin,
  ChatTeardropText,
} from "@phosphor-icons/react";

import { StatsTab } from "@/components/admin/stats-tab";
import { HeroTab } from "@/components/admin/hero-tab";
import { DusunTab } from "@/components/admin/dusun-tab";
import { AgendaTab } from "@/components/admin/agenda-tab";
import { TourismTab } from "@/components/admin/tourism-tab";
import { TestimonyTab } from "@/components/admin/testimony-tab";

export default function AdminDashboardPage() {
  const { data: storedData, updateData } = useCMSData();
  const [formData, setFormData] = useState<VillageCMSData>(storedData);
  const [activeTab, setActiveTab] = useState<"stats" | "hero" | "dusun" | "agenda" | "tourism" | "testimony">("stats");
  const router = useRouter();

  const [prevStored, setPrevStored] = useState(storedData);

  if (storedData !== prevStored) {
    setPrevStored(storedData);
    setFormData(storedData);
  }

  const handleStatChange = (field: keyof typeof formData.stats, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    const finalData = {
      ...formData,
      stats: {
        ...formData.stats,
        dusunCount: formData.dusunList?.length || 0,
      }
    };
    
    toast.loading("Menyimpan perubahan...", { id: "save-toast" });
    try {
      await updateData(finalData);
      setFormData(finalData);
      toast.success("Perubahan berhasil disimpan! Landing page telah ter-update secara otomatis.", { id: "save-toast" });
    } catch (error) {
      toast.error("Gagal menyimpan perubahan. Koneksi database terputus. Silakan coba lagi.", { id: "save-toast" });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] font-sans pb-16">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#012d1d] text-white shadow-xl backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-lg font-bold">Malakosa CMS</h1>
                <span className="bg-[#a0f4c8]/20 text-[#a0f4c8] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#a0f4c8]/30 uppercase tracking-widest font-bold">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs text-white/70 font-sans">
                Kelola data statistik & konten landing page secara dinamis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
            >
              <House size={16} />
              <span>Lihat Landing Page</span>
            </Link>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <FloppyDisk size={18} />
              <span>Simpan Perubahan</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/90 text-red-100 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-red-400/20 transition-colors cursor-pointer"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* KPI Dynamic Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Populasi */}
          <div className="bg-white p-6 rounded-3xl border border-[#012d1d]/10 shadow-sm flex items-center justify-between group hover:border-[#0e6c4a]/30 transition-all">
            <div>
              <span className="text-xs font-mono font-bold text-[#0e6c4a] uppercase tracking-wider block mb-1">
                Total Populasi
              </span>
              <div className="font-heading text-3xl font-black text-[#012d1d]">
                {formData.stats.population.toLocaleString("id-ID")}{" "}
                <span className="text-xs font-normal text-[#414844]">Jiwa</span>
              </div>
              <span className="text-[11px] text-[#0e6c4a] font-semibold mt-1 block">
                {formData.stats.growthRate}
              </span>
            </div>
            <div className="w-12 h-12 bg-[#a0f4c8]/30 text-[#0e6c4a] rounded-2xl flex items-center justify-center font-bold">
              <Users size={24} />
            </div>
          </div>

          {/* Card 2: Dusun & KK */}
          <div className="bg-white p-6 rounded-3xl border border-[#012d1d]/10 shadow-sm flex items-center justify-between group hover:border-[#0e6c4a]/30 transition-all">
            <div>
              <span className="text-xs font-mono font-bold text-[#0e6c4a] uppercase tracking-wider block mb-1">
                Wilayah & KK
              </span>
              <div className="font-heading text-2xl font-black text-[#012d1d]">
                {formData.dusunList?.length || 0} <span className="text-xs font-medium text-[#414844]">Dusun</span> /{" "}
                {formData.stats.kkCount} <span className="text-xs font-medium text-[#414844]">KK</span>
              </div>
              <span className="text-[11px] text-[#414844] font-semibold mt-1 block">
                Data Terverifikasi Digital
              </span>
            </div>
            <div className="w-12 h-12 bg-[#012d1d]/10 text-[#012d1d] rounded-2xl flex items-center justify-center font-bold">
              <SquaresFour size={24} />
            </div>
          </div>

          {/* Card 3: Lahan Produktif */}
          <div className="bg-white p-6 rounded-3xl border border-[#012d1d]/10 shadow-sm flex items-center justify-between group hover:border-[#0e6c4a]/30 transition-all">
            <div>
              <span className="text-xs font-mono font-bold text-[#0e6c4a] uppercase tracking-wider block mb-1">
                Lahan Sawah Organik
              </span>
              <div className="font-heading text-3xl font-black text-[#012d1d]">
                {formData.stats.productiveLandArea}{" "}
                <span className="text-xs font-normal text-[#414844]">Ha</span>
              </div>
              <span className="text-[11px] text-[#0e6c4a] font-semibold mt-1 block">
                {formData.stats.productiveActivePercent}% Sistem IoT Aktif
              </span>
            </div>
            <div className="w-12 h-12 bg-[#a0f4c8]/30 text-[#0e6c4a] rounded-2xl flex items-center justify-center font-bold">
              <Plant size={24} />
            </div>
          </div>

          {/* Card 4: Connectivity (Now Jumlah Agama) */}
          <div className="bg-white p-6 rounded-3xl border border-[#012d1d]/10 shadow-sm flex items-center justify-between group hover:border-[#0e6c4a]/30 transition-all">
            <div>
              <span className="text-xs font-mono font-bold text-[#0e6c4a] uppercase tracking-wider block mb-1">
                Jumlah Agama Terdaftar
              </span>
              <div className="font-heading text-3xl font-black text-[#012d1d]">
                {formData.stats.connectivityIndex}
              </div>
              <span className="text-[11px] text-[#0e6c4a] font-semibold mt-1 block flex items-center gap-1">
                Data Kependudukan
              </span>
            </div>
            <div className="w-12 h-12 bg-[#012d1d] text-white rounded-2xl flex items-center justify-center font-bold">
              <Users size={24} />
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-200 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "stats"
                ? "bg-[#012d1d] text-white shadow-md"
                : "bg-white text-[#414844] hover:bg-zinc-100"
            }`}
          >
            <SlidersHorizontal size={18} />
            <span>Statistik Utama</span>
          </button>
          <button
            onClick={() => setActiveTab("hero")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "hero"
                ? "bg-[#012d1d] text-white shadow-md"
                : "bg-white text-[#414844] hover:bg-zinc-100"
            }`}
          >
            <Sparkle size={18} />
            <span>Visi & Hero Section</span>
          </button>
          <button
            onClick={() => setActiveTab("dusun")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "dusun"
                ? "bg-[#012d1d] text-white shadow-md"
                : "bg-white text-[#414844] hover:bg-zinc-100"
            }`}
          >
            <MapPin size={18} />
            <span>Daftar Dusun ({formData.dusunList?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab("agenda")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "agenda"
                ? "bg-[#012d1d] text-white shadow-md"
                : "bg-white text-[#414844] hover:bg-zinc-100"
            }`}
          >
            <CalendarCheck size={18} />
            <span>Agenda Desa ({formData.agenda.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("tourism")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "tourism"
                ? "bg-[#012d1d] text-white shadow-md"
                : "bg-white text-[#414844] hover:bg-zinc-100"
            }`}
          >
            <Compass size={18} />
            <span>Destinasi Wisata</span>
          </button>
          <button
            onClick={() => setActiveTab("testimony")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "testimony"
                ? "bg-[#012d1d] text-white shadow-md"
                : "bg-white text-[#414844] hover:bg-zinc-100"
            }`}
          >
            <ChatTeardropText size={18} />
            <span>Testimoni ({(formData.testimonies || []).length})</span>
          </button>
        </div>

        {/* Tab Content Section */}
        <div className="bg-white p-8 rounded-b-3xl rounded-tr-3xl border border-zinc-200/80 shadow-md">
          {activeTab === "stats" && <StatsTab formData={formData} handleStatChange={handleStatChange} />}
          {activeTab === "hero" && <HeroTab formData={formData} setFormData={setFormData} />}
          {activeTab === "dusun" && <DusunTab formData={formData} setFormData={setFormData} />}
          {activeTab === "agenda" && <AgendaTab formData={formData} setFormData={setFormData} />}
          {activeTab === "tourism" && <TourismTab formData={formData} setFormData={setFormData} />}
          {activeTab === "testimony" && <TestimonyTab formData={formData} setFormData={setFormData} />}
        </div>
      </main>
    </div>
  );
}
