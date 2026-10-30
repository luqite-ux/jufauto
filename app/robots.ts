import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/service-expired'] }, sitemap: 'https://jufauto.com/sitemap.xml', host: 'https://jufauto.com' } }
