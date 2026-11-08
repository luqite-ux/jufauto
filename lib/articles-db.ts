import { getSupabaseClient } from '@/lib/supabase'
import type { NewsArticle } from '@/lib/site-data'
import { localizedValue, type Locale } from '@/lib/i18n'

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID?.trim()

function toArticle(row: Record<string, any>, locale: Locale): NewsArticle {
  const content = localizedValue(row.content_i18n, locale, row.content)
  return {
    slug: row.slug,
    title: localizedValue(row.title_i18n, locale, row.title),
    excerpt: localizedValue(row.excerpt_i18n, locale, row.excerpt),
    publishedAt: row.published_at || row.created_at,
    body: content ? [content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()] : [],
  }
}

export async function getPublishedArticles(locale: Locale = 'en'): Promise<NewsArticle[]> {
  const db = getSupabaseClient()
  if (!db || !TENANT_ID) return []
  const result = await db.from('articles').select('*').eq('tenant_id', TENANT_ID).eq('is_published', true).order('published_at', { ascending: false })
  if (result.error) return []
  return result.data.map((row) => toArticle(row, locale))
}

export async function getArticleBySlug(slug: string, locale: Locale = 'en') {
  const db = getSupabaseClient()
  if (!db || !TENANT_ID) return null
  const result = await db.from('articles').select('*').eq('tenant_id', TENANT_ID).eq('slug', slug).eq('is_published', true).maybeSingle()
  return result.data ? toArticle(result.data, locale) : null
}
