"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { VillageCMSData } from "@/lib/cms-store";
import { toast } from "sonner";
import { MapPin, Plus, Trash } from "@phosphor-icons/react";

export function DusunTab({ 
  formData, 
  setFormData 
}: { 
  formData: VillageCMSData; 
  setFormData: React.Dispatch<React.SetStateAction<VillageCMSData>>;
}) {
  const [newDusun, setNewDusun] = useState("");

  const handleAddDusun = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newDusun.trim().toUpperCase();
    if (!trimmed) return;
    
    const currentList = formData.dusunList || [];
    
    if (currentList.includes(trimmed)) {
      toast.error(`Dusun ${trimmed} sudah ada di daftar!`);
      return;
    }

    const updatedList = [...currentList, trimmed];
    setFormData((prev) => ({
      ...prev,
      dusunList: updatedList,
      stats: {
        ...prev.stats,
        dusunCount: updatedList.length,
      },
    }));
    setNewDusun("");
    toast.success(`Dusun ${trimmed} berhasil ditambahkan.`);
  };

  const handleDeleteDusun = (name: string) => {
    const currentList = formData.dusunList || [];
    const updatedList = currentList.filter((d) => d !== name);
    setFormData((prev) => ({
      ...prev,
      dusunList: updatedList,
      stats: {
        ...prev.stats,
        dusunCount: updatedList.length,
      },
    }));
    toast.success(`Dusun ${name} berhasil dihapus.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
          Kelola Wilayah Dusun Desa Malakosa
        </h3>
        <p className="text-xs text-[#414844]">
          Daftar dusun di bawah ini digunakan untuk pemetaan administratif desa dan penentuan lokasi agenda. Jumlah dusun di Statistik Utama akan ter-update otomatis secara real-time.
        </p>
      </div>

      {/* Form Tambah Dusun */}
      <form onSubmit={handleAddDusun} className="bg-[#f6f3f2] p-6 rounded-3xl border border-zinc-200 space-y-4">
        <h4 className="font-heading font-bold text-sm text-[#012d1d] flex items-center gap-2">
          <Plus size={18} className="text-[#0e6c4a]" /> Tambah Dusun Baru
        </h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Masukkan nama dusun (contoh: Pante)"
              value={newDusun}
              onChange={(e: any) => setNewDusun(e.target.value)}
              className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a] w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus size={16} />
            <span>Tambah Dusun</span>
          </button>
        </div>
      </form>

      {/* List Dusun */}
      <div className="space-y-4">
        <h4 className="font-heading text-sm font-bold text-[#012d1d]">
          Daftar Nama Dusun Saat Ini ({formData.dusunList?.length || 0}):
        </h4>
        {(!formData.dusunList || formData.dusunList.length === 0) ? (
          <div className="text-center py-12 text-zinc-400 bg-[#f6f3f2] rounded-3xl border border-dashed border-zinc-200">
            Belum ada dusun terdaftar. Tambahkan dusun baru di atas.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {formData.dusunList.map((dusun) => (
              <div
                key={dusun}
                className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-center gap-4 group hover:border-[#0e6c4a]/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#a0f4c8]/30 flex items-center justify-center text-[#0e6c4a]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#0e6c4a]">WILAYAH DUSUN</span>
                    <h5 className="font-heading font-bold text-base text-[#012d1d] uppercase">
                      {dusun}
                    </h5>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteDusun(dusun)}
                  className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-xl border border-red-200 transition-colors shrink-0 cursor-pointer"
                  title="Hapus Dusun"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
