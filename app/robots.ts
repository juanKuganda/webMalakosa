import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
    ],
    sitemap: 'https://www.malakosa.web.id/sitemap.xml',
  };
}
