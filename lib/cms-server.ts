/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { VillageCMSData, DEFAULT_CMS_DATA } from "@/lib/cms-store";

export async function getServerCMSData(): Promise<VillageCMSData> {
  try {
    const settings = await prisma.cmsSettings.findFirst();
    const agenda = await prisma.agendaEvent.findMany({ orderBy: { createdAt: 'desc' } });
    const tourism = await prisma.tourismSpot.findMany({ orderBy: { createdAt: 'desc' } });
    const testimonies = await prisma.testimony.findMany({ orderBy: { createdAt: 'desc' } });

    if (!settings) return DEFAULT_CMS_DATA;

    let dusunList: string[] = [];
    try {
      dusunList = JSON.parse(settings.dusunList || "[]");
    } catch (e) {
      dusunList = [];
    }

    return {
      heroTitle: settings.heroTitle,
      heroTagline: settings.heroTagline,
      heroDescription: settings.heroDescription,
      visionTitle: settings.visionTitle,
      visionDescription: settings.visionDescription,
      dusunList,
      stats: {
        population: settings.population,
        dusunCount: settings.dusunCount,
        kkCount: settings.kkCount,
        religionCount: settings.religionCount,
        productiveLandArea: settings.productiveLandArea,
        productiveActivePercent: settings.productiveActivePercent,
        growthRate: settings.growthRate,
      },
      agenda,
      tourism: tourism.map(t => ({
        ...t,
        imageUrl: t.imageUrl === null ? undefined : t.imageUrl,
        content: t.content === null ? undefined : t.content,
      })),
      testimonies,
    };
  } catch (error) {
    console.error("Failed to fetch CMS Data on server:", error);
    return DEFAULT_CMS_DATA;
  }
}
