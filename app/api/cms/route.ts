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

    const data = {
      ...settings,
      stats: {
        population: settings.population,
        dusunCount: settings.dusunCount,
        kkCount: settings.kkCount,
        connectivityIndex: settings.connectivityIndex,
        agriculturalLand: settings.agriculturalLand,
        agriculturalActivePercent: settings.agriculturalActivePercent,
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

    // Update settings
    await prisma.cmsSettings.update({
      where: { id: currentSettings.id },
      data: {
        heroTitle: data.heroTitle,
        heroTagline: data.heroTagline,
        heroDescription: data.heroDescription,
        heroImageUrl: data.heroImageUrl,
        visionTitle: data.visionTitle,
        visionDescription: data.visionDescription,
        population: data.stats.population,
        dusunCount: data.stats.dusunCount,
        kkCount: data.stats.kkCount,
        connectivityIndex: data.stats.connectivityIndex,
        agriculturalLand: data.stats.agriculturalLand,
        agriculturalActivePercent: data.stats.agriculturalActivePercent,
        growthRate: data.stats.growthRate,
      },
    });

    // Handle agenda updates (simplistic approach: delete all and recreate for demo purpose, or create/update)
    // To make it simple based on the previous localstorage flow, we just replace them.
    await prisma.agendaEvent.deleteMany();
    if (data.agenda && data.agenda.length > 0) {
      await prisma.agendaEvent.createMany({
        data: data.agenda.map((a: AgendaEvent) => ({
          id: a.id,
          date: a.date,
          title: a.title,
          desc: a.desc,
          location: a.location,
          borderClass: a.borderClass,
          tagColor: a.tagColor,
        }))
      });
    }

    // Handle tourism updates
    await prisma.tourismSpot.deleteMany();
    if (data.tourism && data.tourism.length > 0) {
      await prisma.tourismSpot.createMany({
        data: data.tourism.map((t: TourismSpot) => ({
          id: t.id,
          title: t.title,
          category: t.category,
          description: t.description,
          visitorCount: t.visitorCount,
          status: t.status,
        }))
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT CMS Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
