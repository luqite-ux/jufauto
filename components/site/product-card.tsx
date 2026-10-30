import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductStage } from '@/components/site/product-image'
import { getFamily, type Product } from '@/lib/site-data'

export function ProductCard({ product }: { product: Product }) {
  const family = getFamily(product.familySlug)
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col rounded-lg border border-border bg-white p-3 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_16px_36px_-22px_rgba(10,74,158,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <ProductStage
        image={product.images[0]}
        sizes="(min-width: 1280px) 380px, (min-width: 640px) 45vw, 92vw"
        className="aspect-[4/3] w-full"
      />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-signal-ink">{product.familyName || family?.name}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{product.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
          View details
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
