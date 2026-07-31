"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import { useCMSData, formatDateToIndonesian } from "@/lib/cms-store";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const borderColors = ["border-l-primary", "border-l-secondary", "border-l-on-secondary-container"];
const textColors = ["text-primary", "text-secondary", "text-on-secondary-container"];

export default function AgendaSection() {
  const { data } = useCMSData();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (data.agenda && data.agenda.length > 0) {
      // Small timeout to ensure DOM is updated before selecting
      setTimeout(() => {
        const cards = gsap.utils.toArray(".agenda-card");
        if (cards.length > 0) {
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
        }
      }, 0);
    }
  }, { dependencies: [data.agenda], scope: containerRef });

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
        <Link href="/kalender" className="text-primary font-bold flex items-center gap-2 hover:underline cursor-pointer group text-sm md:text-base inline-flex">
          Lihat Kalender Lengkap{" "}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Events Grid */}
      {(!data.agenda || data.agenda.length === 0) ? (
        <div className="py-16 px-8 flex flex-col items-center justify-center text-center bg-surface-container rounded-[2rem] border border-dashed border-primary/20">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CalendarBlank size={32} className="text-primary" />
          </div>
          <h3 className="font-heading text-xl font-bold text-primary mb-2">Belum Ada Agenda</h3>
          <p className="text-on-surface-variant max-w-md text-sm md:text-base">
            Saat ini belum ada agenda atau kegiatan mendatang yang dijadwalkan. Silakan cek kembali nanti.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.agenda.map((event, index) => {
            const borderColor = borderColors[index % borderColors.length];
            const textColor = textColors[index % textColors.length];
            
            return (
              <div
                key={event.id}
                className={`agenda-card bento-card p-8 rounded-[2rem] border-l-8 ${borderColor} flex flex-col justify-between min-h-[260px]`}
              >
                <div>
                  <span className={`font-mono text-xs font-bold ${textColor} uppercase`}>
                    {formatDateToIndonesian(event.date)}
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
            );
          })}
        </div>
      )}
    </section>
  );
}
