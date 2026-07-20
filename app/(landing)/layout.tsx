import React from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-16 py-12 space-y-24 overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
