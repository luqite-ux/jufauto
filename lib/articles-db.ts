import { getSupabaseClient } from '@/lib/supabase'
import type { NewsArticle } from '@/lib/site-data'

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID?.trim()

function localized(value: Record<string, unknown> | null | undefined, fallback: unknown) {
  if (value && typeof value.en === 'string' && value.en.trim()) return value.en.trim()
  return typeof fallback === 'string' ? fallback : ''
}

function toArticle(row: Record<string, any>): NewsArticle {
  const content = localized(row.content_i18n, row.content)
  return {
    slug: row.slug,
    title: localized(row.title_i18n, row.title),
    excerpt: localized(row.excerpt_i18n, row.excerpt),
    publishedAt: row.published_at || row.created_at,
    body: content ? [content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()] : [],
  }
}

export async function getPublishedArticles(): Promise<NewsArticle[]> {
  const db = getSupabaseClient()
  if (!db || !TENANT_ID) return []
  const result = await db.from('articles').select('*').eq('tenant_id', TENANT_ID).eq('is_published', true).order('published_at', { ascending: false })
  if (result.error) return []
  return result.data.map(toArticle)
}

export async function getArticleBySlug(slug: string) {
  const db = getSupabaseClient()
  if (!db || !TENANT_ID) return null
  const result = await db.from('articles').select('*').eq('tenant_id', TENANT_ID).eq('slug', slug).eq('is_published', true).maybeSingle()
  return result.data ? toArticle(result.data) : null
}
