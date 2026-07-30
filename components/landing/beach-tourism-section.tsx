"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, CaretLeft, CaretRight, MapPinLine, Users } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useCMSData } from "@/lib/cms-store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeachTourismSection() {
  const { data } = useCMSData();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLImageElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const spots = data.tourism || [];
  const activeSpot = spots[activeIndex];

  useGSAP(() => {
    // Entrance animations triggered on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    ).fromTo(
      imageContainerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
      "-=0.8"
    );

    // Parallax effect on image
    gsap.to(parallaxRef.current, {
      y: 100, // Move image down slightly as user scrolls down for parallax
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  useEffect(() => {
    // Simple fade animation when changing slides
    gsap.fromTo(
      ".slide-content",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeIndex]);

  const nextSlide = () => {
    if (spots.length > 0) {
      setActiveIndex((prev) => (prev + 1) % spots.length);
    }
  };

  const prevSlide = () => {
    if (spots.length > 0) {
      setActiveIndex((prev) => (prev - 1 + spots.length) % spots.length);
    }
  };

  if (!spots.length) {
    return (
      <section className="relative w-full max-w-7xl mx-auto py-24 md:py-32" id="wisata">
        {/* Huge Outline Text Background */}
        <div className="absolute top-12 left-0 w-full overflow-hidden leading-none pointer-events-none select-none z-0 opacity-[0.03]">
          <h2 className="font-heading font-black text-[12vw] whitespace-nowrap text-transparent stroke-black uppercase" style={{ WebkitTextStroke: "2px #012d1d" }}>
            JEJAK SEJARAH
          </h2>
        </div>
        <div className="relative z-10 px-6 lg:px-0 py-16 flex flex-col items-center justify-center min-h-[400px] bg-surface-container rounded-[3rem] border border-dashed border-primary/20 mx-6 lg:mx-0 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <MapPinLine size={40} className="text-primary" />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">Belum Ada Catatan Sejarah</h3>
          <p className="text-on-surface-variant max-w-lg text-sm md:text-base">
            Saat ini data sejarah belum tersedia. Kami sedang menyiapkan informasi sejarah Desa Malakosa untuk Anda ketahui.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto py-24 md:py-32"
      id="wisata"
    >
      {/* Huge Outline Text Background */}
      <div className="absolute top-12 left-0 w-full overflow-hidden leading-none pointer-events-none select-none z-0 opacity-[0.03]">
        <h2 className="font-heading font-black text-[12vw] whitespace-nowrap text-transparent stroke-black uppercase" style={{ WebkitTextStroke: "2px #012d1d" }}>
          JEJAK SEJARAH
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 px-6 lg:px-0">
        
        {/* Text Section (Overlapping) */}
        <div ref={textRef} className="lg:col-span-5 lg:col-start-1 lg:row-start-1 z-20 space-y-8 lg:-mr-20 mt-10 lg:mt-0 order-2 lg:order-1 slide-content">
          <div className="inline-block px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full shadow-sm">
            <span className="text-secondary font-mono text-xs uppercase tracking-[0.3em] font-bold block">
              {activeSpot.category}
            </span>
          </div>
          
          <h2 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-black text-primary leading-[0.9] tracking-tighter drop-shadow-2xl uppercase">
            {activeSpot.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word} {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h2>
          
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a0f4c8]/20 rounded-full blur-3xl" />
            <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed relative z-10">
              {activeSpot.description}
            </p>
            
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="flex flex-col gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#0e6c4a] flex items-center justify-center text-white shadow-lg shadow-[#0e6c4a]/30 transform -rotate-3 hover:rotate-0 transition-transform">
                  <Users size={28} weight="bold" />
                </div>
                <h4 className="font-heading font-black text-primary mt-1 text-sm md:text-base">Tahun</h4>
                <p className="text-xl font-bold font-mono text-[#012d1d]">{activeSpot.visitorCount.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#a0f4c8] flex items-center justify-center text-[#012d1d] shadow-lg shadow-[#a0f4c8]/30 transform rotate-3 hover:rotate-0 transition-transform">
                  <MapPinLine size={28} weight="bold" />
                </div>
                <h4 className="font-heading font-black text-primary mt-1 text-sm md:text-base">Status</h4>
                <p className="text-sm font-bold font-mono text-[#012d1d] uppercase tracking-wider">{activeSpot.status}</p>
              </div>
            </div>
            
            <div className="relative z-10 pt-4">
              <Link 
                href={`/wisata/${activeSpot.id}`} 
                className="bg-[#012d1d] text-white w-full py-5 rounded-2xl font-black text-sm hover:bg-[#0e6c4a] hover:-translate-y-1 transition-all shadow-xl shadow-[#012d1d]/20 flex items-center justify-center tracking-widest uppercase"
              >
                Eksplorasi Sejarah
              </Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div ref={imageContainerRef} className="lg:col-span-8 lg:col-start-5 lg:row-start-1 relative z-10 w-full h-[400px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl order-1 lg:order-2 slide-content bg-zinc-100">
          <div className="absolute inset-0 bg-gradient-to-t from-[#012d1d]/60 via-transparent to-transparent z-10 pointer-events-none" />
          {activeSpot.imageUrl ? (
            <Image
              ref={parallaxRef}
              alt={activeSpot.title}
              className="absolute -top-[15%] left-0 w-full h-[130%] object-cover transition-opacity duration-500"
              src={activeSpot.imageUrl}
              width={1200}
              height={800}
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0e6c4a]">
              <span className="text-white/20 text-4xl font-black tracking-widest uppercase">No Image</span>
            </div>
          )}
          
          <div className="absolute bottom-8 right-8 z-20 bg-[#012d1d]/70 backdrop-blur-md p-6 rounded-3xl border border-white/20 max-w-[260px] text-white hidden md:block">
            <p className="font-mono text-[10px] text-[#a0f4c8] font-bold mb-2 uppercase tracking-widest">
              Fakta Sejarah
            </p>
            <div className="flex gap-1.5 mb-3">
              <Star size={18} weight="fill" className="text-yellow-400 drop-shadow-md" />
              <Star size={18} weight="fill" className="text-yellow-400 drop-shadow-md" />
              <Star size={18} weight="fill" className="text-yellow-400 drop-shadow-md" />
              <Star size={18} weight="fill" className="text-yellow-400 drop-shadow-md" />
              <Star size={18} weight="fill" className="text-yellow-400 drop-shadow-md" />
            </div>
            <p className="text-xs text-white/90 italic leading-relaxed font-sans font-semibold">
              &quot;Satu babak penting yang membentuk identitas peradaban masyarakat di masa kini.&quot;
            </p>
          </div>
          
          {/* Huge Easy-to-click Navigation Buttons */}
          {spots.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 z-30 pointer-events-none lg:translate-x-0 lg:left-52">
              <button 
                onClick={prevSlide} 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-md text-[#012d1d] flex items-center justify-center hover:bg-[#a0f4c8] hover:scale-110 transition-all shadow-xl pointer-events-auto border border-white/40"
              >
                <CaretLeft size={28} weight="bold" />
              </button>
              <button 
                onClick={nextSlide} 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#012d1d]/90 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#0e6c4a] hover:scale-110 transition-all shadow-xl pointer-events-auto border border-white/20"
              >
                <CaretRight size={28} weight="bold" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
