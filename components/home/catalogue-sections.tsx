import Link from 'next/link'
import Image from 'next/image'
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
            description="Choose the family that matches your application, then review the available products or send the engineering team your requirements."
            action={
              <Link href="/products" className={cn(btnOutline, 'self-start md:self-auto')}>
                All products
                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            }
          />
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family, i) => {
            const count = products.filter((item) => item.familySlug === family.slug).length
            const familyProduct = products.find((item) => item.familySlug === family.slug && item.images?.[0])
            const image = familyProduct?.images?.[0]
            return (
              <Reveal as="li" key={family.slug} index={i % 3} className="h-full">
                <Link
                  href={`/products?family=${family.slug}`}
                  className="group grid h-full grid-cols-[7.5rem_1fr] overflow-hidden rounded-lg border border-border bg-white transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_16px_36px_-22px_rgba(10,74,158,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:grid-cols-1"
                >
                  <div className="relative flex min-h-32 items-center justify-center bg-stage sm:aspect-[16/9]">
                    {image ? <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 120px" className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]" /> : <IconTile name={family.icon} />}
                  </div>
                  <div className="flex min-w-0 flex-col p-4 sm:p-5">
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-ink">{family.name}</h3>
                    <span className="mt-auto flex items-center justify-between pt-4 text-sm font-semibold text-primary">
                      <span>{count > 0 ? `${count} ${count === 1 ? 'product' : 'products'}` : 'Request via RFQ'}</span>
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
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
