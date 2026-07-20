"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EVENTS = [
  {
    date: "15 MEI 2024",
    title: "Festival Panen Raya",
    desc: "Syukuran hasil bumi dengan pameran teknologi pertanian terbaru desa.",
    location: "Balai Desa Malakosa",
    borderClass: "border-l-secondary",
    tagColor: "text-secondary",
  },
  {
    date: "22 JUNI 2024",
    title: "Workshop Coding Remaja",
    desc: "Pelatihan pengembangan aplikasi mobile untuk anak muda desa.",
    location: "Digital Hub Malakosa",
    borderClass: "border-l-primary",
    tagColor: "text-primary",
  },
  {
    date: "05 JULI 2024",
    title: "Malakosa Eco-Beach Day",
    desc: "Aksi bersih pantai dan penanaman mangrove bersama wisatawan.",
    location: "Pesisir Barat Pantai",
    borderClass: "border-l-on-secondary-container",
    tagColor: "text-on-secondary-container",
  },
];

export default function AgendaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".agenda-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="space-y-12" id="agenda">
      {/* Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-3">
            Agenda Desa Mendatang
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant">
            Ikuti berbagai kegiatan komunitas dan festival digital kami.
          </p>
        </div>
        <button className="text-primary font-bold flex items-center gap-2 hover:underline cursor-pointer group text-sm md:text-base">
          Lihat Kalender Lengkap{" "}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {EVENTS.map((event, index) => (
          <div
            key={index}
            className={`agenda-card bento-card p-8 rounded-[2rem] border-l-8 ${event.borderClass} flex flex-col justify-between min-h-[260px]`}
          >
            <div>
              <span className={`font-mono text-xs font-bold ${event.tagColor}`}>
                {event.date}
              </span>
              <h4 className="font-heading text-xl md:text-2xl font-bold mt-4 mb-3 text-primary">
                {event.title}
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {event.desc}
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs md:text-sm mt-auto">
              <MapPin size={16} />
              <span>{event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
