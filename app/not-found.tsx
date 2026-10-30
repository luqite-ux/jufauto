import Link from 'next/link'
import { btnBlue, btnOutline } from '@/lib/ui'

export default function NotFound() {
  return (
    <section className="blueprint bg-stage py-24 md:py-32">
      <div className="wrap max-w-2xl text-center">
        <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-signal-ink">Error 404</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">This page could not be found</h1>
        <p className="mt-4 text-base text-muted-foreground">
          The address may have changed or the item is no longer published.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={btnBlue}>
            Back to home
          </Link>
          <Link href="/products" className={btnOutline}>
            Browse products
          </Link>
        </div>
      </div>
    </section>
  )
}
