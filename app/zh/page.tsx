import type { Metadata } from 'next'
import { FamilyPaths, FeaturedProducts } from '@/components/home/catalogue-sections'
import { CaseStudiesSection, EvidenceSection, FactsBand, SolutionsPreview } from '@/components/home/engineering-sections'
import { FaqSection, NewsSection } from '@/components/home/faq-news-sections'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { RfqSection } from '@/components/site/rfq-section'
import { fetchProductsData } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'
import { alternateLanguages } from '@/lib/i18n'
import { HERO_SLIDES_ZH, PROCUREMENT_FAQ_ZH } from '@/lib/messages'

export const revalidate = 60
export const metadata: Metadata = {
  title: '九峰自动化｜工业自动化设备与控制系统',
  description: '苏州工业园区九峰自动化技术有限公司提供非标自动化设备、锁付与供料系统、机器人集成、成型设备、大型加工及工业控制软件。',
  alternates: { canonical: '/zh', languages: alternateLanguages('/') },
}

export default async function ChineseHomePage() {
  const [{ products, families }, articles] = await Promise.all([fetchProductsData('zh-CN'), getPublishedArticles('zh-CN')])
  const groups = [{ title: '常见采购问题', items: PROCUREMENT_FAQ_ZH }]
  return <>
    <HeroCarousel slides={HERO_SLIDES_ZH} locale="zh-CN" />
    <FactsBand locale="zh-CN" />
    <FamilyPaths products={products} families={families} locale="zh-CN" />
    <FeaturedProducts products={products} locale="zh-CN" />
    <SolutionsPreview products={products} limit={3} locale="zh-CN" />
    <CaseStudiesSection products={products} limit={3} locale="zh-CN" />
    <EvidenceSection locale="zh-CN" />
    <FaqSection groups={groups} locale="zh-CN" />
    {articles.length > 0 ? <NewsSection articles={articles.slice(0, 3)} locale="zh-CN" /> : null}
    <RfqSection locale="zh-CN" />
  </>
}
