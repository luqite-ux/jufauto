import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { RfqSection } from '@/components/site/rfq-section'
import { alternateLanguages } from '@/lib/i18n'
import { ZH_PAGE_COPY } from '@/lib/messages'

export const metadata: Metadata = { title: '联系我们', description: ZH_PAGE_COPY.contact.description, alternates: { canonical: '/zh/contact', languages: alternateLanguages('/contact') } }
export default function ChineseContactPage() { return <><PageHeader {...ZH_PAGE_COPY.contact} crumbs={[{ label: '联系我们' }]} /><RfqSection locale="zh-CN" title="提交询价需求" description="请填写表单，工程团队将通过邮件与您联系。您也可以使用页面中的电话或邮箱直接沟通。" /></> }
