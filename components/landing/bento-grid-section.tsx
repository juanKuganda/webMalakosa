"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, ShieldCheck, SquaresFour, Users, Broadcast, ArrowRight } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BentoGridSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGPathElement>(null);

  useEffect(() => {
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

    // 2. Count up animation for population
    const countTarget = 1248;
    const counterObj = { value: 0 };
    gsap.to(counterObj, {
      value: countTarget,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: countRef.current,
        start: "top 85%",
      },
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.floor(counterObj.value).toLocaleString("id-ID");
        }
      },
    });

    // 3. SVG progress circle animation for agricultural land
    if (circleRef.current) {
      const length = circleRef.current.getTotalLength();
      gsap.set(circleRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Target is 75%, so strokeDashoffset should animate to length * (1 - 0.75)
      gsap.to(circleRef.current, {
        strokeDashoffset: length * (1 - 0.75),
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: circleRef.current,
          start: "top 85%",
        },
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="grid grid-cols-12 gap-6" id="profil">
      {/* Main Vision Card (Large) */}
      <div className="bento-animate col-span-12 lg:col-span-7 bg-primary text-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between min-h-[450px] relative overflow-hidden group">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-8">
            <Eye size={36} className="text-white" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Visi Masa Depan Digital
          </h2>
          <p className="font-sans text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
            Menjadi pionir desa digital di Indonesia Timur yang mengintegrasikan teknologi blockchain untuk transparansi desa dan AI untuk efisiensi agrikultur.
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
          0
        </div>
        <div className="font-heading text-lg md:text-xl text-on-secondary-container font-bold">
          Jiwa Terdaftar
        </div>
        <div className="mt-8 w-full bg-secondary/10 h-2 rounded-full overflow-hidden">
          <div className="bg-secondary h-full w-[85%]"></div>
        </div>
        <p className="mt-4 text-xs text-on-secondary-container/70 font-semibold">
          +2.4% Pertumbuhan Tahun Ini
        </p>
      </div>

      {/* Dusun & Families (Small Split) */}
      <div className="bento-animate col-span-12 md:col-span-4 bg-surface-container-high p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between min-h-[220px]">
        <div className="flex justify-between items-start">
          <SquaresFour size={32} className="text-primary" />
          <span className="font-heading text-3xl font-black text-primary">5</span>
        </div>
        <div>
          <h4 className="font-heading font-bold text-lg md:text-xl text-primary">Wilayah Dusun</h4>
          <p className="text-on-surface-variant text-sm mt-1">Pembagian administratif desa terintegrasi.</p>
        </div>
      </div>

      <div className="bento-animate col-span-12 md:col-span-4 bg-surface-container-highest p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between min-h-[220px]">
        <div className="flex justify-between items-start">
          <Users size={32} className="text-primary" />
          <span className="font-heading text-3xl font-black text-primary">312</span>
        </div>
        <div>
          <h4 className="font-heading font-bold text-lg md:text-xl text-primary">Kepala Keluarga</h4>
          <p className="text-on-surface-variant text-sm mt-1">Data kependudukan digital terverifikasi.</p>
        </div>
      </div>

      {/* Connectivity Index (Modern Metric) */}
      <div className="bento-animate col-span-12 md:col-span-4 bg-primary-container text-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between relative overflow-hidden min-h-[220px]">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary-fixed font-semibold">
              Live Network
            </span>
          </div>
          <div className="font-heading text-4xl font-extrabold mb-1">98%</div>
          <div className="font-sans font-bold text-sm">Indeks Konektivitas</div>
        </div>
        <div className="mt-6 relative z-10">
          <div className="flex gap-1.5 items-end h-10">
            <div className="w-full bg-white/20 h-[40%] rounded-t-sm"></div>
            <div className="w-full bg-white/20 h-[60%] rounded-t-sm"></div>
            <div className="w-full bg-white/20 h-[55%] rounded-t-sm"></div>
            <div className="w-full bg-secondary-fixed h-[95%] rounded-t-sm"></div>
            <div className="w-full bg-white/20 h-[70%] rounded-t-sm"></div>
          </div>
        </div>
        <span className="absolute -right-4 -top-4 text-white/5 pointer-events-none">
          <Broadcast size={110} />
        </span>
      </div>

      {/* Agricultural Land (Wide) */}
      <div className="bento-animate col-span-12 lg:col-span-8 bg-surface-container p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <div className="flex-1">
          <span className="font-mono text-xs text-secondary font-bold uppercase tracking-wider mb-2 block">
            Lahan Produktif
          </span>
          <h3 className="font-heading text-2xl md:text-4xl font-extrabold text-primary mb-4 leading-tight">
            42 Hektar Sawah Organik
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
            75% Aktif
          </div>
        </div>
      </div>

      {/* Smart Farming CTA (Small) */}
      <div
        className="bento-animate col-span-12 lg:col-span-4 bg-secondary text-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between group cursor-pointer hover:bg-primary transition-colors min-h-[220px]"
        id="keunggulan"
      >
        <h4 className="font-heading text-xl md:text-2xl font-bold leading-snug">
          Revolusi Agrikultur 2.0
        </h4>
        <div className="flex justify-between items-end mt-6">
          <p className="text-white/80 text-xs md:text-sm max-w-[160px]">
            Pelajari sistem pemantauan real-time kami.
          </p>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:translate-x-2 transition-transform shrink-0">
            <ArrowRight size={20} className="text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
