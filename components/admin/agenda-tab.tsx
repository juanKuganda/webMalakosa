"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { VillageCMSData, AgendaEvent } from "@/lib/cms-store";
import { Plus, Trash, CalendarBlank } from "@phosphor-icons/react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AgendaTab({ 
  formData, 
  setFormData 
}: { 
  formData: VillageCMSData; 
  setFormData: React.Dispatch<React.SetStateAction<VillageCMSData>>;
}) {
  const [newAgenda, setNewAgenda] = useState<{
    date: Date | undefined;
    title: string;
    desc: string;
    location: string;
  }>({
    date: undefined,
    title: "",
    desc: "",
    location: "",
  });

  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgenda.title || !newAgenda.date) return;

    const dateString = format(newAgenda.date, "dd MMMM yyyy", { locale: idLocale }).toUpperCase();

    const item: AgendaEvent = {
      id: "ev-" + Date.now(),
      date: dateString,
      title: newAgenda.title,
      desc: newAgenda.desc,
      location: newAgenda.location || "Desa Malakosa",
    };

    setFormData((prev) => ({
      ...prev,
      agenda: [item, ...prev.agenda],
    }));

    setNewAgenda({ date: undefined, title: "", desc: "", location: "" });
  };

  const handleDeleteAgenda = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.filter((a) => a.id !== id),
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
          Kelola Agenda & Kegiatan Desa
        </h3>
        <p className="text-xs text-[#414844]">
          Tambah, edit, atau hapus acara mendatang yang akan ditampilkan di landing page.
        </p>
      </div>

      {/* Form Tambah Agenda */}
      <form onSubmit={handleAddAgenda} className="bg-[#f6f3f2] p-6 rounded-3xl border border-zinc-200 space-y-4">
        <h4 className="font-heading font-bold text-sm text-[#012d1d] flex items-center gap-2">
          <Plus size={18} className="text-[#0e6c4a]" /> Tambah Agenda Baru
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  data-empty={!newAgenda.date}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white px-4 py-3 h-[46px] rounded-xl border border-zinc-300 text-sm hover:bg-zinc-50 data-[empty=true]:text-zinc-500",
                  )}
                />
              }
            >
              <CalendarBlank size={18} className="mr-2 text-[#0e6c4a]" />
              {newAgenda.date ? format(newAgenda.date, "dd MMMM yyyy", { locale: idLocale }).toUpperCase() : <span>Pilih Tanggal</span>}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[999]" align="start">
              <Calendar
                mode="single"
                selected={newAgenda.date}
                onSelect={(date) => setNewAgenda({ ...newAgenda, date })}
              />
            </PopoverContent>
          </Popover>
          <Input
            type="text"
            placeholder="Nama / Judul Kegiatan"
            value={newAgenda.title}
            onChange={(e: any) => setNewAgenda({ ...newAgenda, title: e.target.value })}
            className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
            required
          />
          <div>
            <Input
              type="text"
              list="dusun-options"
              placeholder="Lokasi (Ketik atau Pilih dari dropdown)"
              value={newAgenda.location}
              onChange={(e: any) => setNewAgenda({ ...newAgenda, location: e.target.value })}
              className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
              required
            />
            <datalist id="dusun-options">
              {formData.dusunList?.map((dusun) => (
                <option key={dusun} value={`Dusun ${dusun}`} />
              ))}
            </datalist>
          </div>
          <Input
            type="text"
            placeholder="Deskripsi singkat kegiatan"
            value={newAgenda.desc}
            onChange={(e: any) => setNewAgenda({ ...newAgenda, desc: e.target.value })}
            className="bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0e6c4a] hover:bg-[#19724f] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} />
            <span>Tambah Ke Agenda</span>
          </button>
        </div>
      </form>

      {/* List Agenda */}
      <div className="space-y-4">
        <h4 className="font-heading text-sm font-bold text-[#012d1d]">Daftar Agenda Saat Ini:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.agenda.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-start gap-4"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#0e6c4a]">
                  {item.date}
                </span>
                <h5 className="font-heading font-bold text-base text-[#012d1d]">
                  {item.title}
                </h5>
                <p className="text-xs text-[#414844] leading-relaxed">
                  {item.desc}
                </p>
                <p className="text-[11px] font-semibold text-[#012d1d]/80 pt-1">
                  📍 {item.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteAgenda(item.id)}
                className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-xl border border-red-200 transition-colors shrink-0 cursor-pointer"
                title="Hapus Agenda"
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
