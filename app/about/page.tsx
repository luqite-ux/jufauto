import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin, Mail, Phone } from 'lucide-react'
import { EvidenceSection, FactsBand } from '@/components/home/engineering-sections'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { RfqSection } from '@/components/site/rfq-section'
import { COMPANY, PRODUCT_FAMILIES } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About JUFTECH, the public brand of Suzhou Industrial Park Jiufeng Automation Technology Co., Ltd., an industrial automation company founded in 2014.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About JUFTECH"
        title="An automation engineering company in Suzhou Industrial Park"
        description={`JUFTECH is the public brand of ${COMPANY.legalName} The company was founded in ${COMPANY.founded}.`}
        crumbs={[{ label: 'About' }]}
      />

      <section aria-labelledby="company-title" className="py-16 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <h2 id="company-title" className="text-2xl font-semibold text-ink sm:text-3xl">
              Who we are
            </h2>
            <p>
              We design and build automation equipment and the components around it: custom stations and lines,
              automatic tightening modules, feeding systems, rugged tablets, robotic integration, forming machines,
              heavy machining and industrial control software.
            </p>
            <p>
              The company works from {COMPANY.address}, on a site of approximately 9,000 m² with three workshops. Our
              engineers work with overseas integrators and procurement teams to turn a part drawing and a process
              description into equipment that fits the plant.
            </p>
            <p>
              The product catalogue is organised into {PRODUCT_FAMILIES.length} procurement families so buyers can move
              from a requirement to the right conversation quickly.
            </p>
          </Reveal>

          <Reveal index={1}>
            <div className="rounded-lg border border-border bg-white p-6 sm:p-8">
              <div className="relative mx-auto aspect-[2/1] w-full max-w-xs">
                <Image src="/images/logo.png" alt="JUFTECH logo" fill sizes="320px" className="object-contain" />
              </div>
              <dl className="mt-6 space-y-4 border-t border-border pt-6 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Registered company</dt>
                  <dd className="mt-1 font-medium text-ink">{COMPANY.legalName}</dd>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Address</dt>
                    <dd className="text-ink">{COMPANY.address}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href={`mailto:${COMPANY.email}`} className="text-ink transition-colors duration-200 hover:text-primary">
                        {COMPANY.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Phone</dt>
                    <dd className="flex flex-wrap gap-x-4">
                      {COMPANY.phones.map((phone) => (
                        <a key={phone.href} href={phone.href} className="text-ink transition-colors duration-200 hover:text-primary">
                          {phone.display}
                        </a>
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <FactsBand />
      <EvidenceSection />
      <RfqSection />
    </>
  )
}
