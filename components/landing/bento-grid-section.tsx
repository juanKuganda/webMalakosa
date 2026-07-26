"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, ShieldCheck, SquaresFour, Users, Broadcast, ArrowRight } from "@phosphor-icons/react";
import { useCMSData } from "@/lib/cms-store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BentoGridSection() {
  const { data } = useCMSData();
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // 1. Staggered fade-up animation for all bento cards in grid
    const cards = gsap.utils.toArray(".bento-animate");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  // Dynamic counter and progress animations whenever stats update
  useGSAP(() => {
    const countTarget = data.stats.population;
    const counterObj = { value: 0 };
    const anim = gsap.to(counterObj, {
      value: countTarget,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.floor(counterObj.value).toLocaleString("id-ID");
        }
      },
    });

    if (circleRef.current) {
      const length = circleRef.current.getTotalLength();
      gsap.set(circleRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const activeRatio = Math.min(Math.max(data.stats.agriculturalActivePercent, 0), 100) / 100;
      gsap.to(circleRef.current, {
        strokeDashoffset: length * (1 - activeRatio),
        duration: 1.2,
        ease: "power2.out",
      });
    }

    return () => {
      anim.kill();
    };
  }, { dependencies: [data.stats.population, data.stats.agriculturalActivePercent], scope: containerRef });

  return (
    <section ref={containerRef} className="grid grid-cols-12 gap-6" id="profil">
      {/* Main Vision Card (Large) */}
      <div className="bento-animate col-span-12 lg:col-span-7 bg-primary text-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between min-h-[450px] relative overflow-hidden group">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-8">
            <Eye size={36} className="text-white" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            {data.visionTitle}
          </h2>
          <p className="font-sans text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
            {data.visionDescription}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10 flex items-center gap-3">
            <ShieldCheck size={18} className="text-secondary-fixed" />
            <span className="font-mono text-xs uppercase tracking-wider">Transparansi Digital</span>
          </div>
        </div>
        <div className="absolute -right-16 -bottom-16 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
          <Broadcast size={240} className="text-white" />
        </div>
      </div>

      {/* Population Stat (Tall) */}
      <div className="bento-animate col-span-12 md:col-span-5 lg:col-span-5 bg-secondary-container p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-center items-center text-center border border-secondary/10">
        <span className="font-mono text-xs text-secondary uppercase tracking-[0.3em] mb-6 font-bold">
          Total Populasi
        </span>
        <div
          ref={countRef}
          className="font-heading text-6xl md:text-8xl text-primary font-black tabular-nums mb-4"
        >
          {data.stats.population.toLocaleString("id-ID")}
        </div>
        <div className="font-heading text-lg md:text-xl text-on-secondary-container font-bold">
          Jiwa Terdaftar
        </div>
        <div className="mt-8 w-full bg-secondary/10 h-2 rounded-full overflow-hidden">
          <div className="bg-secondary h-full w-[85%]"></div>
        </div>
        <p className="mt-4 text-xs text-on-secondary-container/70 font-semibold">
          {data.stats.growthRate}
        </p>
      </div>

      {/* Dusun (Small Split) */}
      <div className="bento-animate col-span-12 md:col-span-4 bg-gradient-to-br from-[#0e6c4a] to-[#19724f] text-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between min-h-[220px] relative overflow-hidden shadow-xl shadow-[#0e6c4a]/20 group">
        <div className="relative z-10 flex justify-between items-start">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <SquaresFour size={24} className="text-white" />
          </div>
          <span className="font-heading text-5xl md:text-6xl font-black text-white/90 drop-shadow-md">
            {data.stats.dusunCount}
          </span>
        </div>
        <div className="relative z-10 mt-4">
          <h4 className="font-heading font-extrabold text-xl md:text-2xl text-white">Wilayah Dusun</h4>
          <p className="text-white/80 text-sm mt-2 leading-relaxed">Pembagian administratif desa terintegrasi secara digital.</p>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <SquaresFour size={160} className="text-white" />
        </div>
      </div>

      {/* Kepala Keluarga */}
      <div className="bento-animate col-span-12 md:col-span-4 bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between min-h-[220px] relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-[#0e6c4a]/10 group">
        <div className="relative z-10 flex justify-between items-start">
          <div className="w-12 h-12 bg-[#0e6c4a]/10 rounded-2xl flex items-center justify-center">
            <Users size={24} className="text-[#0e6c4a]" />
          </div>
          <span className="font-heading text-5xl md:text-6xl font-black text-[#0e6c4a] drop-shadow-sm">
            {data.stats.kkCount}
          </span>
        </div>
        <div className="relative z-10 mt-4">
          <h4 className="font-heading font-extrabold text-xl md:text-2xl text-[#012d1d]">Kepala Keluarga</h4>
          <p className="text-[#414844] text-sm mt-2 leading-relaxed">Data kependudukan digital yang terverifikasi dan aman.</p>
        </div>
        <div className="absolute -left-10 -bottom-10 opacity-[0.03] group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
          <Users size={180} className="text-[#0e6c4a]" />
        </div>
      </div>

      {/* Religion Count (Replaces Connectivity Index) */}
      <div className="bento-animate col-span-12 md:col-span-4 bg-[#012d1d] text-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between relative overflow-hidden min-h-[220px] shadow-2xl group border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e6c4a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a0f4c8]/10 border border-[#a0f4c8]/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a0f4c8] animate-pulse"></span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#a0f4c8] font-bold">
                Keberagaman
              </span>
            </div>
            <div className="font-heading text-6xl md:text-7xl font-black text-white mb-2">
              {data.stats.connectivityIndex}
            </div>
          </div>
          <div className="font-heading font-bold text-lg md:text-xl text-[#a0f4c8]">Agama Terdaftar</div>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <Users size={140} className="text-[#a0f4c8]" />
        </div>
      </div>

      {/* Agricultural Land (Wide) */}
      <div className="bento-animate col-span-12 lg:col-span-8 bg-surface-container p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <div className="flex-1">
          <span className="font-mono text-xs text-secondary font-bold uppercase tracking-wider mb-2 block">
            Lahan Produktif
          </span>
          <h3 className="font-heading text-2xl md:text-4xl font-extrabold text-primary mb-4 leading-tight">
            {data.stats.agriculturalLand} Hektar Sawah Organik
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            Seluruh lahan telah dilengkapi dengan sensor kelembaban tanah dan sistem irigasi pintar berbasis IoT.
          </p>
        </div>
        <div className="w-48 h-48 bg-white rounded-[2rem] shadow-inner flex items-center justify-center relative shrink-0">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#f0edec"
              strokeWidth="3"
            />
            <path
              ref={circleRef}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#0e6c4a"
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-primary text-sm">
            {data.stats.agriculturalActivePercent}% Aktif
          </div>
        </div>
      </div>

      {/* Smart Farming CTA (Small) */}
      <div
        id="keunggulan"
        className="bento-animate col-span-12 lg:col-span-4 bg-[#a0f4c8] text-[#012d1d] p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between group cursor-pointer hover:bg-[#86e2b4] transition-colors min-h-[220px] shadow-lg shadow-[#a0f4c8]/30 relative overflow-hidden"
      >
        <div className="relative z-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#0e6c4a] font-bold block mb-4">
            Inovasi Terkini
          </span>
          <h4 className="font-heading text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Revolusi<br />Agrikultur 2.0
          </h4>
        </div>
        <div className="flex justify-between items-end mt-8 relative z-10">
          <p className="text-[#0e6c4a] font-semibold text-sm max-w-[140px] leading-relaxed">
            Eksplorasi sistem pemantauan real-time.
          </p>
          <div className="w-14 h-14 bg-[#012d1d] rounded-2xl flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-300 shrink-0 shadow-xl">
            <ArrowRight size={24} className="text-[#a0f4c8]" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      </div>
    </section>
  );
}
