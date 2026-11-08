import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ProductCard } from '@/components/site/product-card'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { IconTile } from '@/components/site/site-icon'
import type { Product, ProductFamily } from '@/lib/site-data'
import { btnOutline } from '@/lib/ui'
import { cn } from '@/lib/utils'
import { localePath, type Locale } from '@/lib/i18n'

const FAMILY_IMAGE_PRODUCT_SLUGS: Record<string, string> = {
  'non-standard-automated-customized-equipment': 'horn-assembly-production-line',
  'tighten-the-assembly-module-and-tools': 'screw-distributor-29',
  feeder: 'vibrating-disc-feeder',
  'tighten-function-attachments': 'gantry-style-balance-arm',
  'unmanned-aerial-vehicle-onboard-control-tablet': 'three-proof-reinforced-notebook',
  'robot-system-integration': 'gear-shifter-production-line-43',
  'forming-machine': 'automobile-belt-forming-machine',
  'heavy-machinery-processing': 'heavy-machinery-processing',
  'outsourcing-services-for-control-software-plc-labview-c': 'control-cabinet',
}

export function FamilyPaths({ products, families, locale = 'en' }: { products: Product[]; families: ProductFamily[]; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  return (
    <section aria-labelledby="families-title" className="py-16 md:py-24">
      <div className="wrap">
        <div id="families-title">
          <SectionHeading
            eyebrow={zh ? '采购入口' : 'Procurement paths'}
            title={zh ? `${families.length} 个产品分类，一个工程对接入口` : `${families.length} product families, one engineering contact`}
            description={zh ? '选择与应用相符的产品分类，查看已发布产品，或直接向工程团队提交需求。' : 'Choose the family that matches your application, then review the available products or send the engineering team your requirements.'}
            action={
              <Link href={localePath('/products', locale)} className={cn(btnOutline, 'self-start md:self-auto')}>
                {zh ? '全部产品' : 'All products'}
                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            }
          />
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family, i) => {
            const count = products.filter((item) => item.familySlug === family.slug).length
            const preferredProductSlug = FAMILY_IMAGE_PRODUCT_SLUGS[family.slug]
            const familyProduct = products.find((item) => item.slug === preferredProductSlug && item.images?.[0])
              ?? products.find((item) => item.familySlug === family.slug && item.images?.[0])
            const image = familyProduct?.images?.[0]
            return (
              <Reveal as="li" key={family.slug} index={i % 3} className="h-full">
                <Link
                  href={localePath(`/products?family=${family.slug}`, locale)}
                  className="group grid h-full grid-cols-[7.5rem_1fr] overflow-hidden rounded-lg border border-border bg-white transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_16px_36px_-22px_rgba(10,74,158,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:grid-cols-1"
                >
                  <div className="relative min-h-32 overflow-hidden sm:aspect-[16/9]">
                    {image ? (
                      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 120px" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-stage">
                        <IconTile name={family.icon} />
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-col p-4 sm:p-5">
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-ink">{family.name}</h3>
                    <span className="mt-auto flex items-center justify-between pt-4 text-sm font-semibold text-primary">
                      <span>{count > 0 ? (zh ? `${count} 项产品` : `${count} ${count === 1 ? 'product' : 'products'}`) : (zh ? '提交询价' : 'Request via RFQ')}</span>
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function FeaturedProducts({ products, locale = 'en' }: { products: Product[]; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  const featured = products.filter((p) => p.featured).slice(0, 6)
  return (
    <section aria-labelledby="featured-title" className="border-y border-border bg-muted py-16 md:py-24">
      <div className="wrap">
        <div id="featured-title">
          <SectionHeading
            eyebrow={zh ? '推荐产品' : 'Featured products'}
            title={zh ? '产品目录中的代表性产品' : 'Representative items from the catalogue'}
            description={zh ? '每项产品均使用对应的目录图片，详细参数需结合具体询价进一步确认。' : 'Each item is shown with its corresponding catalogue image. Detailed parameters are confirmed through RFQ.'}
            action={
              <Link href={localePath('/products', locale)} className={cn(btnOutline, 'self-start md:self-auto')}>
                {zh ? '浏览完整目录' : 'Browse the full catalogue'}
                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            }
          />
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal as="li" key={product.slug} index={i % 3} className="h-full">
              <ProductCard product={product} locale={locale} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
