import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FaqGroups } from '@/components/site/faq'
import { NewsGrid } from '@/components/site/news-grid'
import { SectionHeading } from '@/components/site/section-heading'
import type { NewsArticle } from '@/lib/site-data'
import { btnOutline } from '@/lib/ui'
import { cn } from '@/lib/utils'
import { localePath, type Locale } from '@/lib/i18n'

export function FaqSection({ headingId = 'faq-title', groups, locale = 'en' }: { headingId?: string; groups?: { title: string; items: { q: string; a: string }[] }[]; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  return (
    <section aria-labelledby={headingId} className="py-16 md:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
        <div id={headingId} className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow={zh ? '常见问题' : 'Frequently asked questions'}
            title={zh ? '更清晰地规划、选型与集成' : 'Planning, selecting and integrating with confidence'}
            description={zh ? '以下信息按项目推进阶段整理，未覆盖的问题可以直接提交给工程团队。' : 'Answers grouped by the stage of your project. Anything not covered here can go straight to the engineering team.'}
          />
          <Link href={localePath('/contact', locale)} className={cn(btnOutline, 'mt-7 w-fit')}>
            {zh ? '咨询工程团队' : 'Ask the engineering team'}
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

export function NewsSection({ articles, locale = 'en' }: { articles: NewsArticle[]; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  return (
    <section aria-labelledby="news-title" className="border-t border-border bg-muted py-16 md:py-24">
      <div className="wrap">
        <div id="news-title">
          <SectionHeading
            eyebrow={zh ? '新闻资讯' : 'News'}
            title={zh ? '企业与产品动态' : 'Company and product updates'}
            description={
              articles.length > 0
                ? (zh ? '查看九峰团队近期发布的文章。' : 'Recent articles from the JUFTECH team.')
                : (zh ? '文章发布后会显示在这里。' : 'Published articles will appear here as they become available.')
            }
            action={
              articles.length > 0 ? (
                <Link href={localePath('/news', locale)} className={cn(btnOutline, 'self-start md:self-auto')}>
                  {zh ? '全部新闻' : 'All news'}
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              ) : undefined
            }
          />
        </div>
        <div className="mt-10">
          <NewsGrid articles={articles} locale={locale} />
        </div>
      </div>
    </section>
  )
}
