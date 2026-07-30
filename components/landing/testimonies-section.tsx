"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quotes } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useCMSData } from "@/lib/cms-store";

export default function TestimoniesSection() {
  const { data } = useCMSData();
  const TESTIMONIALS = data.testimonies || [];
  const shouldAnimate = TESTIMONIALS.length > 2;

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
      scrollRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="bg-primary-container rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden"
    >
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>

      {/* Large Quote Watermark background */}
      <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 pointer-events-none text-white">
        <Quotes size={180} weight="fill" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12 relative z-10">
        <h2 ref={titleRef} className="font-heading text-3xl md:text-5xl font-extrabold text-white">
          Apa Kata Mereka?
        </h2>

        <div 
          ref={scrollRef} 
          className={`relative w-full ${shouldAnimate ? "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" : ""}`}
        >
          <div className={`flex ${shouldAnimate ? "w-max hover:[&>div]:[animation-play-state:paused]" : "justify-center flex-wrap gap-6 md:gap-10"}`}>
            {/* First Set */}
            <div className={`flex gap-6 md:gap-10 ${shouldAnimate ? "pr-6 md:pr-10 animate-scroll" : ""}`}>
              {TESTIMONIALS.length > 0 ? TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="w-[85vw] md:w-[400px] shrink-0 text-left space-y-4 cursor-pointer">
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
              )) : (
                <div className="text-white/60 text-center w-full min-w-[300px] italic py-8 pr-10">
                  Belum ada testimoni.
                </div>
              )}
            </div>
            {/* Second Set (Duplicate for seamless loop) */}
            {shouldAnimate && (
              <div className="flex gap-6 md:gap-10 pr-6 md:pr-10 animate-scroll" aria-hidden="true">
                {TESTIMONIALS.length > 0 ? TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="w-[85vw] md:w-[400px] shrink-0 text-left space-y-4 cursor-pointer">
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
                )) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
