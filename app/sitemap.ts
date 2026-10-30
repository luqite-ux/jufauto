import type { MetadataRoute } from 'next'
import { fetchProductsData } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'

export const revalidate = 60
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://jufauto.com'
  const [{ products }, articles] = await Promise.all([fetchProductsData(), getPublishedArticles()])
  const staticRoutes = ['', '/products', '/solutions', '/capabilities', '/about', '/news', '/contact']
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const, priority: route === '' ? 1 : 0.7 })),
    ...products.map((product) => ({ url: `${base}/products/${product.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...articles.map((article) => ({ url: `${base}/news/${article.slug}`, lastModified: new Date(article.publishedAt), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
