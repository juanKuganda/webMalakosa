import React from "react";
import HeroSection from "@/components/landing/hero-section";
import BentoGridSection from "@/components/landing/bento-grid-section";
import BeachTourismSection from "@/components/landing/beach-tourism-section";
import AgendaSection from "@/components/landing/agenda-section";
import TestimoniesSection from "@/components/landing/testimonies-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <BentoGridSection />
      <BeachTourismSection />
      <AgendaSection />
      <TestimoniesSection />
    </>
  );
}
