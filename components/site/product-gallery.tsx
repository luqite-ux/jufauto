'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductStage } from '@/components/site/product-image'
import type { ProductImage } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0)
  const current = images[active]

  return (
    <div className="space-y-3">
      <ProductStage
        image={current}
        priority
        sizes="(min-width: 1024px) 560px, 94vw"
        className="aspect-square w-full"
        pendingLabel="Image pending"
      />
      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-2" aria-label="Product image thumbnails">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  'relative block aspect-square w-full overflow-hidden rounded-md border bg-white transition-[border-color,box-shadow] duration-200 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  i === active ? 'border-primary ring-2 ring-primary/25' : 'border-border',
                )}
              >
                <Image src={image.src || '/placeholder.svg'} alt="" fill sizes="120px" className="object-contain p-1.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
