import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.malakosa.web.id';
  const lastModified = new Date();

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kalender`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Dynamic tourism routes from database
  try {
    const tourismSpots = await prisma.tourismSpot.findMany({
      select: { id: true, updatedAt: true },
    });

    for (const spot of tourismSpots) {
      routes.push({
        url: `${baseUrl}/wisata/${spot.id}`,
        lastModified: spot.updatedAt || lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error('Failed to generate dynamic sitemap for tourism:', error);
  }

  return routes;
}
