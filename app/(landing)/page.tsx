import React from "react";
import HeroSection from "@/components/landing/hero-section";
import BentoGridSection from "@/components/landing/bento-grid-section";
import BeachTourismSection from "@/components/landing/beach-tourism-section";
import AgendaSection from "@/components/landing/agenda-section";
import MapSection from "@/components/landing/map-section";
import TestimoniesSection from "@/components/landing/testimonies-section";

export default function LandingPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-12 space-y-24 overflow-hidden">
      <HeroSection />
      <BentoGridSection />
      <BeachTourismSection />
      <AgendaSection />
      <MapSection />
      <TestimoniesSection />
    </div>
  );
}
