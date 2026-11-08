import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { ProductCatalog } from '@/components/site/product-catalog'
import { RfqSection } from '@/components/site/rfq-section'
import { fetchProductsData } from '@/lib/products-db'
import { alternateLanguages } from '@/lib/i18n'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Products',
  alternates: { canonical: '/products', languages: alternateLanguages('/products') },
  description:
    'Browse JUFTECH product families: custom automation equipment, automatic tightening modules, feeding systems, rugged tablets, robotic integration, forming machines, heavy machining and control software.',
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ family?: string }> }) {
  const { family } = await searchParams
  const { products, families } = await fetchProductsData()
  const initialFamily = families.some((f) => f.slug === family) ? family : undefined
  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Products organised by procurement family"
        description="Filter by family to see the catalogue items published for it. Specifications shown are the ones supplied for each item; further parameters are confirmed through RFQ."
        crumbs={[{ label: 'Products' }]}
      />
      <section aria-label="Product catalogue" className="py-12 md:py-16">
        <div className="wrap">
          <ProductCatalog products={products} families={families} initialFamily={initialFamily} />
        </div>
      </section>
      <RfqSection title="Not sure which product fits?" description="Tell us about the part and process. We will point you to the right family or propose a custom build." />
    </>
  )
}
