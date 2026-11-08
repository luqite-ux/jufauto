import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { LogoLink } from '@/components/site/logo'
import { COMPANY, NAV_LINKS, formatCopyright } from '@/lib/site-data'
import { fetchProductsData } from '@/lib/products-db'
import { localePath, type Locale } from '@/lib/i18n'
import { NAV_LINKS_ZH, ZH_COMMON } from '@/lib/messages'

export async function SiteFooter({ locale = 'en' }: { locale?: Locale }) {
  const zh = locale === 'zh-CN'
  const navLinks = zh ? NAV_LINKS_ZH : NAV_LINKS
  const year = new Date().getFullYear()
  const { families } = await fetchProductsData(locale)

  return (
    <footer className="border-t border-border bg-muted">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1.2fr] lg:py-16">
        <div className="space-y-5">
          <div className="inline-block rounded-md border border-border bg-white px-4 py-3">
            <LogoLink className="h-16 sm:h-[72px] lg:h-20" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {zh ? 'JUFTECH 是苏州工业园区九峰自动化技术有限公司的对外品牌，提供自动化设备、锁付与供料系统、机器人集成、成型设备、大型加工及工业控制软件。' : <>JUFTECH is the public brand of {COMPANY.legalName}, supplying automation equipment, tightening and feeding systems, robotic integration, forming, heavy machining and industrial control software from Suzhou Industrial Park.</>}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-signal-ink">{zh ? ZH_COMMON.site : 'Site'}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={localePath(link.href, locale)} className="text-ink/80 transition-colors duration-200 hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product families">
          <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-signal-ink">{zh ? ZH_COMMON.productFamilies : 'Product families'}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {families.map((family) => (
              <li key={family.slug}>
                <Link
                  href={localePath(`/products?family=${family.slug}`, locale)}
                  className="text-ink/80 transition-colors duration-200 hover:text-primary"
                >
                  {family.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-signal-ink">{zh ? ZH_COMMON.contact : 'Contact'}</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink/85">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <span>{zh ? ZH_COMMON.address : COMPANY.address}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`} className="transition-colors duration-200 hover:text-primary">
                {COMPANY.email}
              </a>
            </li>
            {COMPANY.phones.map((phone) => (
              <li key={phone.href} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <a href={phone.href} className="transition-colors duration-200 hover:text-primary">
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-ink">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>{zh ? `© ${year} ${ZH_COMMON.legalName}。保留所有权利。` : formatCopyright(year)}</p>
          <p className="font-mono">{COMPANY.domain}</p>
        </div>
      </div>
    </footer>
  )
}
