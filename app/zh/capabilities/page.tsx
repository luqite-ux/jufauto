import type { Metadata } from 'next'
import { CapabilityGrid, EvidenceSection, FactsBand, ProcessSection } from '@/components/home/engineering-sections'
import { PageHeader } from '@/components/site/page-header'
import { RfqSection } from '@/components/site/rfq-section'
import { alternateLanguages } from '@/lib/i18n'
import { ZH_PAGE_COPY } from '@/lib/messages'

export const metadata: Metadata = { title: '能力与服务', description: ZH_PAGE_COPY.capabilities.description, alternates: { canonical: '/zh/capabilities', languages: alternateLanguages('/capabilities') } }
export default function ChineseCapabilitiesPage() { return <><PageHeader {...ZH_PAGE_COPY.capabilities} crumbs={[{ label: '能力与服务' }]} /><CapabilityGrid heading={false} titleId="capabilities-grid" locale="zh-CN" /><ProcessSection locale="zh-CN" /><EvidenceSection locale="zh-CN" /><FactsBand locale="zh-CN" /><RfqSection locale="zh-CN" /></> }
