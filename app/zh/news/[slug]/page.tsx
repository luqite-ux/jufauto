import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { getArticleBySlug } from '@/lib/articles-db'
import { alternateLanguages, localePath } from '@/lib/i18n'
import { btnOutline } from '@/lib/ui'

export const dynamicParams = true
export const revalidate = 60
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const article = await getArticleBySlug(slug, 'zh-CN'); if (!article) return { title: '未找到文章' }; const path = `/news/${article.slug}`; return { title: article.title, description: article.excerpt, alternates: { canonical: localePath(path, 'zh-CN'), languages: alternateLanguages(path) } } }
export default async function ChineseNewsArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = await getArticleBySlug(slug, 'zh-CN'); if (!article) notFound(); const url = `https://jufauto.com/zh/news/${article.slug}`; const schema = { '@context': 'https://schema.org', '@type': 'Article', '@id': `${url}#article`, headline: article.title, description: article.excerpt, datePublished: article.publishedAt, dateModified: article.publishedAt, mainEntityOfPage: url, inLanguage: 'zh-CN', publisher: { '@id': 'https://jufauto.com/#organization' } }; return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }} /><PageHeader eyebrow={new Date(article.publishedAt).toLocaleDateString('zh-CN', { timeZone: 'UTC' })} title={article.title} description={article.excerpt} crumbs={[{ label: '新闻资讯', href: '/zh/news' }, { label: article.title }]} /><article className="py-12 md:py-16"><div className="wrap max-w-3xl space-y-5 text-base leading-relaxed text-ink">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link href="/zh/news" className={`${btnOutline} mt-6`}><ArrowLeft className="size-4" aria-hidden="true" />返回新闻列表</Link></div></article></> }
