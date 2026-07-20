"use client";

import React, { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 backdrop-blur-md bg-surface/80 border-b border-outline/10 z-50 transition-all duration-300">
      <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="font-heading text-2xl font-extrabold text-primary tracking-tighter">
          Malakosa
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="text-primary font-bold border-b-2 border-primary pb-1 font-sans text-sm transition-all"
            href="#"
          >
            Beranda
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm"
            href="#profil"
          >
            Profil
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm"
            href="#keunggulan"
          >
            Keunggulan
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm"
            href="#peta"
          >
            Peta
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-mono text-xs font-semibold active:scale-95 transition-transform hover:bg-primary-container cursor-pointer">
            Hubungi Kami
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary focus:outline-none p-1"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-surface border-b border-outline/10 transition-all duration-300 ease-in-out origin-top overflow-hidden",
          isOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-4 px-6">
          <a
            className="text-primary font-bold font-sans text-sm"
            href="#"
            onClick={() => setIsOpen(false)}
          >
            Beranda
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm"
            href="#profil"
            onClick={() => setIsOpen(false)}
          >
            Profil
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm"
            href="#keunggulan"
            onClick={() => setIsOpen(false)}
          >
            Keunggulan
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm"
            href="#peta"
            onClick={() => setIsOpen(false)}
          >
            Peta
          </a>
          <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-mono text-xs font-semibold w-full text-center">
            Hubungi Kami
          </button>
        </div>
      </div>
    </nav>
  );
}
