import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FaqGroups } from '@/components/site/faq'
import { NewsGrid } from '@/components/site/news-grid'
import { SectionHeading } from '@/components/site/section-heading'
import type { NewsArticle } from '@/lib/site-data'
import { btnOutline } from '@/lib/ui'
import { cn } from '@/lib/utils'

export function FaqSection({ headingId = 'faq-title', groups }: { headingId?: string; groups?: { title: string; items: { q: string; a: string }[] }[] }) {
  return (
    <section aria-labelledby={headingId} className="py-16 md:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
        <div id={headingId} className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Planning, selecting and integrating with confidence"
            description="Answers grouped by the stage of your project. Anything not covered here can go straight to the engineering team."
          />
          <Link href="/contact" className={cn(btnOutline, 'mt-7 w-fit')}>
            Ask the engineering team
            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
        <div>
          <FaqGroups groups={groups} />
        </div>
      </div>
    </section>
  )
}

export function NewsSection({ articles }: { articles: NewsArticle[] }) {
  return (
    <section aria-labelledby="news-title" className="border-t border-border bg-muted py-16 md:py-24">
      <div className="wrap">
        <div id="news-title">
          <SectionHeading
            eyebrow="News"
            title="Company and product updates"
            description={
              articles.length > 0
                ? 'Recent articles from the JUFTECH team.'
                : 'Published articles will appear here as they become available.'
            }
            action={
              articles.length > 0 ? (
                <Link href="/news" className={cn(btnOutline, 'self-start md:self-auto')}>
                  All news
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              ) : undefined
            }
          />
        </div>
        <div className="mt-10">
          <NewsGrid articles={articles} />
        </div>
      </div>
    </section>
  )
}
