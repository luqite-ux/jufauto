import type { Metadata } from 'next'
import { CapabilityGrid, EvidenceSection, FactsBand, ProcessSection } from '@/components/home/engineering-sections'
import { PageHeader } from '@/components/site/page-header'
import { RfqSection } from '@/components/site/rfq-section'

export const metadata: Metadata = {
  title: 'Capabilities',
  alternates: { canonical: '/capabilities' },
  description:
    'JUFTECH engineering and integration capabilities: custom equipment design, tightening and feeding, robotic integration, control software, forming and heavy machining.',
}

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Engineering, integration and manufacturing under one roof"
        description="From mechanical design and control software to forming and heavy machining, the work behind each project is coordinated in Suzhou Industrial Park."
        crumbs={[{ label: 'Capabilities' }]}
      />
      <CapabilityGrid heading={false} titleId="capabilities-grid" />
      <ProcessSection />
      <EvidenceSection />
      <FactsBand />
      <RfqSection />
    </>
  )
}
