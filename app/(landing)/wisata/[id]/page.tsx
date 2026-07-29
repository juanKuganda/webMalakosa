import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Users, MapPinLine } from "@phosphor-icons/react/dist/ssr";

export const dynamic = "force-dynamic";

export default async function WisataDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const spot = await prisma.tourismSpot.findUnique({
    where: { id: params.id },
  });

  if (!spot) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex flex-col justify-end">
        {spot.imageUrl ? (
          <Image
            src={spot.imageUrl}
            alt={spot.title}
            fill
            priority
            className="absolute inset-0 object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-[#0e6c4a] flex items-center justify-center">
            <span className="text-white/20 text-4xl font-black uppercase tracking-[0.5em]">Malakosa</span>
          </div>
        )}
        
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          {/* Main Title Area */}
          <div className="max-w-4xl">
            <Link 
              href="/#wisata"
              className="inline-flex items-center gap-3 text-white hover:text-[#a0f4c8] transition-colors text-sm font-bold font-mono tracking-widest mb-8 uppercase bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
            >
              <ArrowLeft size={16} weight="bold" />
              <span>Kembali</span>
            </Link>

            <div className="mb-4 inline-block px-4 py-2 bg-[#a0f4c8] text-[#012d1d] text-sm font-black font-mono tracking-widest uppercase rounded-sm transform -skew-x-12">
              <span className="block transform skew-x-12">{spot.category}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
              {spot.title}
            </h1>
            
            <p className="mt-8 text-lg md:text-xl text-white/90 max-w-2xl font-sans leading-relaxed border-l-4 border-[#a0f4c8] pl-6">
              {spot.description}
            </p>
          </div>

          {/* Glassmorphism Info Cards */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl flex items-center gap-6 min-w-[280px]">
              <div className="w-14 h-14 bg-[#a0f4c8] rounded-2xl flex items-center justify-center text-[#012d1d] shadow-[0_0_20px_rgba(160,244,200,0.4)]">
                <Users size={28} weight="fill" />
              </div>
              <div>
                <div className="text-[10px] font-bold font-mono text-white/70 uppercase tracking-[0.2em] mb-1">
                  Total Pengunjung
                </div>
                <div className="text-3xl font-black text-white font-heading">
                  {spot.visitorCount.toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            <div className="bg-[#012d1d]/80 backdrop-blur-xl p-6 rounded-3xl border border-[#a0f4c8]/30 shadow-2xl flex items-center gap-6 min-w-[280px]">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#a0f4c8]">
                <MapPinLine size={28} weight="bold" />
              </div>
              <div>
                <div className="text-[10px] font-bold font-mono text-white/70 uppercase tracking-[0.2em] mb-1">
                  Status Lokasi
                </div>
                <div className="text-xl font-bold text-[#a0f4c8] font-heading uppercase tracking-wider">
                  {spot.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <div className="mx-auto">
          {spot.content ? (
            <div className="text-[#1c1b1b] whitespace-pre-line leading-loose font-serif text-lg md:text-2xl">
              {spot.content}
            </div>
          ) : (
            <p className="text-[#414844] italic text-center text-xl">
              Belum ada deskripsi mendalam untuk mahakarya alam ini.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
