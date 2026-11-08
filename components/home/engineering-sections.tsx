import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { IconTile, SiteIcon } from '@/components/site/site-icon'
import { Workflow } from '@/components/site/workflow'
import { CAPABILITIES, EVIDENCE, FACTS, SOLUTIONS, type Product } from '@/lib/site-data'
import { btnOutline, btnSignal } from '@/lib/ui'
import { cn } from '@/lib/utils'
import { CASE_STUDIES } from '@/content/juftech-content.mjs'
import { localePath, type Locale } from '@/lib/i18n'

export function CapabilityGrid({ titleId = 'capabilities-title', heading = true, locale = 'en' }: { titleId?: string; heading?: boolean; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  return (
    <section aria-labelledby={titleId} className="py-16 md:py-24">
      <div className="wrap">
        {heading ? (
          <div id={titleId}>
            <SectionHeading
              eyebrow={zh ? '工程与集成' : 'Engineering & integration'}
              title={zh ? '机械、锁付、供料与控制协同设计' : 'Mechanics, tightening, feeding and control engineered as one system'}
              description={zh ? '六项能力覆盖从工件图纸到集成工作站或生产线的主要环节。' : 'Six capability areas cover the path from a part drawing to an integrated station or line.'}
              action={
                <Link href={localePath('/capabilities', locale)} className={cn(btnOutline, 'self-start md:self-auto')}>
                  {zh ? '查看能力概览' : 'Capabilities overview'}
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

export function ProcessSection({ titleId = 'process-title', locale = 'en' }: { titleId?: string; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  return (
    <section aria-labelledby={titleId} className="border-y border-border bg-stage py-16 md:py-24">
      <div className="wrap">
        <div id={titleId}>
          <SectionHeading
            eyebrow={zh ? '项目流程' : 'Project workflow'}
            title={zh ? '从需求沟通到交付支持的五个步骤' : 'From requirement to delivery support in five controlled steps'}
            description={zh ? '展示自动化项目在工程团队中的主要推进环节。' : 'A signal-line view of how an automation project moves through our engineering team.'}
          />
        </div>
        <Reveal className="mt-12">
          <Workflow />
        </Reveal>
      </div>
    </section>
  )
}

export function EvidenceSection({ locale = 'en' }: { locale?: Locale } = {}) {
  const zh = locale === 'zh-CN'
  return (
    <section aria-labelledby="evidence-title" className="py-16 md:py-24">
      <div className="wrap">
        <div id="evidence-title">
          <SectionHeading
            eyebrow={zh ? '制造实景' : 'Manufacturing evidence'}
            title={zh ? '设备、控制柜与大型加工资源' : 'Equipment, control cabinets and heavy machining in view'}
            description={zh ? '展示与九峰项目相关的设备与加工资源。' : 'Equipment and machining resources associated with JUFTECH projects.'}
          />
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {EVIDENCE.map((item, i) => (
            <Reveal as="li" key={item.src} index={i} className="h-full">
              <figure className="h-full overflow-hidden rounded-lg border border-border bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 380px, 94vw"
                    className="object-cover transition-transform duration-300 hover:scale-[1.02]"
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

export function SolutionsPreview({ detailed = false, products = [], limit, locale = 'en' }: { detailed?: boolean; products?: Product[]; limit?: number; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  const items = typeof limit === 'number' ? SOLUTIONS.slice(0, limit) : SOLUTIONS
  return (
    <section aria-labelledby="solutions-title" className={cn('py-16 md:py-24', !detailed && 'border-y border-border bg-muted')}>
      <div className="wrap">
        {!detailed ? (
          <div id="solutions-title">
            <SectionHeading
              eyebrow={zh ? '应用与解决方案' : 'Applications & solutions'}
              title={zh ? '由产品体系组合形成的应用方案' : 'Application areas built from the catalogue'}
              description={zh ? '展示不同产品分类在实际系统中的典型组合方式。' : 'Typical ways the product families combine into working systems.'}
              action={
                <Link href={localePath('/solutions', locale)} className={cn(btnOutline, 'self-start md:self-auto')}>
                  {zh ? '全部解决方案' : 'All solutions'}
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
          {items.map((item, i) => {
            const product = products.find((entry) => entry.slug === item.imageProductSlug && entry.images?.[0])
              ?? products.find((entry) => item.familySlugs.includes(entry.familySlug) && entry.images?.[0])
            const image = product?.images?.[0]
            return (
            <Reveal as="li" key={item.slug} index={i % 3} className="h-full">
              <article id={item.slug} className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-lg border border-border bg-white transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-[0_16px_36px_-22px_rgba(10,74,158,0.55)]">
                {image ? <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 94vw" className="object-cover transition-transform duration-300 hover:scale-[1.02]" />
                </div> : null}
                <div className="flex flex-1 flex-col border-t border-border p-6">
                <div className="flex items-center gap-3"><IconTile name={item.icon} /><h3 className="text-lg font-semibold text-ink">{item.title}</h3></div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
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
                    href={localePath(`/products?family=${item.familySlugs[0]}`, locale)}
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary transition-colors duration-200 hover:text-[#083c82]"
                  >
                    {zh ? '相关产品' : 'Related products'}
                    <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                )}
                </div>
              </article>
            </Reveal>
          )})}
        </ul>
      </div>
    </section>
  )
}

export function CaseStudiesSection({ products = [], limit, locale = 'en' }: { products?: Product[]; limit?: number; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  const items = typeof limit === 'number' ? CASE_STUDIES.slice(0, limit) : CASE_STUDIES
  return (
    <section aria-labelledby="case-studies-title" className="border-y border-border bg-stage py-16 md:py-24">
      <div className="wrap">
        <div id="case-studies-title">
          <SectionHeading
            eyebrow={zh ? '项目类型' : 'Selected project types'}
            title={zh ? '代表性自动化项目' : 'Representative automation projects'}
            description={zh ? '从已有工程项目中整理公开可展示的工艺流程与九峰工作范围。' : 'Selected scopes from delivered engineering work, showing the process and JUFTECH contribution at a level suitable for public review.'}
          />
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const product = products.find((entry) => entry.slug === item.productSlug)
            const image = product?.images?.[0]
            return (
            <Reveal as="li" key={item.title} index={index % 3} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white">
                {image ? <div className="relative aspect-[16/10] bg-white">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 94vw" className="object-contain p-4" />
                </div> : null}
                <div className="flex flex-1 flex-col border-t border-border p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{item.sector}</p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Process</p>
                <ul className="mt-2 space-y-2 text-sm text-ink">{item.process.map((value) => <li key={value}>• {value}</li>)}</ul>
                <p className="mt-5 border-t border-border pt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">JUFTECH scope</p>
                <ul className="mt-2 space-y-2 text-sm text-ink">{item.scope.map((value) => <li key={value}>• {value}</li>)}</ul>
                </div>
              </article>
            </Reveal>
          )})}
        </ul>
      </div>
    </section>
  )
}

export function FactsBand({ locale = 'en' }: { locale?: Locale } = {}) {
  const zh = locale === 'zh-CN'
  return (
    <section aria-labelledby="facts-title" className="bg-primary py-14 text-white md:py-20">
      <div className="wrap">
        <div id="facts-title">
          <SectionHeading
            tone="dark"
            eyebrow={zh ? '已核实企业信息' : 'Verified company facts'}
            title={zh ? '扎根苏州工业园区，始于2014年' : 'Suzhou Industrial Park, since 2014'}
            description={zh ? '简要展示企业与运营规模，进一步的能力信息可在项目沟通中提供。' : 'A concise view of the company and its operating scale. Further capacity data is shared during project discussions.'}
          />
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/20 bg-white/20 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.label} index={i} className="bg-primary p-4 sm:p-6">
              <dt className="flex items-center gap-2 text-sm text-white/85">
                <SiteIcon name={i === 0 ? 'workflow' : i === 1 ? 'factory' : i === 2 ? 'layers' : 'cog'} className="size-4 text-signal" />
                {fact.label}
              </dt>
              <dd className="mt-3 font-mono text-2xl font-medium tabular-nums text-white sm:text-4xl">{fact.value}</dd>
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
