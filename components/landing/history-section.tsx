"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CastleTurret, Users, Tree } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HISTORY_DATA = [
  {
    id: "sjr-1",
    year: "1516 - 1593",
    title: "Era Raja Pue Pilingi",
    category: "Magau Pertama",
    description: "Pue Pilingi adalah pendiri pertahanan dan Magau (Raja) pertama Kerajaan Balinggi. Beliau berasal dari daerah Matambatu beserta seluruh keluarganya, memimpin dengan kearifan lokal yang kuat.",
    icon: CastleTurret,
  },
  {
    id: "sjr-2",
    year: "Abad ke-16",
    title: "Asal Usul Pohon Balinggi",
    category: "Simbol Leluhur",
    description: "Nama Balinggi bermula dari sebuah pohon raksasa dengan akar yang menjulang tinggi di sebelah barat gunung. Pohon ini menjadi tonggak penamaan dan saksi bisu peradaban awal desa.",
    icon: Tree,
  },
  {
    id: "sjr-3",
    year: "1918 - 1944",
    title: "Kepemimpinan Koroma",
    category: "Kepala Kampung Pertama",
    description: "Sebagai penerus raja terakhir (Pue Siombinanga), Koroma menjabat sebagai Kepala Kampung Malakosa pertama. Di eranya, Malakosa berkembang menjadi pusat keturunan terbesar Kerajaan Balinggi.",
    icon: Users,
  }
];

export default function HistorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
    });

    tl.fromTo(
      ".history-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(
      ".timeline-line",
      { height: 0 },
      { height: "100%", duration: 1.5, ease: "power1.inOut" },
      "-=0.4"
    )
    .fromTo(
      ".timeline-item",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.4, ease: "back.out(1.2)" },
      "-=1"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="sejarah" className="py-24 md:py-32 w-full bg-surface relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23012d1d\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 history-header">
          <span className="text-[#0e6c4a] font-mono text-sm uppercase tracking-[0.3em] font-bold mb-4 block">
            Jejak Masa Lalu
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-primary uppercase">
            Garis Waktu Malakosa
          </h2>
          <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
            Mengenang perjalanan panjang pembentukan identitas Desa Malakosa, dari era Kerajaan Balinggi hingga berdirinya pemerintahan desa modern.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-primary/10 rounded-full transform md:-translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-24 pt-4">
            {HISTORY_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;
              return (
                <div key={item.id} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot & Icon */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-[#012d1d] text-[#a0f4c8] border-4 border-surface shadow-xl z-10">
                    <Icon size={28} weight="duotone" />
                  </div>

                  {/* Content Box */}
                  <div className={`ml-24 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className={`bg-white p-8 rounded-3xl shadow-xl border border-primary/5 hover:-translate-y-2 transition-transform duration-300 relative group overflow-hidden ${isEven ? 'md:rounded-tr-none' : 'md:rounded-tl-none'}`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#a0f4c8] opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity"></div>
                      
                      <span className="inline-block px-3 py-1 bg-primary/5 text-[#0e6c4a] text-xs font-bold font-mono rounded-full mb-4">
                        {item.year}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm font-semibold text-primary/60 uppercase tracking-widest mb-4">
                        {item.category}
                      </p>
                      <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
