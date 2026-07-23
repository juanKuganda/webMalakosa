"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Waves, Sun, Star } from "@phosphor-icons/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeachTourismSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

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
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    ).fromTo(
      imageContainerRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.8"
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      id="wisata"
    >
      {/* Text Section */}
      <div ref={textRef} className="space-y-6 md:space-y-8">
        <span className="text-secondary font-mono text-xs uppercase tracking-[0.3em] font-bold block">
          Permata Sulawesi Tengah
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-primary leading-tight">
          Wisata Pantai Malakosa
        </h2>
        <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed">
          Nikmati kemurnian alam di pesisir Malakosa. Pasir putih yang selembut sutra dipadukan dengan air laut kristal berwarna biru toska, menawarkan pelarian sempurna dari hiruk-pikuk perkotaan. Ekosistem terumbu karang yang terjaga menjadikannya surga bagi pecinta snorkeling dan diving.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Waves size={24} className="text-secondary" />
            </div>
            <h4 className="font-heading font-bold text-primary mt-1">Air Kristal</h4>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Kejernihan air yang luar biasa hingga dasar laut.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Sun size={24} className="text-secondary" />
            </div>
            <h4 className="font-heading font-bold text-primary mt-1">Pasir Putih</h4>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Garis pantai murni yang dikelola secara organik.
            </p>
          </div>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-primary-container transition-all shadow-xl shadow-primary/10 cursor-pointer">
          Eksplorasi Pantai
        </button>
      </div>

      {/* Image Section */}
      <div ref={imageContainerRef} className="relative group">
        <div className="absolute -inset-4 bg-secondary/10 rounded-[2rem] md:rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
        <Image
          alt="Wisata Pantai Malakosa"
          className="relative rounded-[2rem] md:rounded-[2.5rem] w-full h-[400px] md:h-[600px] object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWIsgNWbz4kplrATgyN0RA-4puc2tS5drM4JyecVD60tnubBbBPOKxMsgwPlF8reCjOy8YQ9zvzcAe52CLCBp8UnthdvqhizDaPNoFQyMRDKJSyy6iQFwb0fNo1iTtM3dKhmiCCLPZOi6DiB8UusOitnv7BAvZGghLx6_0Ua8KCDpkxDDlGmC-mrTcGr3JEV_4rm1ikgcW5tKoaFTbKGJ2tciiu8pE5p__02_G3nkYvjgPz1nMRLQ2OQ"
          width={800}
          height={600}
        />
        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-lg border border-white/20 max-w-[200px]">
          <p className="font-mono text-[10px] text-secondary font-bold mb-1 uppercase tracking-wider">
            Peringkat Destinasi
          </p>
          <div className="flex gap-1 mb-2">
            <Star size={16} weight="fill" className="text-yellow-500" />
            <Star size={16} weight="fill" className="text-yellow-500" />
            <Star size={16} weight="fill" className="text-yellow-500" />
            <Star size={16} weight="fill" className="text-yellow-500" />
            <Star size={16} weight="fill" className="text-yellow-500" />
          </div>
          <p className="text-[11px] text-on-surface-variant italic leading-relaxed">
            &quot;Pantai paling jernih yang pernah saya kunjungi di Sulteng.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
