import { FamilyPaths, FeaturedProducts } from '@/components/home/catalogue-sections'
import {
  CapabilityGrid,
  EvidenceSection,
  FactsBand,
  ProcessSection,
  SolutionsPreview,
} from '@/components/home/engineering-sections'
import { FaqSection, NewsSection } from '@/components/home/faq-news-sections'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { RfqSection } from '@/components/site/rfq-section'
import { fetchProductsData } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'

export const revalidate = 60

export default async function HomePage() {
  const [{ products, families }, articles] = await Promise.all([fetchProductsData(), getPublishedArticles()])
  return (
    <>
      <HeroCarousel />
      <FamilyPaths products={products} families={families} />
      <FeaturedProducts products={products} />
      <CapabilityGrid />
      <ProcessSection />
      <EvidenceSection />
      <SolutionsPreview />
      <FactsBand />
      <FaqSection />
      <NewsSection articles={articles.slice(0, 3)} />
      <RfqSection />
    </>
  )
}
