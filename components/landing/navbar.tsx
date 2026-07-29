"use client";

import React, { useState, useEffect } from "react";
import CardNav from "@/components/ui/card-nav";
import Link from "next/link";

const items = [
  {
    label: "Jelajah",
    bgColor: "#f8f9fa",
    textColor: "#012d1d",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Profil Desa", href: "/#profil" },
      { label: "Keunggulan", href: "/#keunggulan" },
      { label: "Peta Digital", href: "/#peta" }
    ]
  },
  {
    label: "Destinasi", 
    bgColor: "#e9f9f0",
    textColor: "#0e6c4a",
    links: [
      { label: "Wisata Bahari", href: "/#wisata" },
      { label: "Agenda & Acara", href: "/#agenda" }
    ]
  },
  {
    label: "Layanan",
    bgColor: "#012d1d", 
    textColor: "#fff",
    links: [
      { label: "Layanan Desa", href: "https://chat.whatsapp.com/BDlBLxySwjT3xSpMC6HUVn" },
      { label: "Hubungi Kami", href: "https://chat.whatsapp.com/BDlBLxySwjT3xSpMC6HUVn" }
    ]
  }
];

const logoNode = (
  <Link href="/" className="font-heading text-2xl font-black tracking-tighter text-[#012d1d] cursor-pointer hover:opacity-80 transition-opacity">
    MALAKOSA
  </Link>
);

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 50) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-[150px]"
      }`}
    >
      <CardNav
        logo={logoNode}
        logoAlt="Malakosa Logo"
        items={items}
        baseColor="#ffffff"
        menuColor="#012d1d"
        buttonBgColor="#0e6c4a"
        buttonTextColor="#ffffff"
        buttonText="Hubungi Kami"
        forceClose={!isVisible}
        onCtaClick={() => window.open("https://chat.whatsapp.com/BDlBLxySwjT3xSpMC6HUVn", "_blank")}
        ease="power4.out"
      />
    </div>
  );
}
