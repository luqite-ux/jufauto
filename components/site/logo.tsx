import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * The supplied logo file carries generous white margins. The wrapper crops to the
 * mark while the image keeps its own aspect ratio, so the full logo stays visible.
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn('relative block aspect-[2.53/1] overflow-hidden', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt="JUFTECH"
        width={1536}
        height={690}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className="absolute max-w-none"
        style={{ width: '114.6%', left: '-4.5%', top: '-15.1%', height: 'auto' }}
      />
    </span>
  )
}

export function LogoLink({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="JUFTECH home"
      className="inline-block rounded-sm transition-opacity duration-200 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <Logo className={className} priority={priority} />
    </Link>
  )
}
