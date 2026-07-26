"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCMSData } from "@/lib/cms-store";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export default function HeroSection() {
  const { data } = useCMSData();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      // Entrance animations
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(imageRef.current, 
        { scale: 1.1, opacity: 0, x: 100 },
        { scale: 1, opacity: 1, x: 0, duration: 1.5 }
      )
      .fromTo(outlineRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.03, scale: 1, duration: 2 },
        "-=1.5"
      )
      .fromTo(cardRef.current,
        { opacity: 0, y: 100, rotate: -2 },
        { opacity: 1, y: 0, rotate: 0, duration: 1.2 },
        "-=1"
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[75vh] flex items-center justify-center mt-8 md:mt-12"
    >
      {/* Huge Background Outline Text */}
      <div ref={outlineRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <h1 className="font-heading font-black text-[25vw] md:text-[20vw] whitespace-nowrap text-transparent stroke-black uppercase" style={{ WebkitTextStroke: "4px #012d1d" }}>
          {data.heroTitle}
        </h1>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-center relative z-10 px-4 md:px-0">
        
        {/* Right Side Image */}
        <div className="lg:col-span-8 lg:col-start-5 lg:row-start-1 relative h-[50vh] md:h-[60vh] lg:h-[75vh] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl order-1 lg:order-2 group">
          <div className="absolute inset-0 bg-[#0e6c4a]/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
          <Image
            ref={imageRef}
            alt="Malakosa Landscape"
            className="absolute inset-0 w-full h-full object-cover"
            src={data.heroImageUrl}
            width={1920}
            height={1080}
            priority
          />
        </div>

        {/* Left Side Glass Card */}
        <div ref={cardRef} className="lg:col-span-6 lg:col-start-1 lg:row-start-1 z-20 order-2 lg:order-1 -mt-16 md:-mt-24 lg:mt-0 relative">
          <div className="bg-white/85 backdrop-blur-2xl p-6 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/50 shadow-[0_20px_50px_rgba(1,45,29,0.1)] relative">
            
            {/* Background Blur constrained to card bounds */}
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#a0f4c8]/40 blur-[80px] rounded-full pointer-events-none" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-block px-4 md:px-5 py-2 bg-[#a0f4c8] text-[#012d1d] rounded-full font-mono text-[10px] md:text-xs mb-4 md:mb-6 uppercase tracking-[0.2em] font-black shadow-sm transform -skew-x-12">
                <span className="block transform skew-x-12">{data.heroTagline}</span>
              </div>
              
              <h1
                ref={titleRef}
                className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-[#012d1d] leading-[0.85] md:leading-[0.9] tracking-tighter uppercase mb-6 md:mb-8"
              >
                {data.heroTitle.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    <span className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#012d1d] to-[#0e6c4a]" : ""}>
                      {word}
                    </span>
                    {i !== data.heroTitle.split(' ').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              
              <p className="font-sans text-base md:text-lg lg:text-xl text-[#414844] font-semibold leading-relaxed mb-8 md:mb-10 max-w-lg">
                {data.heroDescription}
              </p>
              
              <Link 
                href="#wisata" 
                className="group flex items-center justify-between bg-[#012d1d] text-white p-2 pr-6 rounded-full font-black text-sm hover:bg-[#0e6c4a] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-fit"
              >
                <div className="w-12 h-12 rounded-full bg-[#a0f4c8] text-[#012d1d] flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                  <ArrowRight size={20} weight="bold" />
                </div>
                <span className="uppercase tracking-widest">Eksplorasi Desa</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
