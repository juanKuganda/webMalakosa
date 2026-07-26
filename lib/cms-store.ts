"use client";

import { useState, useEffect } from "react";

export interface VillageStats {
  population: number;
  dusunCount: number;
  kkCount: number;
  connectivityIndex: number;
  agriculturalLand: number;
  agriculturalActivePercent: number;
  growthRate: string;
}

export interface AgendaEvent {
  id: string;
  date: string;
  title: string;
  desc: string;
  location: string;
  borderClass: string;
  tagColor: string;
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
  heroImageUrl: string;
  visionTitle: string;
  visionDescription: string;
  stats: VillageStats;
  agenda: AgendaEvent[];
  tourism: TourismSpot[];
}

export const DEFAULT_CMS_DATA: VillageCMSData = {
  heroTitle: "DESA MALAKOSA",
  heroTagline: "Digital Village Excellence",
  heroDescription:
    "Harmoni Alam dan Tradisi: Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.",
  heroImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAiumhETyJOqy-tu6f72izosxebktepHeRY2qE9gqK6sKGGw_eDBNyb76dEehOR-hLTHyQc0rgjJ3iVwFyaIrtdZ6-Xwrxlyy68EnJ0Xu-RVHG78xMzob9r-x6L5rTK1Z2FLrIW9i0A02MNAtbD34Ycxj2IVh42ptj4rg52XECfb3UfaidzLqc39D0VSFzz35Cvn4BYBf-rr-c2TffETrOOVNEBxESzBSDvNxoLaHv812tx4V2dBwhL2A",
  visionTitle: "Visi Masa Depan Digital",
  visionDescription:
    "Menjadi pionir desa digital di Indonesia Timur yang mengintegrasikan teknologi blockchain untuk transparansi desa dan AI untuk efisiensi agrikultur.",
  stats: {
    population: 1248,
    dusunCount: 5,
    kkCount: 312,
    connectivityIndex: 98,
    agriculturalLand: 42,
    agriculturalActivePercent: 75,
    growthRate: "+2.4% Pertumbuhan Tahun Ini",
  },
  agenda: [],
  tourism: [],
};

// Module level cache to prevent duplicate fetches from multiple components
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
