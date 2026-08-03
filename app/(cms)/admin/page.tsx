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
  ShieldCheck,
  List,
  X,
  SignOut,
  ArrowSquareOut,
  CaretRight,
} from "@phosphor-icons/react";

import { StatsTab } from "@/components/admin/stats-tab";
import { HeroTab } from "@/components/admin/hero-tab";
import { DusunTab } from "@/components/admin/dusun-tab";
import { AgendaTab } from "@/components/admin/agenda-tab";
import { TourismTab } from "@/components/admin/tourism-tab";
import { TestimonyTab } from "@/components/admin/testimony-tab";
import { AccountTab } from "@/components/admin/account-tab";

type TabKey = "stats" | "hero" | "dusun" | "agenda" | "tourism" | "testimony" | "account";

export default function AdminDashboardPage() {
  const { data: storedData, updateData } = useCMSData();
  const [formData, setFormData] = useState<VillageCMSData>(storedData);
  const [activeTab, setActiveTab] = useState<TabKey>("stats");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
    setIsSaving(true);
    const finalData = {
      ...formData,
      stats: {
        ...formData.stats,
        population: Number(formData.stats.population) || 0,
        kkCount: Number(formData.stats.kkCount) || 0,
        religionCount: Number(formData.stats.religionCount) || 0,
        productiveLandArea: Number(formData.stats.productiveLandArea) || 0,
        productiveActivePercent: Number(formData.stats.productiveActivePercent) || 0,
        dusunCount: formData.dusunList?.length || 0,
      },
      tourism: (formData.tourism || []).map((t) => ({
        ...t,
        visitorCount: Number(t.visitorCount) || 0,
      })),
    };
    
    const saveToast = toast.loading("Menyimpan perubahan...", { id: "save-toast" });
    try {
      await updateData(finalData);
      setFormData(finalData);
      toast.success("Perubahan berhasil disimpan! Landing page telah ter-update secara otomatis.", { id: saveToast });
    } catch {
      toast.error("Gagal menyimpan perubahan. Koneksi database terputus. Silakan coba lagi.", { id: saveToast });
    } finally {
      setIsSaving(false);
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

  const navigationItems = [
    {
      group: "KONTEN & STATISTIK",
      items: [
        {
          id: "stats" as TabKey,
          label: "Statistik Utama",
          icon: SlidersHorizontal,
          badge: null,
        },
        {
          id: "hero" as TabKey,
          label: "Visi & Hero Section",
          icon: Sparkle,
          badge: null,
        },
        {
          id: "dusun" as TabKey,
          label: "Daftar Wilayah Dusun",
          icon: MapPin,
          badge: `${formData.dusunList?.length || 0}`,
        },
        {
          id: "agenda" as TabKey,
          label: "Agenda Desa",
          icon: CalendarCheck,
          badge: `${formData.agenda?.length || 0}`,
        },
        {
          id: "tourism" as TabKey,
          label: "Destinasi Wisata",
          icon: Compass,
          badge: `${formData.tourism?.length || 0}`,
        },
        {
          id: "testimony" as TabKey,
          label: "Testimoni Warga",
          icon: ChatTeardropText,
          badge: `${(formData.testimonies || []).length}`,
        },
      ],
    },
    {
      group: "PENGATURAN SISTEM",
      items: [
        {
          id: "account" as TabKey,
          label: "Akun & Keamanan",
          icon: ShieldCheck,
          badge: null,
        },
      ],
    },
  ];

  const getTabTitle = () => {
    switch (activeTab) {
      case "stats":
        return "Statistik & Indikator Utama";
      case "hero":
        return "Visi, Misi & Hero Section";
      case "dusun":
        return "Kelola Daftar Dusun";
      case "agenda":
        return "Jadwal & Agenda Desa";
      case "tourism":
        return "Destinasi & Daya Tarik Wisata";
      case "testimony":
        return "Ulasan & Testimoni";
      case "account":
        return "Pengaturan Akun & Password";
      default:
        return "Admin Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] font-sans flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#012d1d] text-white flex flex-col justify-between border-r border-[#0e6c4a]/30 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0e6c4a] flex items-center justify-center text-white shadow-lg shadow-[#0e6c4a]/30 font-heading font-black text-xl">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-base tracking-tight text-white">Malakosa CMS</h1>
                <span className="bg-[#a0f4c8]/20 text-[#a0f4c8] text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-white/60">Portal Desa Digital</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {navigationItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <span className="px-3 text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest block mb-2">
                {group.group}
              </span>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-medium text-xs transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#0e6c4a] text-white font-bold shadow-lg shadow-[#0e6c4a]/30"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} weight={isActive ? "bold" : "regular"} className={isActive ? "text-[#a0f4c8]" : "text-white/60"} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#012417]/80">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/90 text-xs font-semibold border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <House size={16} />
              <span>Lihat Landing Page</span>
            </div>
            <ArrowSquareOut size={14} className="text-white/50" />
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0e6c4a]/40 border border-[#a0f4c8]/30 flex items-center justify-center text-[#a0f4c8] text-xs font-bold font-mono">
                AD
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">Admin Desa</p>
                <p className="text-[10px] text-white/50">Super Administrator</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Keluar / Logout"
              className="p-2 rounded-xl text-red-300 hover:text-white hover:bg-red-500/80 transition-colors cursor-pointer"
            >
              <SignOut size={18} weight="bold" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
            >
              <List size={20} weight="bold" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#0e6c4a] font-bold uppercase tracking-wider">
                <span>CMS Desa Malakosa</span>
                <CaretRight size={12} className="text-zinc-400" />
                <span className="text-zinc-500">{activeTab}</span>
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-extrabold text-[#012d1d] tracking-tight">
                {getTabTitle()}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-colors"
            >
              <House size={16} />
              <span>Preview Web</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <FloppyDisk size={18} weight="bold" />
              <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto flex-1">
          {/* Quick Metrics Bar */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Populasi */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center justify-between hover:border-[#0e6c4a]/30 transition-all">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#0e6c4a] uppercase tracking-wider block mb-0.5">
                  Total Populasi
                </span>
                <div className="font-heading text-2xl font-black text-[#012d1d]">
                  {Number(formData.stats.population || 0).toLocaleString("id-ID")}{" "}
                  <span className="text-xs font-normal text-[#414844]">Jiwa</span>
                </div>
                <span className="text-[10px] text-[#0e6c4a] font-semibold mt-0.5 block">
                  {formData.stats.growthRate}
                </span>
              </div>
              <div className="w-11 h-11 bg-[#a0f4c8]/30 text-[#0e6c4a] rounded-xl flex items-center justify-center font-bold">
                <Users size={22} weight="bold" />
              </div>
            </div>

            {/* Card 2: Dusun & KK */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center justify-between hover:border-[#0e6c4a]/30 transition-all">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#0e6c4a] uppercase tracking-wider block mb-0.5">
                  Wilayah & KK
                </span>
                <div className="font-heading text-xl font-black text-[#012d1d]">
                  {formData.dusunList?.length || 0} <span className="text-xs font-medium text-[#414844]">Dusun</span> /{" "}
                  {formData.stats.kkCount || 0} <span className="text-xs font-medium text-[#414844]">KK</span>
                </div>
                <span className="text-[10px] text-[#414844] font-semibold mt-0.5 block">
                  Data Terverifikasi
                </span>
              </div>
              <div className="w-11 h-11 bg-[#012d1d]/10 text-[#012d1d] rounded-xl flex items-center justify-center font-bold">
                <SquaresFour size={22} weight="bold" />
              </div>
            </div>

            {/* Card 3: Lahan Produktif */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center justify-between hover:border-[#0e6c4a]/30 transition-all">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#0e6c4a] uppercase tracking-wider block mb-0.5">
                  Lahan Produktif
                </span>
                <div className="font-heading text-2xl font-black text-[#012d1d]">
                  {formData.stats.productiveLandArea || 0}{" "}
                  <span className="text-xs font-normal text-[#414844]">Ha</span>
                </div>
                <span className="text-[10px] text-[#0e6c4a] font-semibold mt-0.5 block">
                  {formData.stats.productiveActivePercent}% Lahan Aktif
                </span>
              </div>
              <div className="w-11 h-11 bg-[#a0f4c8]/30 text-[#0e6c4a] rounded-xl flex items-center justify-center font-bold">
                <Plant size={22} weight="bold" />
              </div>
            </div>

            {/* Card 4: Destinasi Wisata */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center justify-between hover:border-[#0e6c4a]/30 transition-all">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#0e6c4a] uppercase tracking-wider block mb-0.5">
                  Destinasi Wisata
                </span>
                <div className="font-heading text-2xl font-black text-[#012d1d]">
                  {formData.tourism?.length || 0}{" "}
                  <span className="text-xs font-normal text-[#414844]">Spot</span>
                </div>
                <span className="text-[10px] text-[#0e6c4a] font-semibold mt-0.5 block">
                  {(formData.testimonies || []).length} Testimoni Aktif
                </span>
              </div>
              <div className="w-11 h-11 bg-[#012d1d] text-white rounded-xl flex items-center justify-center font-bold">
                <Compass size={22} weight="bold" />
              </div>
            </div>
          </section>

          {/* Active Tab Panel */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-sm">
            {activeTab === "stats" && <StatsTab formData={formData} handleStatChange={handleStatChange} />}
            {activeTab === "hero" && <HeroTab formData={formData} setFormData={setFormData} />}
            {activeTab === "dusun" && <DusunTab formData={formData} setFormData={setFormData} />}
            {activeTab === "agenda" && <AgendaTab formData={formData} setFormData={setFormData} />}
            {activeTab === "tourism" && <TourismTab formData={formData} setFormData={setFormData} />}
            {activeTab === "testimony" && <TestimonyTab formData={formData} setFormData={setFormData} />}
            {activeTab === "account" && <AccountTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
