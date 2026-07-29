"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VillageCMSData } from "@/lib/cms-store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function StatsTab({ 
  formData, 
  handleStatChange 
}: { 
  formData: VillageCMSData; 
  handleStatChange: (field: keyof VillageCMSData["stats"], value: string | number) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
          Edit Indikator & Statistik Landing Page
        </h3>
        <p className="text-xs text-[#414844]">
          Perubahan pada angka di bawah ini akan secara langsung memperbarui kartu bento di landing page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Population input */}
        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Total Populasi (Jiwa)
          </Label>
          <Input
            type="number"
            value={formData.stats.population}
            onChange={(e: any) => handleStatChange("population", Number(e.target.value))}
            className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
          <p className="text-[11px] text-[#414844]">
            Jumlah seluruh warga terdaftar di Desa Malakosa.
          </p>
        </div>

        {/* Dusun count input */}
        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2 opacity-80">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Jumlah Wilayah Dusun (Otomatis)
          </Label>
          <Input
            type="number"
            value={formData.dusunList?.length || 0}
            disabled
            className="w-full bg-zinc-100 px-4 py-3 rounded-xl border border-zinc-200 font-heading text-lg font-bold text-zinc-500 cursor-not-allowed"
          />
          <p className="text-[11px] text-[#414844]">
            Nilai ini dihitung otomatis berdasarkan jumlah dusun di tab <strong>Daftar Dusun</strong>.
          </p>
        </div>

        {/* KK count input */}
        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Jumlah Kepala Keluarga (KK)
          </Label>
          <Input
            type="number"
            value={formData.stats.kkCount}
            onChange={(e: any) => handleStatChange("kkCount", Number(e.target.value))}
            className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
          <p className="text-[11px] text-[#414844]">
            Total KK yang terdaftar di basis data digital desa.
          </p>
        </div>

        {/* Jumlah Agama slider */}
        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
          <div className="flex justify-between items-center">
            <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
              Jumlah Agama Terdaftar
            </Label>
            <span className="font-heading font-black text-lg text-[#0e6c4a]">
              {formData.stats.connectivityIndex}
            </span>
          </div>
          <Input
            type="range"
            min="1"
            max="6"
            value={formData.stats.connectivityIndex}
            onChange={(e: any) => handleStatChange("connectivityIndex", Number(e.target.value))}
            className="w-full accent-[#0e6c4a] cursor-pointer"
          />
          <p className="text-[11px] text-[#414844]">
            Jumlah agama yang dianut oleh penduduk desa.
          </p>
        </div>

        {/* Agricultural land input */}
        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Luas Lahan Produktif (Hektar)
          </Label>
          <Input
            type="number"
            value={formData.stats.productiveLandArea}
            onChange={(e: any) => handleStatChange("productiveLandArea", Number(e.target.value))}
            className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
          <p className="text-[11px] text-[#414844]">
            Luas area pertanian sawah organik yang dikelola secara digital.
          </p>
        </div>

        {/* Agricultural active % input */}
        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2">
          <div className="flex justify-between items-center">
            <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
              Lahan Produktif Aktif (%)
            </Label>
            <span className="font-heading font-black text-lg text-[#0e6c4a]">
              {formData.stats.productiveActivePercent}%
            </span>
          </div>
          <Input
            type="range"
            min="10"
            max="100"
            value={formData.stats.productiveActivePercent}
            onChange={(e: any) =>
              handleStatChange("productiveActivePercent", Number(e.target.value))
            }
            className="w-full accent-[#0e6c4a] cursor-pointer"
          />
          <p className="text-[11px] text-[#414844]">
            Persentase keterisian dan efektivitas panen lahan aktif.
          </p>
        </div>

        {/* Growth rate text */}
        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-2 md:col-span-2">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Catatan Pertumbuhan (Growth Note)
          </Label>
          <Input
            type="text"
            value={formData.stats.growthRate}
            onChange={(e: any) => handleStatChange("growthRate", e.target.value)}
            className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm font-semibold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
          <p className="text-[11px] text-[#414844]">
            Teks deskripsi pertumbuhan tahunan di kartu populasi utama.
          </p>
        </div>

        {/* Bagan Pengunjung Wisata */}
        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-4 md:col-span-2">
          <h4 className="font-heading font-bold text-sm text-[#012d1d]">
            Bagan Pengunjung Wisata
          </h4>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formData.tourism.map((spot) => ({
                  name: spot.title,
                  pengunjung: spot.visitorCount,
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#414844", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#414844", fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: "#f4f4f5" }}
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Bar dataKey="pengunjung" fill="#0e6c4a" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-[#414844]">
            Grafik ini menampilkan jumlah pengunjung bulanan untuk setiap destinasi wisata.
          </p>
        </div>
      </div>
    </div>
  );
}
