"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { VillageCMSData, TourismSpot } from "@/lib/cms-store";
import { toast } from "sonner";
import { Plus, Trash, Image as ImageIcon } from "@phosphor-icons/react";
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
      description: "Deskripsi singkat mengenai destinasi...",
      content: "",
      visitorCount: 0,
      status: "Buka Setiap Hari",
    };
    setFormData(prev => ({
      ...prev,
      tourism: [...prev.tourism, newSpot]
    }));
    toast.success("Destinasi wisata baru berhasil ditambahkan!");
  };

  const handleDeleteTourism = (id: string) => {
    setFormData(prev => ({
      ...prev,
      tourism: prev.tourism.filter(t => t.id !== id)
    }));
    toast.success("Destinasi wisata berhasil dihapus.");
  };

  const handleUploadImage = async (id: string, file: File, eventTarget: HTMLInputElement) => {
    // 1. Validasi Tipe File di Client
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "image/avif",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type.toLowerCase())) {
      toast.error(
        "Format file tidak didukung! Harap gunakan format gambar JPG, PNG, WEBP, atau AVIF."
      );
      eventTarget.value = "";
      return;
    }

    // 2. Validasi Ukuran File (Maksimal 5MB)
    const MAX_SIZE_MB = 5;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast.error(
        `Ukuran file terlalu besar (${fileSizeMB} MB)! Maksimal ukuran foto adalah ${MAX_SIZE_MB} MB. Harap kompres foto Anda terlebih dahulu.`
      );
      eventTarget.value = "";
      return;
    }

    // 3. Proses Unggah dengan Feedback Toast
    const toastId = toast.loading("Mengunggah gambar ke cloud storage...");
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      
      const data = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        throw new Error(data.error || `Gagal mengunggah (Status: ${res.status})`);
      }
      
      if (data.url) {
        handleTourismChange(id, "imageUrl", data.url);
        toast.dismiss(toastId);
        toast.success("Gambar destinasi wisata berhasil diperbarui!");
      } else {
        throw new Error("URL gambar tidak ditemukan dari respon server.");
      }
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err?.message || "Gagal mengunggah gambar. Silakan coba kembali.");
    } finally {
      eventTarget.value = "";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
            Kelola Destinasi Wisata Bahari & Ekowisata
          </h3>
          <p className="text-xs text-[#414844]">
            Pantau dan perbarui foto, status, dan deskripsi destinasi wisata di Desa Malakosa.
          </p>
        </div>
        <button
          onClick={handleAddTourism}
          className="bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Destinasi</span>
        </button>
      </div>

      {formData.tourism.length === 0 ? (
        <div className="bg-[#f6f3f2] p-12 rounded-2xl border border-dashed border-zinc-300 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-[#0e6c4a]/10 rounded-full flex items-center justify-center mb-4 text-[#0e6c4a]">
            <ImageIcon size={28} />
          </div>
          <h4 className="font-heading text-base font-bold text-[#012d1d] mb-1">
            Belum Ada Destinasi Wisata
          </h4>
          <p className="text-xs text-[#414844] max-w-md mb-5">
            Database destinasi wisata saat ini kosong. Klik tombol di bawah untuk menambahkan destinasi wisata baru Desa Malakosa.
          </p>
          <button
            onClick={handleAddTourism}
            className="bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={16} weight="bold" />
            <span>Tambah Destinasi Pertama</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.tourism.map((spot) => (
            <div key={spot.id} className="bg-[#f6f3f2] p-6 rounded-2xl border border-zinc-200 space-y-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={spot.category}
                    onChange={(e: any) => handleTourismChange(spot.id, "category", e.target.value)}
                    placeholder="KATEGORI"
                    className="h-8 w-auto min-w-[100px] font-mono text-[10px] uppercase font-bold text-[#0e6c4a] bg-[#a0f4c8]/40 px-2 py-1 rounded-full border border-[#0e6c4a]/20 focus:outline-none focus:ring-1 focus:ring-[#0e6c4a] text-center"
                  />
                  <Input
                    type="text"
                    value={spot.status}
                    onChange={(e: any) => handleTourismChange(spot.id, "status", e.target.value)}
                    placeholder="Status Operasional"
                    className="h-8 w-auto min-w-[100px] font-sans text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0 rounded-full border border-emerald-300 text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
              
              <div className="space-y-1">
                <Label className="text-[11px] font-bold text-[#012d1d]">Nama Destinasi</Label>
                <Input
                  type="text"
                  value={spot.title}
                  onChange={(e: any) => handleTourismChange(spot.id, "title", e.target.value)}
                  placeholder="Contoh: Pantai Malakosa Indah"
                  className="w-full bg-white px-3 py-2 rounded-lg border border-zinc-300 font-heading font-bold text-base text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-bold text-[#012d1d]">Deskripsi Singkat (Ringkasan)</Label>
                <Textarea
                  rows={2}
                  value={spot.description}
                  onChange={(e: any) => handleTourismChange(spot.id, "description", e.target.value)}
                  placeholder="Deskripsi singkat yang tampil di beranda..."
                  className="w-full bg-white px-3 py-2 rounded-lg border border-zinc-300 text-xs text-[#414844] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-bold text-[#012d1d]">Konten Lengkap (Halaman Detail)</Label>
                <Textarea
                  rows={4}
                  value={spot.content || ""}
                  onChange={(e: any) => handleTourismChange(spot.id, "content", e.target.value)}
                  placeholder="Ceritakan keindahan, fasilitas, jam buka, tiket masuk, daya tarik..."
                  className="w-full bg-white px-3 py-2 rounded-lg border border-zinc-300 text-xs text-[#414844] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
                />
              </div>

              <div className="space-y-2 pt-1 border-t border-zinc-200">
                <Label className="text-xs font-bold text-[#012d1d] flex items-center justify-between">
                  <span>Foto Destinasi Wisata</span>
                  <span className="text-[10px] font-normal text-zinc-500">Maks. 5 MB (JPG, PNG, WEBP)</span>
                </Label>
                
                {spot.imageUrl ? (
                  <div className="w-full h-36 rounded-lg overflow-hidden border border-zinc-300 mb-2 relative group bg-zinc-100">
                    <Image 
                      src={spot.imageUrl} 
                      alt={spot.title} 
                      fill 
                      className="object-cover transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full">
                        Ganti Foto di Bawah
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-24 rounded-lg border border-dashed border-zinc-300 flex items-center justify-center text-zinc-400 bg-white/50 text-xs gap-2">
                    <ImageIcon size={20} />
                    <span>Belum ada foto yang diunggah</span>
                  </div>
                )}

                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg,image/avif"
                  onChange={(e: any) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadImage(spot.id, file, e.target);
                  }}
                  className="w-full text-xs text-[#414844] file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0e6c4a] file:text-white hover:file:bg-[#19724f] cursor-pointer"
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
      )}
    </div>
  );
}
