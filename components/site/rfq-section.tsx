import { Mail, MapPin, Phone } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { RfqForm } from '@/components/site/rfq-form'
import { COMPANY } from '@/lib/site-data'
import { fetchProductsData } from '@/lib/products-db'

export async function RfqSection({
  defaultProduct,
  title = 'Send your requirement to our engineers',
  description = 'Describe the part, the process and the application. An engineer replies with the information needed to move your request forward.',
  headingLevel = 'h2',
  idAttr = 'rfq',
}: {
  defaultProduct?: string
  title?: string
  description?: string
  headingLevel?: 'h1' | 'h2'
  idAttr?: string
}) {
  const { products, families } = await fetchProductsData()
  const Heading = headingLevel
  return (
    <section id={idAttr} aria-labelledby={`${idAttr}-title`} className="blueprint border-t border-border bg-stage py-16 md:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal className="space-y-8">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal-ink">
              <span className="mr-2 inline-block h-0.5 w-6 -translate-y-[3px] bg-signal align-middle" aria-hidden="true" />
              Request for quotation
            </p>
            <Heading id={`${idAttr}-title`} className="mt-3 text-[1.75rem] font-semibold leading-tight text-ink sm:text-4xl">
              {title}
            </Heading>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
          </div>

          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-accent text-primary">
                <Mail className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">Email</span>
                <a href={`mailto:${COMPANY.email}`} className="font-medium text-ink transition-colors duration-200 hover:text-primary">
                  {COMPANY.email}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-accent text-primary">
                <Phone className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">Phone</span>
                {COMPANY.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="mr-4 inline-block font-medium text-ink transition-colors duration-200 hover:text-primary"
                  >
                    {phone.display}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-accent text-primary">
                <MapPin className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">Address</span>
                <span className="font-medium text-ink">{COMPANY.address}</span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal index={1}>
          <RfqForm defaultProduct={defaultProduct} products={products} families={families} />
        </Reveal>
      </div>
    </section>
  )
}
