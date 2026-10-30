import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { LogoLink } from '@/components/site/logo'
import { COMPANY, NAV_LINKS, formatCopyright } from '@/lib/site-data'
import { fetchProductsData } from '@/lib/products-db'

export async function SiteFooter() {
  const year = new Date().getFullYear()
  const { families } = await fetchProductsData()

  return (
    <footer className="border-t border-border bg-muted">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1.2fr] lg:py-16">
        <div className="space-y-5">
          <div className="inline-block rounded-md border border-border bg-white px-4 py-3">
            <LogoLink className="h-16 sm:h-[72px] lg:h-20" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            JUFTECH is the public brand of {COMPANY.legalName}, supplying automation equipment, tightening and feeding
            systems, robotic integration, forming, heavy machining and industrial control software from Suzhou
            Industrial Park.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-signal-ink">Site</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink/80 transition-colors duration-200 hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product families">
          <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-signal-ink">Product families</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {families.map((family) => (
              <li key={family.slug}>
                <Link
                  href={`/products?family=${family.slug}`}
                  className="text-ink/80 transition-colors duration-200 hover:text-primary"
                >
                  {family.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-signal-ink">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink/85">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <span>{COMPANY.address}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`} className="transition-colors duration-200 hover:text-primary">
                {COMPANY.email}
              </a>
            </li>
            {COMPANY.phones.map((phone) => (
              <li key={phone.href} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <a href={phone.href} className="transition-colors duration-200 hover:text-primary">
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-ink">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>{formatCopyright(year)}</p>
          <p className="font-mono">{COMPANY.domain}</p>
        </div>
      </div>
    </footer>
  )
}
