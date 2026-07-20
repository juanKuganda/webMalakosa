"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quotes } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    name: "Andi Pratama",
    role: "Digital Nomad, Jakarta",
    rating: 5,
    text: "Kombinasi yang unik antara suasana desa yang tenang dengan fasilitas digital yang sangat modern. Internetnya sangat cepat, cocok untuk digital nomad!",
  },
  {
    name: "Sarah Jenkins",
    role: "Traveler, Australia",
    rating: 5,
    text: "Pantainya luar biasa bersih. Warganya sangat ramah dan terbuka. Pengalaman menginap di homestay digital benar-benar berkesan.",
  },
];

export default function TestimoniesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    ).fromTo(
      gridRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-primary-container rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden"
    >
      {/* Large Quote Watermark background */}
      <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 pointer-events-none text-white">
        <Quotes size={180} weight="fill" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12 relative z-10">
        <h2 ref={titleRef} className="font-heading text-3xl md:text-5xl font-extrabold text-white">
          Apa Kata Mereka?
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 text-left">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex gap-1 text-secondary-fixed">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-secondary-fixed" />
                ))}
              </div>
              <p className="font-sans text-base md:text-lg italic leading-relaxed text-white/90">
                &quot;{t.text}&quot;
              </p>
              <div>
                <p className="font-heading font-bold text-base md:text-lg">{t.name}</p>
                <p className="font-sans text-xs md:text-sm text-white/60">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
