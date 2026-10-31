import type { Metadata } from 'next'
import { CaseStudiesSection, ProcessSection, SolutionsPreview } from '@/components/home/engineering-sections'
import { PageHeader } from '@/components/site/page-header'
import { RfqSection } from '@/components/site/rfq-section'

export const metadata: Metadata = {
  title: 'Solutions',
  alternates: { canonical: '/solutions' },
  description:
    'Application areas where JUFTECH combines automation equipment, tightening modules, feeding systems, robotic integration and control software.',
}

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Automation solutions built from the JUFTECH catalogue"
        description="Each solution area combines product families into a working station or line. Scope is defined with your engineers during requirement analysis."
        crumbs={[{ label: 'Solutions' }]}
      />
      <SolutionsPreview detailed />
      <CaseStudiesSection />
      <ProcessSection />
      <RfqSection />
    </>
  )
}
