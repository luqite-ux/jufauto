import type { Metadata } from 'next'
import { CaseStudiesSection, ProcessSection, SolutionsPreview } from '@/components/home/engineering-sections'
import { PageHeader } from '@/components/site/page-header'
import { RfqSection } from '@/components/site/rfq-section'
import { fetchProductsData } from '@/lib/products-db'
import { alternateLanguages } from '@/lib/i18n'
import { ZH_PAGE_COPY } from '@/lib/messages'

export const revalidate = 60
export const metadata: Metadata = { title: '解决方案', description: ZH_PAGE_COPY.solutions.description, alternates: { canonical: '/zh/solutions', languages: alternateLanguages('/solutions') } }
export default async function ChineseSolutionsPage() { const { products } = await fetchProductsData(); return <><PageHeader {...ZH_PAGE_COPY.solutions} crumbs={[{ label: '解决方案' }]} /><SolutionsPreview detailed products={products} locale="zh-CN" /><CaseStudiesSection products={products} locale="zh-CN" /><ProcessSection locale="zh-CN" /><RfqSection locale="zh-CN" /></> }
