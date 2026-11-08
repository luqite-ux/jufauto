import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import type { NewsArticle } from '@/lib/site-data'
import { btnOutline } from '@/lib/ui'
import { localePath, type Locale } from '@/lib/i18n'

export function NewsEmptyState({ locale = 'en' }: { locale?: Locale }) {
  const zh = locale === 'zh-CN'
  return (
    <Reveal className="rounded-lg border border-dashed border-primary/40 bg-stage p-8 text-center sm:p-14">
      <span className="mx-auto flex size-14 items-center justify-center rounded-md border border-primary/20 bg-accent text-primary">
        <Newspaper className="size-7" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-ink">{zh ? '暂未发布文章' : 'No articles published yet'}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {zh ? '企业和产品动态发布后会显示在这里。如需沟通项目，请直接联系工程团队。' : 'Company and product news will appear here once it is published. For project questions in the meantime, contact the engineering team directly.'}
      </p>
      <Link href={localePath('/contact#rfq', locale)} className={`${btnOutline} mt-6`}>
        {zh ? '联系工程团队' : 'Contact the team'}
        <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
      </Link>
    </Reveal>
  )
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale === 'zh-CN' ? 'zh-CN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function NewsGrid({ articles, locale = 'en' }: { articles: NewsArticle[]; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  if (articles.length === 0) return <NewsEmptyState locale={locale} />
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <Reveal as="li" key={article.slug} index={i % 3} className="h-full">
          <Link
            href={localePath(`/news/${article.slug}`, locale)}
            className="group flex h-full flex-col rounded-lg border border-border bg-white p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_16px_36px_-22px_rgba(10,74,158,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <time dateTime={article.publishedAt} className="font-mono text-xs uppercase tracking-[0.12em] text-signal-ink">
              {formatDate(article.publishedAt, locale)}
            </time>
            <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{article.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
              {zh ? '阅读文章' : 'Read article'}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}
