"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(sectionRef.current, { opacity: 0, y: 30 });
      gsap.set(imageRef.current, { scale: 1.15 });
      gsap.set(tagRef.current, { opacity: 0, x: -30 });
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(descRef.current, { opacity: 0, y: 30 });

      // Create timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(sectionRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(imageRef.current, { scale: 1, duration: 1.5 }, "-=0.8")
        .to(tagRef.current, { opacity: 1, x: 0, duration: 0.8 }, "-=1")
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[450px] md:h-[650px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-2xl"
    >
      <img
        ref={imageRef}
        alt="Malakosa Landscape"
        className="w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiumhETyJOqy-tu6f72izosxebktepHeRY2qE9gqK6sKGGw_eDBNyb76dEehOR-hLTHyQc0rgjJ3iVwFyaIrtdZ6-Xwrxlyy68EnJ0Xu-RVHG78xMzob9r-x6L5rTK1Z2FLrIW9i0A02MNAtbD34Ycxj2IVh42ptj4rg52XECfb3UfaidzLqc39D0VSFzz35Cvn4BYBf-rr-c2TffETrOOVNEBxESzBSDvNxoLaHv812tx4V2dBwhL2A"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-12">
        <div className="max-w-4xl">
          <span
            ref={tagRef}
            className="bg-secondary-fixed text-on-secondary-fixed px-5 py-2 rounded-full font-mono text-[10px] md:text-xs mb-4 md:mb-6 inline-block uppercase tracking-[0.2em]"
          >
            Digital Village Excellence
          </span>
          <h1
            ref={titleRef}
            className="font-heading text-4xl md:text-7xl text-white font-extrabold mb-4 md:mb-6 leading-none"
          >
            DESA MALAKOSA
          </h1>
          <p
            ref={descRef}
            className="font-sans text-base md:text-lg text-white/90 max-w-2xl leading-relaxed"
          >
            Harmoni Alam dan Tradisi: Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.
          </p>
        </div>
      </div>
    </section>
  );
}
