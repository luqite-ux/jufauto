import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductImage as ProductImageType } from '@/lib/site-data'

/** Clean continuous light stage; images are always contained so the full subject stays visible. */
export function ProductStage({
  image,
  sizes,
  className,
  priority,
  pendingLabel = 'Image pending',
}: {
  image?: ProductImageType
  sizes: string
  className?: string
  priority?: boolean
  pendingLabel?: string
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-md border border-border bg-white', className)}>
      <span className="pointer-events-none absolute left-2 top-2 size-3 border-l border-t border-primary/30" aria-hidden="true" />
      <span className="pointer-events-none absolute right-2 top-2 size-3 border-r border-t border-primary/30" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-2 left-2 size-3 border-b border-l border-primary/30" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-2 right-2 size-3 border-b border-r border-primary/30" aria-hidden="true" />
      {image ? (
        <Image
          src={image.src || '/placeholder.svg'}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain p-3"
        />
      ) : (
        <div className="blueprint absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stage text-muted-foreground">
          <ImageOff className="size-8" strokeWidth={1.25} aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-[0.14em]">{pendingLabel}</p>
        </div>
      )}
    </div>
  )
}
