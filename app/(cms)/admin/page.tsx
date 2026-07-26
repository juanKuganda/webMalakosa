"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCMSData,
  AgendaEvent,
  VillageCMSData,
} from "@/lib/cms-store";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Users,
  SquaresFour,
  Broadcast,
  Plant,
  CheckCircle,
  ArrowsCounterClockwise,
  FloppyDisk,
  Plus,
  Trash,
  CalendarCheck,
  House,
  Sparkle,
  SlidersHorizontal,
  Compass,
} from "@phosphor-icons/react";

export default function AdminDashboardPage() {
  const { data: storedData, updateData, resetData } = useCMSData();
  const [formData, setFormData] = useState<VillageCMSData>(storedData);
  const [activeTab, setActiveTab] = useState<"stats" | "hero" | "agenda" | "tourism">("stats");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const router = useRouter();

  // New agenda form state
  const [newAgenda, setNewAgenda] = useState<{
    date: string;
    title: string;
    desc: string;
    location: string;
  }>({
    date: "",
    title: "",
    desc: "",
    location: "",
  });

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

  const handleSave = () => {
    updateData(formData);
    toast.success("Perubahan berhasil disimpan! Landing page telah ter-update secara otomatis.");
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgenda.title || !newAgenda.date) return;

    const item: AgendaEvent = {
      id: "ev-" + Date.now(),
      date: newAgenda.date.toUpperCase(),
      title: newAgenda.title,
      desc: newAgenda.desc,
      location: newAgenda.location || "Desa Malakosa",
      borderClass: "border-l-primary",
      tagColor: "text-primary",
    };

    setFormData((prev) => ({
      ...prev,
      agenda: [item, ...prev.agenda],
    }));

    setNewAgenda({ date: "", title: "", desc: "", location: "" });
  };

  const handleDeleteAgenda = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.filter((a) => a.id !== id),
    }));
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

      {/* Save Notification Toast handled by Sonner */}

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
                {formData.stats.dusunCount} <span className="text-xs font-medium text-[#414844]">Dusun</span> /{" "}
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
                {formData.stats.agriculturalLand}{" "}
                <span className="text-xs font-normal text-[#414844]">Ha</span>
              </div>
              <span className="text-[11px] text-[#0e6c4a] font-semibold mt-1 block">
                {formData.stats.agriculturalActivePercent}% Sistem IoT Aktif
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
        </div>

        {/* Tab Content Section */}
        <div className="bg-white p-8 rounded-b-3xl rounded-tr-3xl border border-zinc-200/80 shadow-md">
          {/* TAB 1: STATS */}
          {activeTab === "stats" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
                  Edit Indikator & Statistik Landing Page
                </h3>
                <p className="text-xs text-[#414844]">
                  Perubahan pada angka di bawah ini akan secara langsung memperbarui kartu bento di landing page.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Population input */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Total Populasi (Jiwa)
                  </label>
                  <input
                    type="number"
                    value={formData.stats.population}
                    onChange={(e) => handleStatChange("population", Number(e.target.value))}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Jumlah seluruh warga terdaftar di Desa Malakosa.
                  </p>
                </div>

                {/* Dusun count input */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Jumlah Wilayah Dusun
                  </label>
                  <input
                    type="number"
                    value={formData.stats.dusunCount}
                    onChange={(e) => handleStatChange("dusunCount", Number(e.target.value))}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Jumlah unit administratif dusun di desa.
                  </p>
                </div>

                {/* KK count input */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Jumlah Kepala Keluarga (KK)
                  </label>
                  <input
                    type="number"
                    value={formData.stats.kkCount}
                    onChange={(e) => handleStatChange("kkCount", Number(e.target.value))}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Total KK yang terdaftar di basis data digital desa.
                  </p>
                </div>

                {/* Jumlah Agama slider */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                      Jumlah Agama Terdaftar
                    </label>
                    <span className="font-heading font-black text-lg text-[#0e6c4a]">
                      {formData.stats.connectivityIndex}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={formData.stats.connectivityIndex}
                    onChange={(e) => handleStatChange("connectivityIndex", Number(e.target.value))}
                    className="w-full accent-[#0e6c4a] cursor-pointer"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Jumlah agama yang dianut oleh penduduk desa.
                  </p>
                </div>

                {/* Agricultural land input */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Luas Lahan Produktif (Hektar)
                  </label>
                  <input
                    type="number"
                    value={formData.stats.agriculturalLand}
                    onChange={(e) => handleStatChange("agriculturalLand", Number(e.target.value))}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Luas area pertanian sawah organik yang dikelola secara digital.
                  </p>
                </div>

                {/* Agricultural active % input */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                      Lahan Produktif Aktif (%)
                    </label>
                    <span className="font-heading font-black text-lg text-[#0e6c4a]">
                      {formData.stats.agriculturalActivePercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={formData.stats.agriculturalActivePercent}
                    onChange={(e) =>
                      handleStatChange("agriculturalActivePercent", Number(e.target.value))
                    }
                    className="w-full accent-[#0e6c4a] cursor-pointer"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Persentase keterisian dan efektivitas panen lahan aktif.
                  </p>
                </div>

                {/* Growth rate text */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2 md:col-span-2">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Catatan Pertumbuhan (Growth Note)
                  </label>
                  <input
                    type="text"
                    value={formData.stats.growthRate}
                    onChange={(e) => handleStatChange("growthRate", e.target.value)}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm font-semibold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Teks deskripsi pertumbuhan tahunan di kartu populasi utama.
                  </p>
                </div>

                {/* Bagan Pengunjung Wisata */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-4 md:col-span-2">
                  <h4 className="font-heading font-bold text-sm text-[#012d1d]">
                    Bagan Pengunjung Wisata
                  </h4>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={formData.tourism.map((spot) => ({
                          name: spot.title,
                          pengunjung: spot.visitorCount,
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#414844", fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#414844", fontSize: 12 }}
                          dx={-10}
                        />
                        <Tooltip
                          cursor={{ fill: "#f4f4f5" }}
                          contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        />
                        <Bar dataKey="pengunjung" fill="#0e6c4a" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[11px] text-[#414844]">
                    Grafik ini menampilkan jumlah pengunjung bulanan untuk setiap destinasi wisata.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & VISION */}
          {activeTab === "hero" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
                  Konten Utama & Visi Desa
                </h3>
                <p className="text-xs text-[#414844]">
                  Sesuaikan teks banner hero dan kartu visi utama di landing page.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Judul Utama Hero (Hero Title)
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, heroTitle: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-extrabold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>

                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Tagline Subtitle Hero
                  </label>
                  <input
                    type="text"
                    value={formData.heroTagline}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, heroTagline: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-mono text-sm font-semibold text-[#0e6c4a] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>

                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Deskripsi Ringkas Hero
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heroDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, heroDescription: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm text-[#1c1b1b] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>

                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Judul Visi Desa (Bento Grid)
                  </label>
                  <input
                    type="text"
                    value={formData.visionTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, visionTitle: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>

                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Deskripsi Visi Desa (Bento Grid)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.visionDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, visionDescription: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm text-[#1c1b1b] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AGENDA */}
          {activeTab === "agenda" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
                  Kelola Agenda & Kegiatan Desa
                </h3>
                <p className="text-xs text-[#414844]">
                  Tambah, edit, atau hapus acara mendatang yang akan ditampilkan di landing page.
                </p>
              </div>

              {/* Form Tambah Agenda */}
              <form onSubmit={handleAddAgenda} className="bg-[#f6f3f2] p-6 rounded-3xl border border-zinc-200 space-y-4">
                <h4 className="font-heading font-bold text-sm text-[#012d1d] flex items-center gap-2">
                  <Plus size={18} className="text-[#0e6c4a]" /> Tambah Agenda Baru
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tanggal (contoh: 20 AGUSTUS 2026)"
                    value={newAgenda.date}
                    onChange={(e) => setNewAgenda({ ...newAgenda, date: e.target.value })}
                    className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nama / Judul Kegiatan"
                    value={newAgenda.title}
                    onChange={(e) => setNewAgenda({ ...newAgenda, title: e.target.value })}
                    className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Lokasi (contoh: Balai Desa Malakosa)"
                    value={newAgenda.location}
                    onChange={(e) => setNewAgenda({ ...newAgenda, location: e.target.value })}
                    className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <input
                    type="text"
                    placeholder="Deskripsi singkat kegiatan"
                    value={newAgenda.desc}
                    onChange={(e) => setNewAgenda({ ...newAgenda, desc: e.target.value })}
                    className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>Tambah Ke Agenda</span>
                  </button>
                </div>
              </form>

              {/* List Agenda */}
              <div className="space-y-4">
                <h4 className="font-heading text-sm font-bold text-[#012d1d]">Daftar Agenda Saat Ini:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.agenda.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-start gap-4"
                    >
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-bold text-[#0e6c4a]">
                          {item.date}
                        </span>
                        <h5 className="font-heading font-bold text-base text-[#012d1d]">
                          {item.title}
                        </h5>
                        <p className="text-xs text-[#414844] leading-relaxed">
                          {item.desc}
                        </p>
                        <p className="text-[11px] font-semibold text-[#012d1d]/80 pt-1">
                          📍 {item.location}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAgenda(item.id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-xl border border-red-200 transition-colors shrink-0 cursor-pointer"
                        title="Hapus Agenda"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TOURISM */}
          {activeTab === "tourism" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
                  Kelola Destinasi Wisata Bahari & Ekowisata
                </h3>
                <p className="text-xs text-[#414844]">
                  Pantau dan update status destinasi ekowisata di Desa Malakosa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.tourism.map((spot) => (
                  <div key={spot.id} className="bg-[#f6f3f2] p-6 rounded-2xl border border-zinc-200 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#0e6c4a] bg-[#a0f4c8]/40 px-2.5 py-1 rounded-full border border-[#0e6c4a]/20">
                          {spot.category}
                        </span>
                        <h4 className="font-heading font-bold text-lg text-[#012d1d] mt-2">
                          {spot.title}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                        {spot.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#414844] leading-relaxed">
                      {spot.description}
                    </p>

                    <div className="pt-2 flex justify-between items-center text-xs font-bold text-[#012d1d]">
                      <span>Pengunjung Bulan Ini:</span>
                      <span className="font-heading text-base font-black text-[#0e6c4a]">
                        {spot.visitorCount.toLocaleString("id-ID")} Orang
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
