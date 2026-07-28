"use client";

import { useState, useEffect } from "react";

export function formatDateToIndonesian(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // fallback
  const months = [
    "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
    "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
  ];
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export interface VillageStats {
  population: number;
  dusunCount: number;
  kkCount: number;
  connectivityIndex: number;
  productiveLandArea: number;
  productiveActivePercent: number;
  growthRate: string;
}

export interface AgendaEvent {
  id: string;
  date: string;
  title: string;
  desc: string;
  location: string;
}

export interface TourismSpot {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  content?: string;
  visitorCount: number;
  status: string;
}

export interface VillageCMSData {
  heroTitle: string;
  heroTagline: string;
  heroDescription: string;
  visionTitle: string;
  visionDescription: string;
  dusunList: string[];
  stats: VillageStats;
  agenda: AgendaEvent[];
  tourism: TourismSpot[];
}

export const DEFAULT_CMS_DATA: VillageCMSData = {
  heroTitle: "DESA MALAKOSA",
  heroTagline: "Digital Village Excellence",
  heroDescription:
    "Harmoni Alam dan Tradisi: Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.",
  visionTitle: "Visi Masa Depan Digital",
  visionDescription:
    "Menjadi pionir desa digital di Indonesia Timur yang mengintegrasikan teknologi blockchain untuk transparansi desa dan AI untuk efisiensi agrikultur.",
  dusunList: [
    "PANTE", "KAILI JAYA", "SINTUVU", "UNA-UNA", "KALBA",
    "MADURATNA", "INDRA PRASTA", "TAMAN BALI", "TAMASOVO"
  ],
  stats: {
    population: 1248,
    dusunCount: 5,
    kkCount: 312,
    connectivityIndex: 98,
    productiveLandArea: 42,
    productiveActivePercent: 75,
    growthRate: "+2.4% Pertumbuhan Tahun Ini",
  },
  agenda: [],
  tourism: [],
};

let cmsDataPromise: Promise<VillageCMSData> | null = null;
let cachedData: VillageCMSData | null = null;

export function useCMSData() {
  const [data, setData] = useState<VillageCMSData>(cachedData || DEFAULT_CMS_DATA);
  const [loading, setLoading] = useState(!cachedData);

  // Fetch initial data
  useEffect(() => {
    if (cachedData) {
      return; // Already loaded and set in state initialization
    }

    if (!cmsDataPromise) {
      cmsDataPromise = fetch("/api/cms", { cache: "no-store" })
        .then(async (res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          const json = await res.json();
          cachedData = json;
          return json;
        })
        .catch((err) => {
          console.error("Failed to fetch CMS data", err);
          cmsDataPromise = null;
          return DEFAULT_CMS_DATA;
        });
    }

    cmsDataPromise.then((json) => {
      setData(json);
      setLoading(false);
    });
  }, []);

  const updateData = async (newData: VillageCMSData) => {
    // Optimistic update
    setData(newData);
    cachedData = newData;
    
    // Save to DB
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!res.ok) {
        console.error("Failed to update CMS data in DB");
        // Could revert data here if needed
      }
    } catch (err) {
      console.error("Network error when updating CMS data", err);
    }
  };

  const resetData = () => {
    // Only resets local state to default, we might want an API route to reset DB if actually needed
    setData(DEFAULT_CMS_DATA);
  };

  return { data, updateData, resetData, loading };
}
