'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/site/product-card'
import { Reveal } from '@/components/site/reveal'
import { SiteIcon } from '@/components/site/site-icon'
import type { Product, ProductFamily } from '@/lib/site-data'
import { btnBlue } from '@/lib/ui'
import { cn } from '@/lib/utils'

export function ProductCatalog({
  products,
  families,
  initialFamily,
}: {
  products: Product[]
  families: ProductFamily[]
  initialFamily?: string
}) {
  const [family, setFamily] = useState(
    initialFamily && families.some((f) => f.slug === initialFamily) ? initialFamily : 'all',
  )

  const select = (slug: string) => {
    setFamily(slug)
    const url = new URL(window.location.href)
    if (slug === 'all') url.searchParams.delete('family')
    else url.searchParams.set('family', slug)
    window.history.replaceState(null, '', url)
  }

  const activeFamily = families.find((f) => f.slug === family)
  const visible = family === 'all' ? products : products.filter((p) => p.familySlug === family)

  const filterButton = (active: boolean) =>
    cn(
      'group flex shrink-0 items-center gap-2.5 rounded-md border px-3.5 py-2.5 text-left text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.99] lg:w-full',
      active
        ? 'border-primary bg-primary text-white shadow-sm'
        : 'border-border bg-white text-ink hover:border-primary hover:bg-accent',
    )

  return (
    <div className="grid gap-8 lg:grid-cols-[290px_1fr] lg:gap-10">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal-ink">
          Filter by family
        </h2>
        <div
          role="group"
          aria-label="Product family filters"
          className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          <button type="button" aria-pressed={family === 'all'} onClick={() => select('all')} className={filterButton(family === 'all')}>
            <span className="flex-1">All families</span>
            <span className={cn('font-mono text-xs tabular-nums', family === 'all' ? 'text-white/85' : 'text-muted-foreground')}>
              {products.length}
            </span>
          </button>
          {families.map((f) => {
            const active = family === f.slug
            const count = products.filter((p) => p.familySlug === f.slug).length
            return (
              <button key={f.slug} type="button" aria-pressed={active} onClick={() => select(f.slug)} className={filterButton(active)}>
                <SiteIcon name={f.icon} className="size-4 shrink-0" />
                <span className="flex-1 whitespace-nowrap lg:whitespace-normal">{f.name}</span>
                <span className={cn('font-mono text-xs tabular-nums', active ? 'text-white/85' : 'text-muted-foreground')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="mb-5 text-sm text-muted-foreground" role="status" aria-live="polite">
          Showing <span className="font-semibold text-ink">{visible.length}</span>{' '}
          {visible.length === 1 ? 'item' : 'items'}
          {activeFamily ? <> in {activeFamily.name}</> : <> across all families</>}
        </p>

        {visible.length > 0 ? (
          <ul key={family} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((product, i) => (
              <Reveal as="li" key={product.slug} index={i % 3} className="animate-in fade-in duration-300 motion-reduce:animate-none">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-primary/40 bg-stage p-8 text-center sm:p-12">
            {activeFamily && (
              <span className="mx-auto flex size-12 items-center justify-center rounded-md border border-primary/20 bg-accent text-primary">
                <SiteIcon name={activeFamily.icon} className="size-6" />
              </span>
            )}
            <h3 className="mt-4 text-xl font-semibold text-ink">{activeFamily?.name}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {activeFamily?.description} No catalogue items are published for this family yet. Send your requirement and
              an engineer will respond directly.
            </p>
            <Link
              href={`/contact?product=${activeFamily?.slug ?? ''}#rfq`}
              className={cn(btnBlue, 'mt-6')}
            >
              Send an RFQ
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
