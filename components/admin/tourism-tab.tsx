"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { VillageCMSData, TourismSpot } from "@/lib/cms-store";
import { toast } from "sonner";
import { Plus, Trash } from "@phosphor-icons/react";
import Image from "next/image";

export function TourismTab({ 
  formData, 
  setFormData 
}: { 
  formData: VillageCMSData; 
  setFormData: React.Dispatch<React.SetStateAction<VillageCMSData>>;
}) {
  const handleTourismChange = (id: string, field: keyof TourismSpot, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      tourism: prev.tourism.map(t => t.id === id ? { ...t, [field]: value } : t)
    }));
  };

  const handleAddTourism = () => {
    const newSpot: TourismSpot = {
      id: `tourism-${Date.now()}`,
      title: "Destinasi Baru",
      category: "WISATA BAHARI",
      description: "Deskripsi singkat...",
      content: "",
      visitorCount: 0,
      status: "Beroperasi",
    };
    setFormData(prev => ({
      ...prev,
      tourism: [...prev.tourism, newSpot]
    }));
    toast.success("Destinasi wisata baru ditambahkan");
  };

  const handleDeleteTourism = (id: string) => {
    setFormData(prev => ({
      ...prev,
      tourism: prev.tourism.filter(t => t.id !== id)
    }));
    toast.success("Destinasi wisata dihapus");
  };

  const handleUploadImage = async (id: string, file: File) => {
    try {
      toast.loading("Mengunggah gambar...");
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      
      if (!res.ok) throw new Error("Gagal mengunggah");
      
      const data = await res.json();
      if (data.url) {
        handleTourismChange(id, "imageUrl", data.url);
        toast.dismiss();
        toast.success("Gambar berhasil diunggah!");
      }
    } catch {
      toast.dismiss();
      toast.error("Gagal mengunggah gambar");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
            Kelola Destinasi Wisata Bahari & Ekowisata
          </h3>
          <p className="text-xs text-[#414844]">
            Pantau dan update status destinasi ekowisata di Desa Malakosa.
          </p>
        </div>
        <button
          onClick={handleAddTourism}
          className="bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={16} />
          <span>Tambah Destinasi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formData.tourism.map((spot) => (
          <div key={spot.id} className="bg-[#f6f3f2] p-6 rounded-2xl border border-zinc-200 space-y-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={spot.category}
                  onChange={(e: any) => handleTourismChange(spot.id, "category", e.target.value)}
                  className="h-8 w-auto min-w-[100px] font-mono text-[10px] uppercase font-bold text-[#0e6c4a] bg-[#a0f4c8]/40 px-1 py-1 rounded-full border border-[#0e6c4a]/20 focus:outline-none focus:ring-1 focus:ring-[#0e6c4a] text-center"
                />
                <Input
                  type="text"
                  value={spot.status}
                  onChange={(e: any) => handleTourismChange(spot.id, "status", e.target.value)}
                  className="h-8 w-auto min-w-[100px] font-sans text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-1 py-0 rounded-full border border-emerald-300 text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <button
                onClick={() => handleDeleteTourism(spot.id)}
                className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-lg border border-red-200 transition-colors cursor-pointer"
                title="Hapus Destinasi"
              >
                <Trash size={16} />
              </button>
            </div>
            
            <Input
              type="text"
              value={spot.title}
              onChange={(e: any) => handleTourismChange(spot.id, "title", e.target.value)}
              className="w-full bg-white px-3 py-2 rounded-lg border border-zinc-300 font-heading font-bold text-lg text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
            />

            <Textarea
              rows={2}
              value={spot.description}
              onChange={(e: any) => handleTourismChange(spot.id, "description", e.target.value)}
              placeholder="Deskripsi singkat..."
              className="w-full bg-white px-3 py-2 rounded-lg border border-zinc-300 text-xs text-[#414844] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
            />

            <Textarea
              rows={4}
              value={spot.content || ""}
              onChange={(e: any) => handleTourismChange(spot.id, "content", e.target.value)}
              placeholder="Konten detail panjang..."
              className="w-full bg-white px-3 py-2 rounded-lg border border-zinc-300 text-xs text-[#414844] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
            />

            <div className="space-y-2">
              <Label className="text-xs font-bold text-[#012d1d]">Gambar Wisata</Label>
              {spot.imageUrl && (
                <div className="w-full h-32 rounded-lg overflow-hidden border border-zinc-200 mb-2 relative">
                  <Image src={spot.imageUrl} alt={spot.title} fill className="object-cover" />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadImage(spot.id, file);
                }}
                className="w-full text-xs text-[#414844] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0e6c4a] file:text-white hover:file:bg-[#19724f]"
              />
            </div>

            <div className="pt-2 flex justify-between items-center text-xs font-bold text-[#012d1d]">
              <span>Pengunjung Bulan Ini:</span>
              <Input
                type="text"
                inputMode="numeric"
                value={spot.visitorCount !== undefined && spot.visitorCount !== null ? String(spot.visitorCount) : ""}
                onKeyDown={(e) => {
                  if (["-", "+", "e", "E", ".", ","].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onFocus={(e) => e.target.select()}
                onChange={(e: any) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  handleTourismChange(spot.id, "visitorCount", raw === "" ? "" : String(parseInt(raw, 10)));
                }}
                placeholder="0"
                className="w-24 bg-white px-2 py-1 rounded-md border border-zinc-300 font-heading text-base font-black text-[#0e6c4a] text-right focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
