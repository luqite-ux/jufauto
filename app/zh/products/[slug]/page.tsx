import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { ProductGallery } from '@/components/site/product-gallery'
import { ProductCard } from '@/components/site/product-card'
import { Reveal } from '@/components/site/reveal'
import { RfqSection } from '@/components/site/rfq-section'
import { getProductBySlug } from '@/lib/products-db'
import { alternateLanguages, localePath } from '@/lib/i18n'
import { btnOutline } from '@/lib/ui'

export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { product } = await getProductBySlug(slug, 'zh-CN')
  if (!product) return { title: '未找到产品' }
  const path = `/products/${product.slug}`
  return { title: product.name, description: product.summary, alternates: { canonical: localePath(path, 'zh-CN'), languages: alternateLanguages(path) } }
}

export default async function ChineseProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { product, products, families } = await getProductBySlug(slug, 'zh-CN')
  if (!product) notFound()
  const family = families.find((item) => item.slug === product.familySlug)
  const related = products.filter((item) => item.familySlug === product.familySlug && item.slug !== product.slug).slice(0, 3)
  const url = `https://jufauto.com/zh/products/${product.slug}`
  const schema = { '@context': 'https://schema.org', '@type': 'Product', '@id': `${url}#product`, name: product.name, description: product.summary, url, image: product.images.map((item) => item.src), category: family?.name, inLanguage: 'zh-CN', manufacturer: { '@id': 'https://jufauto.com/#organization' } }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }} />
    <PageHeader locale="zh-CN" eyebrow={family?.name} title={product.name} description={product.summary} crumbs={[{ label: '产品中心', href: '/zh/products' }, { label: product.name }]} />
    <section aria-label="产品概览" className="py-12 md:py-16"><div className="wrap grid gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-14"><Reveal><ProductGallery images={product.images} /></Reveal><div className="space-y-10"><Reveal><h2 className="text-2xl font-semibold text-ink">产品概览</h2><div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{product.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{family ? <Link href={`/zh/products?family=${family.slug}`} className={`${btnOutline} mt-6`}>查看同类产品</Link> : null}</Reveal>{(product.features?.length ?? 0) > 0 ? <Reveal><h2 className="text-2xl font-semibold text-ink">主要特点</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{product.features?.map((item) => <li key={item} className="flex gap-3 rounded-md border border-border bg-white p-3.5 text-sm text-ink"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}</ul></Reveal> : null}<Reveal><h2 className="text-2xl font-semibold text-ink">技术参数</h2><div className="mt-4 overflow-hidden rounded-lg border border-border bg-white"><table className="w-full text-left text-sm"><tbody className="divide-y divide-border">{product.specs.map((spec) => <tr key={spec.label}><th className="bg-muted px-4 py-3.5 text-ink">{spec.label}</th><td className="px-4 py-3.5 text-ink">{spec.value}</td></tr>)}</tbody></table></div></Reveal><Reveal><h2 className="text-2xl font-semibold text-ink">应用场景</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{product.applications.map((item) => <li key={item} className="flex gap-3 rounded-md border border-border bg-white p-3.5 text-sm text-ink"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}</ul></Reveal></div></div></section>
    {related.length ? <section className="border-t border-border bg-muted py-12 md:py-16"><div className="wrap"><h2 className="text-2xl font-semibold text-ink">同类相关产品</h2><ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <li key={item.slug}><ProductCard product={item} locale="zh-CN" /></li>)}</ul></div></section> : null}
    <RfqSection locale="zh-CN" defaultProduct={product.slug} title={`咨询 ${product.name}`} description="请说明工件、数量和工艺要求，页面未列出的配置需结合具体需求确认。" />
  </>
}
