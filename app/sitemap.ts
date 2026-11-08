import type { MetadataRoute } from 'next'
import { fetchProductsData } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'
import { alternateLanguages, localePath } from '@/lib/i18n'

export const revalidate = 60
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://jufauto.com'
  const [{ products }, articles] = await Promise.all([fetchProductsData(), getPublishedArticles()])
  const staticRoutes = ['', '/products', '/solutions', '/capabilities', '/about', '/news', '/contact']
  const entries = [
    ...staticRoutes.map((route) => ({ route: route || '/', lastModified: new Date(), changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const, priority: route === '' ? 1 : 0.7 })),
    ...products.map((product) => ({ route: `/products/${product.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...articles.map((article) => ({ route: `/news/${article.slug}`, lastModified: new Date(article.publishedAt), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
  return entries.flatMap((entry) => (['en', 'zh-CN'] as const).map((locale) => ({
    url: `${base}${localePath(entry.route, locale)}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: { languages: alternateLanguages(entry.route) },
  })))
}
