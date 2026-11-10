'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ProductStage } from '@/components/site/product-image'
import type { ProductImage } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { localeFromPath, type Locale } from '@/lib/i18n'

export function ProductGallery({ images, locale }: { images: ProductImage[]; locale?: Locale }) {
  const [active, setActive] = useState(0)
  const pathname = usePathname()
  const current = images[active]
  const zh = (locale ?? localeFromPath(pathname)) === 'zh-CN'

  return (
    <div className="space-y-3">
      <ProductStage
        image={current}
        priority
        sizes="(min-width: 1024px) 560px, 94vw"
        className="aspect-square w-full"
        pendingLabel={zh ? '图片待补充' : 'Image pending'}
      />
      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-2" aria-label={zh ? '产品图片缩略图' : 'Product image thumbnails'}>
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                aria-label={zh ? `查看第${i + 1}张图片，共${images.length}张` : `Show image ${i + 1} of ${images.length}`}
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
