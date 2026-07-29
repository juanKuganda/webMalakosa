"use client";
/* eslint-disable react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, react-hooks/set-state-in-effect */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { VillageCMSData, DEFAULT_CMS_DATA } from "@/lib/cms-store";

interface CMSContextType {
  data: VillageCMSData;
  updateData: (d: VillageCMSData) => Promise<void>;
  resetData: () => void;
  loading: boolean;
}

const CMSContext = createContext<CMSContextType | null>(null);

export function CMSProvider({ children, initialData }: { children: ReactNode, initialData?: VillageCMSData }) {
  const [data, setData] = useState<VillageCMSData>(initialData || DEFAULT_CMS_DATA);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      fetch("/api/cms", { cache: "no-store" })
        .then(async (res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return await res.json();
        })
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch CMS data", err);
          setData(DEFAULT_CMS_DATA);
          setLoading(false);
        });
    } else {
      setData(initialData);
      setLoading(false);
    }
  }, [initialData]);

  const updateData = async (newData: VillageCMSData) => {
    setData(newData);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) {
        throw new Error("Failed to save changes to database.");
      }
    } catch (err) {
      console.error("Network error when updating CMS data", err);
      throw err;
    }
  };

  const resetData = () => {
    setData(DEFAULT_CMS_DATA);
  };

  return (
    <CMSContext.Provider value={{ data, updateData, resetData, loading }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMSData() {
  const context = useContext(CMSContext);
  if (!context) {
    return { data: DEFAULT_CMS_DATA, updateData: async () => {}, resetData: () => {}, loading: false };
  }
  return context;
}
