import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://malakosa.web.id'
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/wisata`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kalender`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
