"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { VillageCMSData } from "@/lib/cms-store";

export function HeroTab({ 
  formData, 
  setFormData 
}: { 
  formData: VillageCMSData; 
  setFormData: React.Dispatch<React.SetStateAction<VillageCMSData>>;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading text-xl font-bold text-[#012d1d] mb-1">
          Konten Utama & Visi Desa
        </h3>
        <p className="text-xs text-[#414844]">
          Sesuaikan teks banner hero dan kartu visi utama di landing page.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Judul Utama Hero (Hero Title)
          </Label>
          <Input
            type="text"
            value={formData.heroTitle}
            onChange={(e: any) =>
              setFormData((prev) => ({ ...prev, heroTitle: e.target.value }))
            }
            className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-extrabold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
        </div>

        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Tagline Subtitle Hero
          </Label>
          <Input
            type="text"
            value={formData.heroTagline}
            onChange={(e: any) =>
              setFormData((prev) => ({ ...prev, heroTagline: e.target.value }))
            }
            className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-mono text-sm font-semibold text-[#0e6c4a] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
        </div>

        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Deskripsi Ringkas Hero
          </Label>
          <Textarea
            rows={3}
            value={formData.heroDescription}
            onChange={(e: any) =>
              setFormData((prev) => ({ ...prev, heroDescription: e.target.value }))
            }
            className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm text-[#1c1b1b] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
        </div>

        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Judul Visi Desa (Bento Grid)
          </Label>
          <Input
            type="text"
            value={formData.visionTitle}
            onChange={(e: any) =>
              setFormData((prev) => ({ ...prev, visionTitle: e.target.value }))
            }
            className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 font-heading text-lg font-bold text-[#012d1d] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
        </div>

        <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-zinc-200 space-y-3">
          <Label className="block text-xs font-bold font-mono text-[#012d1d] uppercase">
            Deskripsi Visi Desa (Bento Grid)
          </Label>
          <Textarea
            rows={3}
            value={formData.visionDescription}
            onChange={(e: any) =>
              setFormData((prev) => ({ ...prev, visionDescription: e.target.value }))
            }
            className="w-full bg-white px-4 py-3 rounded-xl border border-zinc-300 text-sm text-[#1c1b1b] focus:outline-none focus:ring-2 focus:ring-[#0e6c4a]"
          />
        </div>
      </div>
    </div>
  );
}
