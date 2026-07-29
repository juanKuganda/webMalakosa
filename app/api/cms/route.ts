/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { AgendaEvent, TourismSpot } from "@/lib/cms-store";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const settings = await prisma.cmsSettings.findFirst();
    const agenda = await prisma.agendaEvent.findMany({ orderBy: { createdAt: 'desc' } });
    const tourism = await prisma.tourismSpot.findMany({ orderBy: { createdAt: 'desc' } });

    if (!settings) {
       return NextResponse.json({ error: "CMS Data not found" }, { status: 404 });
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
    if (!currentSettings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      // Update settings
      await tx.cmsSettings.update({
        where: { id: currentSettings.id },
        data: {
          heroTitle: data.heroTitle,
          heroTagline: data.heroTagline,
          heroDescription: data.heroDescription,
          visionTitle: data.visionTitle,
          visionDescription: data.visionDescription,
          dusunList: JSON.stringify(data.dusunList || []),
          population: data.stats.population,
          dusunCount: data.stats.dusunCount,
          kkCount: data.stats.kkCount,
          connectivityIndex: data.stats.connectivityIndex,
          productiveLandArea: data.stats.productiveLandArea,
          productiveActivePercent: data.stats.productiveActivePercent,
          growthRate: data.stats.growthRate,
        },
      });

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
    }, {
      maxWait: 5000, // 5 seconds max wait to connect
      timeout: 20000 // 20 seconds timeout for the entire transaction (up from default 5s)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT CMS Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
