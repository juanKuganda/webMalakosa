/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { AgendaEvent, TourismSpot, Testimony } from "@/lib/cms-store";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const settings = await prisma.cmsSettings.findFirst();
    const agenda = await prisma.agendaEvent.findMany({ orderBy: { createdAt: 'desc' } });
    const tourism = await prisma.tourismSpot.findMany({ orderBy: { createdAt: 'desc' } });
    const testimonies = await prisma.testimony.findMany({ orderBy: { createdAt: 'desc' } });

    if (!settings) {
       return NextResponse.json({
         heroTitle: "DESA MALAKOSA", heroTagline: "Digital Village Excellence", heroDescription: "Harmoni Alam dan Tradisi: Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.", visionTitle: "Visi Masa Depan Digital", visionDescription: "Menjadi pionir desa digital di Indonesia Timur yang mengintegrasikan teknologi blockchain untuk transparansi desa dan AI untuk efisiensi agrikultur.", dusunList: ["PANTE", "KAILI JAYA", "SINTUVU", "UNA-UNA", "KALBA", "MADURATNA", "INDRA PRASTA", "TAMAN BALI", "TAMASOVO"],
         stats: { population: 1248, dusunCount: 5, kkCount: 312, connectivityIndex: 98, productiveLandArea: 42, productiveActivePercent: 75, growthRate: "+2.4% Pertumbuhan Tahun Ini" },
         agenda, tourism, testimonies
       });
    }

    let dusunList: string[] = [];
    try {
      dusunList = JSON.parse(settings.dusunList || "[]");
    } catch (e) {
      dusunList = [];
    }

    const data = {
      ...settings,
      dusunList,
      stats: {
        population: settings.population,
        dusunCount: settings.dusunCount,
        kkCount: settings.kkCount,
        connectivityIndex: settings.connectivityIndex,
        productiveLandArea: settings.productiveLandArea,
        productiveActivePercent: settings.productiveActivePercent,
        growthRate: settings.growthRate,
      },
      agenda,
      tourism,
      testimonies,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET CMS Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const currentSettings = await prisma.cmsSettings.findFirst();

    await prisma.$transaction(async (tx) => {
      // Update or create settings
      const settingsData = {
        heroTitle: data.heroTitle || "",
        heroTagline: data.heroTagline || "",
        heroDescription: data.heroDescription || "",
        visionTitle: data.visionTitle || "",
        visionDescription: data.visionDescription || "",
        dusunList: JSON.stringify(data.dusunList || []),
        population: data.stats?.population || 0,
        dusunCount: data.stats?.dusunCount || 0,
        kkCount: data.stats?.kkCount || 0,
        connectivityIndex: data.stats?.connectivityIndex || 0,
        productiveLandArea: data.stats?.productiveLandArea || 0,
        productiveActivePercent: data.stats?.productiveActivePercent || 0,
        growthRate: data.stats?.growthRate || "",
      };

      if (currentSettings) {
        await tx.cmsSettings.update({
          where: { id: currentSettings.id },
          data: settingsData,
        });
      } else {
        await tx.cmsSettings.create({
          data: settingsData,
        });
      }

      // Handle agenda updates efficiently
      const existingAgendas = await tx.agendaEvent.findMany({ select: { id: true } });
      const incomingAgendaIds = (data.agenda || []).map((a: AgendaEvent) => a.id).filter(Boolean);
      
      const agendasToDelete = existingAgendas.filter(a => !incomingAgendaIds.includes(a.id));
      if (agendasToDelete.length > 0) {
        await tx.agendaEvent.deleteMany({ where: { id: { in: agendasToDelete.map(a => a.id) } } });
      }

      for (const a of (data.agenda || [])) {
        if (a.id) {
          await tx.agendaEvent.upsert({
            where: { id: a.id },
            update: { date: a.date, title: a.title, desc: a.desc, location: a.location },
            create: { id: a.id, date: a.date, title: a.title, desc: a.desc, location: a.location },
          });
        }
      }

      // Handle tourism updates efficiently
      const existingTourism = await tx.tourismSpot.findMany({ select: { id: true } });
      const incomingTourismIds = (data.tourism || []).map((t: TourismSpot) => t.id).filter(Boolean);
      
      const tourismToDelete = existingTourism.filter(t => !incomingTourismIds.includes(t.id));
      if (tourismToDelete.length > 0) {
        await tx.tourismSpot.deleteMany({ where: { id: { in: tourismToDelete.map(t => t.id) } } });
      }

      for (const t of (data.tourism || [])) {
        if (t.id) {
          await tx.tourismSpot.upsert({
            where: { id: t.id },
            update: { title: t.title, category: t.category, description: t.description, imageUrl: t.imageUrl, content: t.content, visitorCount: t.visitorCount, status: t.status },
            create: { id: t.id, title: t.title, category: t.category, description: t.description, imageUrl: t.imageUrl, content: t.content, visitorCount: t.visitorCount, status: t.status },
          });
        }
      }

      // Handle testimony updates efficiently
      const existingTestimonies = await tx.testimony.findMany({ select: { id: true } });
      const incomingTestimonyIds = (data.testimonies || []).map((t: Testimony) => t.id).filter(Boolean);
      
      const testimoniesToDelete = existingTestimonies.filter(t => !incomingTestimonyIds.includes(t.id));
      if (testimoniesToDelete.length > 0) {
        await tx.testimony.deleteMany({ where: { id: { in: testimoniesToDelete.map(t => t.id) } } });
      }

      for (const t of (data.testimonies || [])) {
        if (t.id) {
          await tx.testimony.upsert({
            where: { id: t.id },
            update: { name: t.name, role: t.role, rating: t.rating, text: t.text },
            create: { id: t.id, name: t.name, role: t.role, rating: t.rating, text: t.text },
          });
        }
      }
    }, {
      maxWait: 5000,
      timeout: 20000
    });

    // Instantly sync the landing page
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT CMS Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
