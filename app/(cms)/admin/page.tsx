"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useCMSData,
  AgendaEvent,
  VillageCMSData,
  TourismSpot,
} from "@/lib/cms-store";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Users,
  SquaresFour,
  Plant,
  FloppyDisk,
  Plus,
  Trash,
  CalendarCheck,
  House,
  Sparkle,
  SlidersHorizontal,
  Compass,
  MapPin,
} from "@phosphor-icons/react";

export default function AdminDashboardPage() {
  const { data: storedData, updateData } = useCMSData();
  const [formData, setFormData] = useState<VillageCMSData>(storedData);
  const [activeTab, setActiveTab] = useState<"stats" | "hero" | "dusun" | "agenda" | "tourism">("stats");
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

  const [newDusun, setNewDusun] = useState("");

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

  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgenda.title || !newAgenda.date) return;

    const item: AgendaEvent = {
      id: "ev-" + Date.now(),
      date: newAgenda.date.toUpperCase(),
      title: newAgenda.title,
      desc: newAgenda.desc,
      location: newAgenda.location || "Desa Malakosa",
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

  const handleAddDusun = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newDusun.trim().toUpperCase();
    if (!trimmed) return;
    
    // Ensure dusunList is an array
    const currentList = formData.dusunList || [];
    
    if (currentList.includes(trimmed)) {
      toast.error(`Dusun ${trimmed} sudah ada di daftar!`);
      return;
    }

    const updatedList = [...currentList, trimmed];
    setFormData((prev) => ({
      ...prev,
      dusunList: updatedList,
      stats: {
        ...prev.stats,
        dusunCount: updatedList.length,
      },
    }));
    setNewDusun("");
    toast.success(`Dusun ${trimmed} berhasil ditambahkan.`);
  };

  const handleDeleteDusun = (name: string) => {
    const currentList = formData.dusunList || [];
    const updatedList = currentList.filter((d) => d !== name);
    setFormData((prev) => ({
      ...prev,
      dusunList: updatedList,
      stats: {
        ...prev.stats,
        dusunCount: updatedList.length,
      },
    }));
    toast.success(`Dusun ${name} berhasil dihapus.`);
  };

  const handleTourismChange = (id: string, field: keyof TourismSpot, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      tourism: prev.tourism.map(t => t.id === id ? { ...t, [field]: value } : t)
    }));
  };

  const handleAddTourism = () => {
    const newSpot: TourismSpot = {
      id: `tourism-${Date.now()}`,
      title: "Destinasi Baru",
      category: "WISATA BAHARI",
      description: "Deskripsi singkat...",
      content: "",
      visitorCount: 0,
      status: "Beroperasi",
    };
    setFormData(prev => ({
      ...prev,
      tourism: [...prev.tourism, newSpot]
    }));
    toast.success("Destinasi wisata baru ditambahkan");
  };

  const handleDeleteTourism = (id: string) => {
    setFormData(prev => ({
      ...prev,
      tourism: prev.tourism.filter(t => t.id !== id)
    }));
    toast.success("Destinasi wisata dihapus");
  };

  const handleUploadImage = async (id: string, file: File) => {
    try {
      toast.loading("Mengunggah gambar...");
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      
      if (!res.ok) throw new Error("Gagal mengunggah");
      
      const data = await res.json();
      if (data.url) {
        handleTourismChange(id, "imageUrl", data.url);
        toast.dismiss();
        toast.success("Gambar berhasil diunggah!");
      }
    } catch {
      toast.dismiss();
      toast.error("Gagal mengunggah gambar");
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
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Total Populasi (Jiwa)
                  </Label>
                  <Input
                    type="number"
                    value={formData.stats.population}
                    onChange={(e: any) => handleStatChange("population", Number(e.target.value))}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Jumlah seluruh warga terdaftar di Desa Malakosa.
                  </p>
                </div>

                {/* Dusun count input */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2 opacity-80">
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Jumlah Wilayah Dusun (Otomatis)
                  </Label>
                  <Input
                    type="number"
                    value={formData.dusunList?.length || 0}
                    disabled
                    className="w-full bg-zinc-100 px-4 py-3 rounded-xl border border-zinc-200 font-heading text-lg font-bold text-zinc-500 cursor-not-allowed"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Nilai ini dihitung otomatis berdasarkan jumlah dusun di tab <strong>Daftar Dusun</strong>.
                  </p>
                </div>

                {/* KK count input */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Jumlah Kepala Keluarga (KK)
                  </Label>
                  <Input
                    type="number"
                    value={formData.stats.kkCount}
                    onChange={(e: any) => handleStatChange("kkCount", Number(e.target.value))}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Total KK yang terdaftar di basis data digital desa.
                  </p>
                </div>

                {/* Jumlah Agama slider */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                      Jumlah Agama Terdaftar
                    </Label>
                    <span className="font-heading font-black text-lg text-[#0e6c4a]">
                      {formData.stats.connectivityIndex}
                    </span>
                  </div>
                  <Input
                    type="range"
                    min="1"
                    max="6"
                    value={formData.stats.connectivityIndex}
                    onChange={(e: any) => handleStatChange("connectivityIndex", Number(e.target.value))}
                    className="w-full accent-[#0e6c4a] cursor-pointer"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Jumlah agama yang dianut oleh penduduk desa.
                  </p>
                </div>

                {/* Agricultural land input */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Luas Lahan Produktif (Hektar)
                  </Label>
                  <Input
                    type="number"
                    value={formData.stats.productiveLandArea}
                    onChange={(e: any) => handleStatChange("productiveLandArea", Number(e.target.value))}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Luas area pertanian sawah organik yang dikelola secara digital.
                  </p>
                </div>

                {/* Agricultural active % input */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                      Lahan Produktif Aktif (%)
                    </Label>
                    <span className="font-heading font-black text-lg text-[#0e6c4a]">
                      {formData.stats.productiveActivePercent}%
                    </span>
                  </div>
                  <Input
                    type="range"
                    min="10"
                    max="100"
                    value={formData.stats.productiveActivePercent}
                    onChange={(e: any) =>
                      handleStatChange("productiveActivePercent", Number(e.target.value))
                    }
                    className="w-full accent-[#0e6c4a] cursor-pointer"
                  />
                  <p className="text-[11px] text-[#414844]">
                    Persentase keterisian dan efektivitas panen lahan aktif.
                  </p>
                </div>

                {/* Growth rate text */}
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2 md:col-span-2">
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Catatan Pertumbuhan (Growth Note)
                  </Label>
                  <Input
                    type="text"
                    value={formData.stats.growthRate}
                    onChange={(e: any) => handleStatChange("growthRate", e.target.value)}
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
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Judul Utama Hero (Hero Title)
                  </Label>
                  <Input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e: any) =>
                      setFormData((prev) => ({ ...prev, heroTitle: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-extrabold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>

                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Tagline Subtitle Hero
                  </Label>
                  <Input
                    type="text"
                    value={formData.heroTagline}
                    onChange={(e: any) =>
                      setFormData((prev) => ({ ...prev, heroTagline: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-mono text-sm font-semibold text-[#0e6c4a] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>

                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Deskripsi Ringkas Hero
                  </Label>
                  <Textarea
                    rows={3}
                    value={formData.heroDescription}
                    onChange={(e: any) =>
                      setFormData((prev) => ({ ...prev, heroDescription: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm text-[#1c1b1b] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>

                

                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Judul Visi Desa (Bento Grid)
                  </Label>
                  <Input
                    type="text"
                    value={formData.visionTitle}
                    onChange={(e: any) =>
                      setFormData((prev) => ({ ...prev, visionTitle: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>

                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
                  <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
                    Deskripsi Visi Desa (Bento Grid)
                  </Label>
                  <Textarea
                    rows={3}
                    value={formData.visionDescription}
                    onChange={(e: any) =>
                      setFormData((prev) => ({ ...prev, visionDescription: e.target.value }))
                    }
                    className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm text-[#1c1b1b] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: DUSUN */}
          {activeTab === "dusun" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
                  Kelola Wilayah Dusun Desa Malakosa
                </h3>
                <p className="text-xs text-[#414844]">
                  Daftar dusun di bawah ini digunakan untuk pemetaan administratif desa dan penentuan lokasi agenda. Jumlah dusun di Statistik Utama akan ter-update otomatis secara real-time.
                </p>
              </div>

              {/* Form Tambah Dusun */}
              <form onSubmit={handleAddDusun} className="bg-[#f6f3f2] p-6 rounded-3xl border border-zinc-200 space-y-4">
                <h4 className="font-heading font-bold text-sm text-[#012d1d] flex items-center gap-2">
                  <Plus size={18} className="text-[#0e6c4a]" /> Tambah Dusun Baru
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Masukkan nama dusun (contoh: Pante)"
                      value={newDusun}
                      onChange={(e: any) => setNewDusun(e.target.value)}
                      className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a] w-full"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>Tambah Dusun</span>
                  </button>
                </div>
              </form>

              {/* List Dusun */}
              <div className="space-y-4">
                <h4 className="font-heading text-sm font-bold text-[#012d1d]">
                  Daftar Nama Dusun Saat Ini ({formData.dusunList?.length || 0}):
                </h4>
                {(!formData.dusunList || formData.dusunList.length === 0) ? (
                  <div className="text-center py-12 text-zinc-400 bg-[#f6f3f2] rounded-3xl border border-dashed border-zinc-200">
                    Belum ada dusun terdaftar. Tambahkan dusun baru di atas.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.dusunList.map((dusun) => (
                      <div
                        key={dusun}
                        className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-center gap-4 group hover:border-[#0e6c4a]/30 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#a0f4c8]/30 flex items-center justify-center text-[#0e6c4a]">
                            <MapPin size={18} />
                          </div>
                          <div>
                            <span className="font-mono text-xs font-bold text-[#0e6c4a]">WILAYAH DUSUN</span>
                            <h5 className="font-heading font-bold text-base text-[#012d1d] uppercase">
                              {dusun}
                            </h5>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteDusun(dusun)}
                          className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-xl border border-red-200 transition-colors shrink-0 cursor-pointer"
                          title="Hapus Dusun"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                  <Input
                    type="text"
                    placeholder="Tanggal (contoh: 20 AGUSTUS 2026)"
                    value={newAgenda.date}
                    onChange={(e: any) => setNewAgenda({ ...newAgenda, date: e.target.value })}
                    className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Nama / Judul Kegiatan"
                    value={newAgenda.title}
                    onChange={(e: any) => setNewAgenda({ ...newAgenda, title: e.target.value })}
                    className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                    required
                  />
                  <div>
                    <Input
                      type="text"
                      list="dusun-options"
                      placeholder="Lokasi (Ketik atau Pilih dari dropdown)"
                      value={newAgenda.location}
                      onChange={(e: any) => setNewAgenda({ ...newAgenda, location: e.target.value })}
                      className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                      required
                    />
                    <datalist id="dusun-options">
                      {formData.dusunList?.map((dusun) => (
                        <option key={dusun} value={`Dusun ${dusun}`} />
                      ))}
                    </datalist>
                  </div>
                  <Input
                    type="text"
                    placeholder="Deskripsi singkat kegiatan"
                    value={newAgenda.desc}
                    onChange={(e: any) => setNewAgenda({ ...newAgenda, desc: e.target.value })}
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
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
                    Kelola Destinasi Wisata Bahari & Ekowisata
                  </h3>
                  <p className="text-xs text-[#414844]">
                    Pantau dan update status destinasi ekowisata di Desa Malakosa.
                  </p>
                </div>
                <button
                  onClick={handleAddTourism}
                  className="bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Plus size={16} />
                  <span>Tambah Destinasi</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.tourism.map((spot) => (
                  <div key={spot.id} className="bg-[#f6f3f2] p-6 rounded-2xl border border-zinc-200 space-y-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          value={spot.category}
                          onChange={(e: any) => handleTourismChange(spot.id, "category", e.target.value)}
                          className="h-8 w-auto min-w-[120px] font-mono text-[10px] uppercase font-bold text-[#0e6c4a] bg-[#a0f4c8]/40 px-2.5 py-1 rounded-full border border-[#0e6c4a]/20 focus:outline-none focus:ring-1 focus:ring-[#0e6c4a]"
                        />
                        <Input
                          type="text"
                          value={spot.status}
                          onChange={(e: any) => handleTourismChange(spot.id, "status", e.target.value)}
                          className="h-8 w-auto min-w-[130px] font-sans text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-3 py-0 rounded-full border border-emerald-300 text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteTourism(spot.id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-lg border border-red-200 transition-colors cursor-pointer"
                        title="Hapus Destinasi"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                    
                    <Input
                      type="text"
                      value={spot.title}
                      onChange={(e: any) => handleTourismChange(spot.id, "title", e.target.value)}
                      className="w-full bg-white px-3 py-2 rounded-lg border border-zinc-300 font-heading font-bold text-lg text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                    />

                    <Textarea
                      rows={2}
                      value={spot.description}
                      onChange={(e: any) => handleTourismChange(spot.id, "description", e.target.value)}
                      placeholder="Deskripsi singkat..."
                      className="w-full bg-white px-3 py-2 rounded-lg border border-zinc-300 text-xs text-[#414844] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                    />

                    <Textarea
                      rows={4}
                      value={spot.content || ""}
                      onChange={(e: any) => handleTourismChange(spot.id, "content", e.target.value)}
                      placeholder="Konten detail panjang..."
                      className="w-full bg-white px-3 py-2 rounded-lg border border-zinc-300 text-xs text-[#414844] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                    />

                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-[#012d1d]">Gambar Wisata</Label>
                      {spot.imageUrl && (
                        <div className="w-full h-32 rounded-lg overflow-hidden border border-zinc-200 mb-2 relative">
                          <Image src={spot.imageUrl} alt={spot.title} fill className="object-cover" />
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e: any) => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadImage(spot.id, file);
                        }}
                        className="w-full text-xs text-[#414844] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0e6c4a] file:text-white hover:file:bg-[#19724f]"
                      />
                    </div>

                    <div className="pt-2 flex justify-between items-center text-xs font-bold text-[#012d1d]">
                      <span>Pengunjung Bulan Ini:</span>
                      <Input
                        type="number"
                        value={spot.visitorCount}
                        onChange={(e: any) => handleTourismChange(spot.id, "visitorCount", Number(e.target.value))}
                        className="w-24 bg-white px-2 py-1 rounded-md border border-zinc-300 font-heading text-base font-black text-[#0e6c4a] text-right focus:outline-none"
                      />
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
