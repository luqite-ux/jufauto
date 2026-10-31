import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { ProductCard } from '@/components/site/product-card'
import { ProductGallery } from '@/components/site/product-gallery'
import { Reveal } from '@/components/site/reveal'
import { RfqSection } from '@/components/site/rfq-section'
import { getProductBySlug } from '@/lib/products-db'
import { btnOutline, btnSignal } from '@/lib/ui'
import { cn } from '@/lib/utils'

export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { product } = await getProductBySlug(slug)
  if (!product) return { title: 'Product not found' }
  return { title: product.name, description: product.summary, alternates: { canonical: `/products/${product.slug}` } }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { product, products, families } = await getProductBySlug(slug)
  if (!product) notFound()

  const family = families.find((item) => item.slug === product.familySlug)
  const related = products.filter((item) => item.familySlug === product.familySlug && item.slug !== product.slug).slice(0, 3)
  const schema = { '@context': 'https://schema.org', '@type': 'Product', '@id': `https://jufauto.com/products/${product.slug}#product`, name: product.name, description: product.summary, url: `https://jufauto.com/products/${product.slug}`, image: product.images.map((item) => item.src), category: family?.name, manufacturer: { '@id': 'https://jufauto.com/#organization' } }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <PageHeader
        eyebrow={family?.name}
        title={product.name}
        description={product.summary}
        crumbs={[{ label: 'Products', href: '/products' }, { label: product.name }]}
      />

      <section aria-label="Product overview" className="py-12 md:py-16">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-14">
          <Reveal>
            <ProductGallery images={product.images} />
          </Reveal>

          <div className="space-y-10">
            <Reveal>
              <h2 className="text-2xl font-semibold text-ink">Overview</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                {product.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="#rfq" className={cn(btnSignal, 'justify-center')}>
                  Request a quotation
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
                {family && (
                  <Link href={`/products?family=${family.slug}`} className={cn(btnOutline, 'justify-center')}>
                    More in this family
                  </Link>
                )}
              </div>
            </Reveal>

            {(product.features?.length ?? 0) > 0 && <Reveal>
              <h2 className="text-2xl font-semibold text-ink">Key features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {(product.features ?? []).map((item) => (
                  <li key={item} className="flex gap-3 rounded-md border border-border bg-white p-3.5 text-sm text-ink">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>}

            <Reveal>
              <h2 className="text-2xl font-semibold text-ink">Specifications</h2>
              <p className="mt-2 text-sm text-muted-foreground">Only the parameters supplied for this item are listed.</p>
              <div className="mt-4 overflow-hidden rounded-lg border border-border bg-white">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">{product.name} specifications</caption>
                  <tbody className="divide-y divide-border">
                    {product.specs.map((spec) => (
                      <tr key={spec.label} className="block sm:table-row">
                        <th
                          scope="row"
                          className="block bg-muted px-4 pt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:table-cell sm:w-2/5 sm:py-3.5 sm:text-sm sm:normal-case sm:tracking-normal sm:text-ink"
                        >
                          {spec.label}
                        </th>
                        <td className="block break-words bg-muted px-4 pb-3 font-medium text-ink sm:table-cell sm:bg-white sm:py-3.5">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-ink">Applications</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.applications.map((item) => (
                  <li key={item} className="flex gap-3 rounded-md border border-border bg-white p-3.5 text-sm text-ink">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-border bg-muted py-12 md:py-16">
          <div className="wrap">
            <h2 id="related-title" className="text-2xl font-semibold text-ink">
              Related in {family?.name}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal as="li" key={item.slug} index={i} className="h-full">
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <RfqSection
        defaultProduct={product.slug}
        title={`Request a quotation for ${product.name}`}
        description="Share the part, quantity and process details. Specifications beyond those listed above are confirmed by our engineers."
      />
    </>
  )
}
