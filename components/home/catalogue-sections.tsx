import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ProductCard } from '@/components/site/product-card'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { IconTile } from '@/components/site/site-icon'
import type { Product, ProductFamily } from '@/lib/site-data'
import { btnOutline } from '@/lib/ui'
import { cn } from '@/lib/utils'

export function FamilyPaths({ products, families }: { products: Product[]; families: ProductFamily[] }) {
  return (
    <section aria-labelledby="families-title" className="py-16 md:py-24">
      <div className="wrap">
        <div id="families-title">
          <SectionHeading
            eyebrow="Procurement paths"
            title={`${families.length} product families, one engineering contact`}
            description="Start from the family that matches your sourcing need. Each path lists the catalogue items published for it."
            action={
              <Link href="/products" className={cn(btnOutline, 'self-start md:self-auto')}>
                All products
                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            }
          />
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {families.map((family, i) => {
            const count = products.filter((item) => item.familySlug === family.slug).length
            return (
              <Reveal as="li" key={family.slug} index={i % 4} className="h-full">
                <Link
                  href={`/products?family=${family.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-border bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_16px_36px_-22px_rgba(10,74,158,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <div className="flex items-start justify-between">
                    <IconTile name={family.icon} />
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold leading-snug text-ink">{family.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{family.short}</p>
                  <span className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-primary">
                    <span>{count > 0 ? `${count} catalogue ${count === 1 ? 'item' : 'items'}` : 'Request via RFQ'}</span>
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.filter((p) => p.featured).slice(0, 6)
  return (
    <section aria-labelledby="featured-title" className="border-y border-border bg-muted py-16 md:py-24">
      <div className="wrap">
        <div id="featured-title">
          <SectionHeading
            eyebrow="Featured products"
            title="Representative items from the catalogue"
            description="Each item is shown with its corresponding catalogue image. Detailed parameters are confirmed through RFQ."
            action={
              <Link href="/products" className={cn(btnOutline, 'self-start md:self-auto')}>
                Browse the full catalogue
                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            }
          />
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal as="li" key={product.slug} index={i % 3} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
