import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CalendarView from "@/components/landing/calendar-view";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kalender Agenda & Kegiatan",
  description: "Jadwal resmi seluruh kegiatan komunitas, musyawarah desa, posyandu, dan acara kebudayaan di Desa Malakosa secara real-time.",
  alternates: {
    canonical: "https://www.malakosa.web.id/kalender",
  },
  openGraph: {
    title: "Kalender Agenda Desa Malakosa",
    description: "Jadwal resmi kegiatan komunitas, musyawarah desa, posyandu, dan acara penting Desa Malakosa.",
    url: "https://www.malakosa.web.id/kalender",
  },
};

export default async function KalenderPage() {
  const events = await prisma.agendaEvent.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 relative overflow-hidden text-[#012d1d]">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-[#a0f4c8]/20 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0e6c4a]/10 rounded-full blur-[150px] translate-x-1/4 translate-y-1/4 opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <Link 
              href="/#agenda"
              className="inline-flex items-center gap-2 text-[#0e6c4a] hover:text-[#012d1d] transition-colors text-sm font-bold font-mono tracking-wider mb-8 uppercase bg-black/5 backdrop-blur-md px-4 py-2 rounded-full border border-black/10"
            >
              <ArrowLeft size={16} weight="bold" />
              <span>Kembali ke Beranda</span>
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#012d1d] to-[#0e6c4a] mb-6 leading-none tracking-tighter drop-shadow-xl">
              Agenda <br className="hidden md:block" />
              Desa.
            </h1>
            <p className="text-xl text-[#414844] max-w-xl leading-relaxed font-sans border-l-2 border-[#0e6c4a] pl-6 font-semibold">
              Pantau seluruh kegiatan, musyawarah, dan acara penting di Desa Malakosa secara real-time.
            </p>
          </div>
          
          <div className="shrink-0 hidden lg:block animate-pulse">
            <div className="w-32 h-32 rounded-full border border-[#0e6c4a]/20 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-[#0e6c4a]/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#a0f4c8]/50 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#0e6c4a]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <CalendarView events={events} />
      </div>
    </main>
  );
}
