import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { ProductCatalog } from '@/components/site/product-catalog'
import { RfqSection } from '@/components/site/rfq-section'
import { fetchProductsData } from '@/lib/products-db'
import { alternateLanguages } from '@/lib/i18n'
import { ZH_PAGE_COPY } from '@/lib/messages'

export const revalidate = 60
export const metadata: Metadata = { title: '产品中心', description: ZH_PAGE_COPY.products.description, alternates: { canonical: '/zh/products', languages: alternateLanguages('/products') } }

export default async function ChineseProductsPage({ searchParams }: { searchParams: Promise<{ family?: string }> }) {
  const { family } = await searchParams
  const { products, families } = await fetchProductsData()
  const initialFamily = families.some((item) => item.slug === family) ? family : undefined
  return <>
    <PageHeader {...ZH_PAGE_COPY.products} crumbs={[{ label: '产品中心' }]} />
    <section aria-label="产品目录" className="py-12 md:py-16"><div className="wrap"><ProductCatalog products={products} families={families} initialFamily={initialFamily} locale="zh-CN" /></div></section>
    <RfqSection locale="zh-CN" title="不确定哪种产品适合？" description="请告诉我们工件与工艺要求，工程团队会协助确认适合的产品分类或定制方案。" />
  </>
}
