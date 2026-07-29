"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animations triggered on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    ).fromTo(
      mapContainerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="space-y-10" id="peta">
      {/* Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-secondary font-mono text-xs uppercase tracking-[0.3em] font-bold block mb-2">
            Lokasi Kami
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-3">
            Peta Desa Malakosa
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl">
            Kunjungi dan temukan keindahan tersembunyi dari Desa Malakosa. Terletak strategis di Kecamatan Balinggi, Kabupaten Parigi Moutong, Sulawesi Tengah.
          </p>
        </div>
        <a 
          href="https://www.google.com/maps/place/Malakosa,+Kec.+Balinggi,+Kabupaten+Parigi+Moutong,+Sulawesi+Tengah/" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-container transition-all shadow-xl shadow-primary/10 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <MapPin size={20} />
          <span>Buka di Google Maps</span>
        </a>
      </div>

      <div ref={mapContainerRef} className="relative w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-surface-variant p-2 md:p-4 border border-outline-variant/30">
        <div className="absolute inset-0 z-10 hidden md:block"></div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38438.22237499244!2d120.38508940399984!3d-0.9548560284305658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d894eef42d5ec9d%3A0xb35db3cea04eb2b9!2sMalakosa%2C%20Kec.%20Balinggi%2C%20Kabupaten%20Parigi%20Moutong%2C%20Sulawesi%20Tengah!5e1!3m2!1sid!2sid!4v1784981115578!5m2!1sid!2sid"
          className="w-full h-[400px] md:h-[500px] rounded-2xl md:rounded-[2rem] border-0 bg-white pointer-events-none"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
