"use client";

import React from "react";
import { Globe, Envelope, ShareNetwork } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-surface-container mt-24 border-t border-tertiary-fixed/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="font-heading text-2xl font-extrabold text-primary tracking-tighter">
            Malakosa
          </div>
          <p className="text-on-surface-variant font-sans text-sm text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} Desa Malakosa. Modern Village Digital Presence.
            <br />
            Kabupaten Parigi Moutong, Sulawesi Tengah.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm font-semibold"
            href="#"
          >
            Kebijakan Privasi
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm font-semibold"
            href="#"
          >
            Kontak
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm font-semibold"
            href="#"
          >
            Informasi Publik
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-sans text-sm font-semibold"
            href="#"
          >
            Layanan Desa
          </a>
        </div>

        <div className="flex gap-4">
          <a
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white hover:bg-secondary transition-all active:scale-90"
            href="#"
            aria-label="Website"
          >
            <Globe size={20} />
          </a>
          <a
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white hover:bg-secondary transition-all active:scale-90"
            href="#"
            aria-label="Email"
          >
            <Envelope size={20} />
          </a>
          <a
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white hover:bg-secondary transition-all active:scale-90"
            href="#"
            aria-label="Share"
          >
            <ShareNetwork size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
