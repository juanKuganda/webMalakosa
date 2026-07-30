"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VillageCMSData, Testimony } from "@/lib/cms-store";
import { Plus, Trash, Star, ChatTeardropText } from "@phosphor-icons/react";

export function TestimonyTab({ 
  formData, 
  setFormData 
}: { 
  formData: VillageCMSData; 
  setFormData: React.Dispatch<React.SetStateAction<VillageCMSData>>;
}) {
  const [newTestimony, setNewTestimony] = useState<Omit<Testimony, "id">>({
    name: "",
    role: "",
    rating: 5,
    text: "",
  });

  const handleAddTestimony = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimony.name || !newTestimony.text) return;

    const item: Testimony = {
      id: "tes-" + Date.now(),
      name: newTestimony.name,
      role: newTestimony.role,
      rating: newTestimony.rating,
      text: newTestimony.text,
    };

    setFormData((prev) => ({
      ...prev,
      testimonies: [item, ...(prev.testimonies || [])],
    }));

    setNewTestimony({ name: "", role: "", rating: 5, text: "" });
  };

  const handleDeleteTestimony = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      testimonies: prev.testimonies.filter((t) => t.id !== id),
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
          Kelola Testimoni
        </h3>
        <p className="text-xs text-[#414844]">
          Tambah, edit, atau hapus ulasan pengunjung (Apa Kata Mereka).
        </p>
      </div>

      {/* Form Tambah Testimoni */}
      <form onSubmit={handleAddTestimony} className="bg-[#f6f3f2] p-6 rounded-3xl border border-zinc-200 space-y-4">
        <h4 className="font-heading font-bold text-sm text-[#012d1d] flex items-center gap-2">
          <Plus size={18} className="text-[#0e6c4a]" /> Tambah Testimoni Baru
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Nama Peninjau"
            value={newTestimony.name}
            onChange={(e: any) => setNewTestimony({ ...newTestimony, name: e.target.value })}
            className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
            required
          />
          <Input
            type="text"
            placeholder="Peran / Asal (misal: Traveler, Jakarta)"
            value={newTestimony.role}
            onChange={(e: any) => setNewTestimony({ ...newTestimony, role: e.target.value })}
            className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
            required
          />
          
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#012d1d] mb-2">Rating (1-5 Bintang)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewTestimony({ ...newTestimony, rating: star })}
                  className={`p-2 rounded-xl border transition-colors ${
                    newTestimony.rating >= star 
                      ? "bg-[#a0f4c8]/30 border-[#0e6c4a]/50 text-[#0e6c4a]" 
                      : "bg-white border-zinc-300 text-zinc-300"
                  }`}
                >
                  <Star weight={newTestimony.rating >= star ? "fill" : "regular"} size={20} />
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <Textarea
              placeholder="Isi testimoni / ulasan..."
              value={newTestimony.text}
              onChange={(e: any) => setNewTestimony({ ...newTestimony, text: e.target.value })}
              className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} />
            <span>Tambah Testimoni</span>
          </button>
        </div>
      </form>

      {/* List Testimoni */}
      <div className="space-y-4">
        <h4 className="font-heading text-sm font-bold text-[#012d1d]">Daftar Testimoni Saat Ini:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(formData.testimonies || []).map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-start gap-4"
            >
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      weight="fill" 
                      className={i < item.rating ? "text-[#0e6c4a]" : "text-zinc-200"} 
                    />
                  ))}
                </div>
                <h5 className="font-heading font-bold text-base text-[#012d1d]">
                  {item.name}
                </h5>
                <p className="text-[11px] font-semibold text-[#0e6c4a]">
                  {item.role}
                </p>
                <div className="flex gap-2 items-start pt-2">
                  <ChatTeardropText size={16} weight="fill" className="text-zinc-300 shrink-0 mt-0.5" />
                  <p className="text-xs text-[#414844] italic leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteTestimony(item.id)}
                className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-xl border border-red-200 transition-colors shrink-0 cursor-pointer"
                title="Hapus Testimoni"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
