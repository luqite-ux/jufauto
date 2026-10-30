import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { IconTile, SiteIcon } from '@/components/site/site-icon'
import { Workflow } from '@/components/site/workflow'
import { CAPABILITIES, EVIDENCE, FACTS, SOLUTIONS } from '@/lib/site-data'
import { btnOutline, btnSignal } from '@/lib/ui'
import { cn } from '@/lib/utils'

export function CapabilityGrid({ titleId = 'capabilities-title', heading = true }: { titleId?: string; heading?: boolean }) {
  return (
    <section aria-labelledby={titleId} className="py-16 md:py-24">
      <div className="wrap">
        {heading ? (
          <div id={titleId}>
            <SectionHeading
              eyebrow="Engineering & integration"
              title="Mechanics, tightening, feeding and control engineered as one system"
              description="Six capability areas cover the path from a part drawing to an integrated station or line."
              action={
                <Link href="/capabilities" className={cn(btnOutline, 'self-start md:self-auto')}>
                  Capabilities overview
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              }
            />
          </div>
        ) : (
          <h2 id={titleId} className="sr-only">
            Engineering and integration capability areas
          </h2>
        )}
        <ul className={cn('grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3', heading && 'mt-10')}>
          {CAPABILITIES.map((item, i) => (
            <Reveal as="li" key={item.title} index={i % 3} className="bg-white p-6 transition-colors duration-200 hover:bg-accent/60 md:p-7">
              <IconTile name={item.icon} />
              <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProcessSection({ titleId = 'process-title' }: { titleId?: string }) {
  return (
    <section aria-labelledby={titleId} className="border-y border-border bg-stage py-16 md:py-24">
      <div className="wrap">
        <div id={titleId}>
          <SectionHeading
            eyebrow="Project workflow"
            title="From requirement to delivery support in five controlled steps"
            description="A signal-line view of how an automation project moves through our engineering team."
          />
        </div>
        <Reveal className="mt-12">
          <Workflow />
        </Reveal>
      </div>
    </section>
  )
}

export function EvidenceSection() {
  return (
    <section aria-labelledby="evidence-title" className="py-16 md:py-24">
      <div className="wrap">
        <div id="evidence-title">
          <SectionHeading
            eyebrow="Manufacturing evidence"
            title="Equipment, control cabinets and heavy machining in view"
            description="Equipment and machining resources associated with JUFTECH projects."
          />
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {EVIDENCE.map((item, i) => (
            <Reveal as="li" key={item.src} index={i} className="h-full">
              <figure className="h-full overflow-hidden rounded-lg border border-border bg-white">
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 380px, 94vw"
                    className="object-contain p-2"
                  />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-sm text-ink">{item.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function SolutionsPreview({ detailed = false }: { detailed?: boolean }) {
  return (
    <section aria-labelledby="solutions-title" className={cn('py-16 md:py-24', !detailed && 'border-y border-border bg-muted')}>
      <div className="wrap">
        {!detailed ? (
          <div id="solutions-title">
            <SectionHeading
              eyebrow="Applications & solutions"
              title="Application areas built from the catalogue"
              description="Typical ways the product families combine into working systems."
              action={
                <Link href="/solutions" className={cn(btnOutline, 'self-start md:self-auto')}>
                  All solutions
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              }
            />
          </div>
        ) : (
          <h2 id="solutions-title" className="sr-only">
            Solution areas
          </h2>
        )}
        <ul className={cn('grid gap-5 md:grid-cols-2 lg:grid-cols-3', !detailed && 'mt-10')}>
          {SOLUTIONS.map((item, i) => (
            <Reveal as="li" key={item.slug} index={i % 3} className="h-full">
              <article id={item.slug} className="flex h-full scroll-mt-28 flex-col rounded-lg border border-border bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-[0_16px_36px_-22px_rgba(10,74,158,0.55)]">
                <IconTile name={item.icon} />
                <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-ink">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-sm bg-signal" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                {detailed && (
                  <Link
                    href={`/products?family=${item.familySlugs[0]}`}
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary transition-colors duration-200 hover:text-[#083c82]"
                  >
                    Related products
                    <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function FactsBand() {
  return (
    <section aria-labelledby="facts-title" className="bg-primary py-14 text-white md:py-20">
      <div className="wrap">
        <div id="facts-title">
          <SectionHeading
            tone="dark"
            eyebrow="Verified company facts"
            title="Suzhou Industrial Park, since 2014"
            description="A concise view of the company and its operating scale. Further capacity data is shared during project discussions."
          />
        </div>
        <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/20 bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.label} index={i} className="bg-primary p-6">
              <dt className="flex items-center gap-2 text-sm text-white/85">
                <SiteIcon name={i === 0 ? 'workflow' : i === 1 ? 'factory' : i === 2 ? 'layers' : 'cog'} className="size-4 text-signal" />
                {fact.label}
              </dt>
              <dd className="mt-3 font-mono text-3xl font-medium tabular-nums text-white sm:text-4xl">{fact.value}</dd>
              <dd className="mt-2 text-sm text-white/80">{fact.note}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function HomeCta() {
  return (
    <Link href="/contact#rfq" className={btnSignal}>
      Start an RFQ
    </Link>
  )
}
