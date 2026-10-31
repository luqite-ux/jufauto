import { FamilyPaths, FeaturedProducts } from '@/components/home/catalogue-sections'
import {
  CapabilityGrid,
  EvidenceSection,
  CaseStudiesSection,
  FactsBand,
  ProcessSection,
  SolutionsPreview,
} from '@/components/home/engineering-sections'
import { FaqSection, NewsSection } from '@/components/home/faq-news-sections'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { RfqSection } from '@/components/site/rfq-section'
import { fetchProductsData } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'
import { getSiteContent } from '@/lib/site-content/site-content'
import { HERO_SLIDES, type HeroSlide } from '@/lib/site-data'
import { PROCUREMENT_FAQ } from '@/content/juftech-content.mjs'

export const revalidate = 60
export const metadata: Metadata = { alternates: { canonical: '/' } }

export default async function HomePage() {
  const [{ products, families }, articles] = await Promise.all([fetchProductsData(), getPublishedArticles()])
  const snapshot = await getSiteContent('en').catch(() => null)
  const home = snapshot?.pages.find((page) => page.path === '/')
  const heroValues = home?.modules.find((module) => module.key === 'hero')?.values
  const configuredSlides = Array.isArray(heroValues?.slides) ? heroValues.slides : []
  const slides: HeroSlide[] = configuredSlides.length === HERO_SLIDES.length ? HERO_SLIDES.map((fallback, index) => {
    const value = configuredSlides[index] as Record<string, unknown>
    return { ...fallback, eyebrow: String(value.eyebrow || fallback.eyebrow), title: String(value.title || fallback.title), body: String(value.body || fallback.body), primary: { label: String(value.primary_label || fallback.primary.label), href: String(value.primary_href || fallback.primary.href) }, secondary: { label: String(value.secondary_label || fallback.secondary.label), href: String(value.secondary_href || fallback.secondary.href) } }
  }) : HERO_SLIDES
  const sourceGroups = [
    { title: 'Project fit', items: PROCUREMENT_FAQ.slice(0, 6) },
    { title: 'Quotation & commercial terms', items: PROCUREMENT_FAQ.slice(6, 12) },
    { title: 'Schedule & quality', items: PROCUREMENT_FAQ.slice(12, 19) },
    { title: 'Engineering integration', items: PROCUREMENT_FAQ.slice(19) },
  ]
  const groups = sourceGroups
  return (
    <>
      <HeroCarousel slides={slides} />
      <FamilyPaths products={products} families={families} />
      <FeaturedProducts products={products} />
      <CapabilityGrid />
      <ProcessSection />
      <EvidenceSection />
      <CaseStudiesSection />
      <SolutionsPreview />
      <FactsBand />
      <FaqSection groups={groups} />
      <NewsSection articles={articles.slice(0, 3)} />
      <RfqSection />
    </>
  )
}
import type { Metadata } from 'next'
