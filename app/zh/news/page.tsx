import type { Metadata } from 'next'
import { NewsGrid } from '@/components/site/news-grid'
import { PageHeader } from '@/components/site/page-header'
import { getPublishedArticles } from '@/lib/articles-db'
import { alternateLanguages } from '@/lib/i18n'
import { ZH_PAGE_COPY } from '@/lib/messages'

export const revalidate = 60
export const metadata: Metadata = { title: '新闻资讯', description: ZH_PAGE_COPY.news.description, alternates: { canonical: '/zh/news', languages: alternateLanguages('/news') } }
export default async function ChineseNewsPage() { const articles = await getPublishedArticles(); return <><PageHeader {...ZH_PAGE_COPY.news} crumbs={[{ label: '新闻资讯' }]} /><section aria-label="已发布文章" className="py-12 md:py-16"><div className="wrap"><NewsGrid articles={articles} locale="zh-CN" /></div></section></> }
