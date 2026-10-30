import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { RfqSection } from '@/components/site/rfq-section'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact JUFTECH engineers or send a request for quotation. Email info@jufauto.com or call 0512-67678265.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the JUFTECH engineering team"
        description="Send a request for quotation or a technical question. Include the part, process and quantity if you can."
        crumbs={[{ label: 'Contact' }]}
      />
      <RfqSection
        title="Request for quotation"
        description="Fill in the form and an engineer will reply by email. You can also reach us directly using the details below."
      />
    </>
  )
}
