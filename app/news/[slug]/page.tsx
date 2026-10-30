import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { getArticleBySlug } from '@/lib/articles-db'
import { btnOutline } from '@/lib/ui'

export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article not found' }
  return { title: article.title, description: article.excerpt, alternates: { canonical: `/news/${article.slug}` } }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()
  const schema = { '@context': 'https://schema.org', '@type': 'Article', '@id': `https://jufauto.com/news/${article.slug}#article`, headline: article.title, description: article.excerpt, datePublished: article.publishedAt, dateModified: article.publishedAt, mainEntityOfPage: `https://jufauto.com/news/${article.slug}`, publisher: { '@id': 'https://jufauto.com/#organization' } }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <PageHeader
        eyebrow={new Date(article.publishedAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        })}
        title={article.title}
        description={article.excerpt}
        crumbs={[{ label: 'News', href: '/news' }, { label: article.title }]}
      />
      <article className="py-12 md:py-16">
        <div className="wrap max-w-3xl space-y-5 text-base leading-relaxed text-ink">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link href="/news" className={`${btnOutline} mt-6`}>
            <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Back to news
          </Link>
        </div>
      </article>
    </>
  )
}
