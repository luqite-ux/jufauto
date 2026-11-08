import type { Metadata } from 'next'
import Image from 'next/image'
import { EvidenceSection, FactsBand } from '@/components/home/engineering-sections'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { RfqSection } from '@/components/site/rfq-section'
import { alternateLanguages } from '@/lib/i18n'
import { ZH_COMMON, ZH_PAGE_COPY } from '@/lib/messages'

export const metadata: Metadata = { title: '关于九峰', description: ZH_PAGE_COPY.about.description, alternates: { canonical: '/zh/about', languages: alternateLanguages('/about') } }
export default function ChineseAboutPage() { return <><PageHeader {...ZH_PAGE_COPY.about} crumbs={[{ label: '关于九峰' }]} /><section aria-labelledby="company-title" className="py-16 md:py-24"><div className="wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"><Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground"><h2 id="company-title" className="text-2xl font-semibold text-ink sm:text-3xl">企业介绍</h2><p>九峰专注于自动化设备及其配套系统，包括非标工作站与生产线、自动锁付模块、供料系统、工业平板、机器人集成、成型设备、大型加工和工业控制软件。</p><p>公司位于{ZH_COMMON.address}，现有资料显示厂区面积约9,000平方米，设有三个车间。工程团队根据工件图纸、工艺描述和现场条件推进设备方案。</p><p>产品目录按采购用途划分，帮助客户从具体需求快速找到对应产品与沟通入口。</p></Reveal><Reveal index={1}><div className="rounded-lg border border-border bg-white p-6 sm:p-8"><div className="relative mx-auto aspect-[2/1] w-full max-w-xs"><Image src="/images/logo.png" alt="JUFTECH 九峰自动化标志" fill sizes="320px" className="object-contain" /></div><dl className="mt-6 space-y-4 border-t border-border pt-6 text-sm"><div><dt className="text-xs text-muted-foreground">企业全称</dt><dd className="mt-1 font-medium text-ink">{ZH_COMMON.legalName}</dd></div><div><dt className="text-xs text-muted-foreground">地址</dt><dd className="mt-1 text-ink">{ZH_COMMON.address}</dd></div><div><dt className="text-xs text-muted-foreground">邮箱</dt><dd className="mt-1 text-ink">info@jufauto.com</dd></div></dl></div></Reveal></div></section><FactsBand locale="zh-CN" /><EvidenceSection locale="zh-CN" /><RfqSection locale="zh-CN" /></> }
