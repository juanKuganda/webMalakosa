"use client";

import React from "react";
import { WhatsappLogo, MapPin, InstagramLogo, FacebookLogo } from "@phosphor-icons/react";
import Link from "next/link";

export default function Footer() {
  const waLink = "https://chat.whatsapp.com/Kc2zeJD7t8W1BlrpQRNOwa";

  return (
    <footer className="relative bg-[#012d1d] text-white overflow-hidden mt-32 rounded-t-[3rem] md:rounded-t-[5rem]">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0e6c4a]/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#a0f4c8]/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-8">
        
        {/* Top Section: CTA & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Huge CTA Area */}
          <div className="lg:col-span-8 flex flex-col items-start gap-8">
            <div className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#a0f4c8]">
              Pusat Informasi
            </div>
            
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
              Terkoneksi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a0f4c8] to-white">
                Bersama Kami.
              </span>
            </h2>
            
            <p className="font-sans text-lg md:text-xl text-white/70 max-w-xl font-medium mt-4">
              Ada pertanyaan, masukan, atau ingin mengetahui lebih lanjut tentang potensi dan layanan Desa Malakosa? Kami siap membantu.
            </p>

            <Link 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer" 
              className="mt-6 flex items-center gap-6 bg-[#a0f4c8] text-[#012d1d] px-8 py-5 rounded-full font-black text-lg md:text-xl uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_10px_30px_rgba(160,244,200,0.3)] group"
            >
              Hubungi Kami
              <div className="w-12 h-12 rounded-full bg-[#012d1d] text-[#a0f4c8] flex items-center justify-center group-hover:rotate-12 transition-transform">
                <WhatsappLogo size={24} weight="fill" />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-4 flex flex-col gap-12 lg:pl-12">
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-sm uppercase tracking-widest text-white/50 mb-2 font-bold">Layanan</h4>
              <Link href={waLink} target="_blank" className="font-sans text-xl md:text-2xl font-bold hover:text-[#a0f4c8] transition-colors w-fit">
                Layanan Desa
              </Link>
              <Link href={waLink} target="_blank" className="font-sans text-xl md:text-2xl font-bold hover:text-[#a0f4c8] transition-colors w-fit">
                Bantuan & Informasi
              </Link>
              <Link href="#" className="font-sans text-xl md:text-2xl font-bold hover:text-[#a0f4c8] transition-colors w-fit">
                Kebijakan Privasi
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-sm uppercase tracking-widest text-white/50 mb-2 font-bold">Jejaring Sosial</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/pemdes_malkosa?igsh=MWZkYmVoczVsY3BrMQ==" className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-[#a0f4c8] hover:text-[#012d1d] flex items-center justify-center transition-all border border-white/10">
                  <InstagramLogo size={28} weight="fill" />
                </a>
                <a href="#" className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-[#a0f4c8] hover:text-[#012d1d] flex items-center justify-center transition-all border border-white/10">
                  <FacebookLogo size={28} weight="fill" />
                </a>
                <a href="https://www.google.com/maps/place/Malakosa,+Kec.+Balinggi,+Kabupaten+Parigi+Moutong,+Sulawesi+Tengah/" className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-[#a0f4c8] hover:text-[#012d1d] flex items-center justify-center transition-all border border-white/10">
                  <MapPin size={28} weight="fill" />
                </a>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Section: Giant Text & Copyright */}
        <div className="flex flex-col items-center border-t border-white/10 pt-12 mt-12 relative">
          <div className="w-full text-center overflow-hidden flex justify-center mb-8">
            <h1 className="font-heading font-black text-[17vw] md:text-[14vw] lg:text-[11rem] xl:text-[12rem] leading-none text-transparent stroke-white uppercase opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default select-none" style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }}>
              MALAKOSA
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 text-white/40 font-mono text-xs uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Desa Malakosa.</p>
            <p>KKN 117 Digital Village Initiative.</p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
