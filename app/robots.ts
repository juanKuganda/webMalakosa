import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'], // Sesuaikan dengan path yang ingin Anda sembunyikan dari bot
    },
    sitemap: 'https://malakosa.web.id/sitemap.xml',
  }
}
