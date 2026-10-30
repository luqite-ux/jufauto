import type { Metadata } from 'next'
import { NewsGrid } from '@/components/site/news-grid'
import { PageHeader } from '@/components/site/page-header'
import { getPublishedArticles } from '@/lib/articles-db'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'News',
  alternates: { canonical: '/news' },
  description: 'Company and product news from JUFTECH.',
}

export default async function NewsPage() {
  const articles = await getPublishedArticles()
  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Company and product news"
        description="Updates published by the JUFTECH team."
        crumbs={[{ label: 'News' }]}
      />
      <section aria-label="Published articles" className="py-12 md:py-16">
        <div className="wrap">
          <NewsGrid articles={articles} />
        </div>
      </section>
    </>
  )
}
