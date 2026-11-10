'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ArrowRight, Mail, MapPin, Menu, Phone } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LogoLink } from '@/components/site/logo'
import { COMPANY, NAV_LINKS } from '@/lib/site-data'
import { btnSignal } from '@/lib/ui'
import { cn } from '@/lib/utils'
import { localeFromPath, localePath } from '@/lib/i18n'
import { NAV_LINKS_ZH, ZH_COMMON } from '@/lib/messages'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const chinese = localeFromPath(pathname) === 'zh-CN'
  const navLinks = chinese ? NAV_LINKS_ZH : NAV_LINKS
  const translatedPath = localePath(pathname, chinese ? 'en' : 'zh-CN')
  const switchHref = searchParams.size ? `${translatedPath}?${searchParams.toString()}` : translatedPath
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="hidden bg-ink text-white md:block">
        <div className="wrap flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2 text-white/85">
            <MapPin className="size-3.5 text-signal" strokeWidth={1.5} aria-hidden="true" />
            {chinese ? ZH_COMMON.address : COMPANY.address}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-1.5 text-white/90 transition-colors duration-200 hover:text-signal"
            >
              <Mail className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              {COMPANY.email}
            </a>
            {COMPANY.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="flex items-center gap-1.5 text-white/90 transition-colors duration-200 hover:text-signal"
              >
                <Phone className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                {phone.display}
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-[76px]">
          <LogoLink className="h-11 lg:h-[52px]" priority locale={chinese ? 'zh-CN' : 'en'} />

          <nav aria-label={chinese ? '主导航' : 'Primary'} className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const href = localePath(link.href, chinese ? 'zh-CN' : 'en')
              const active = isActive(pathname, href)
              return (
                <Link
                  key={link.href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary',
                    'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-200 hover:after:scale-x-100',
                    active ? 'text-primary after:scale-x-100' : 'text-ink/80',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href={localePath('/contact#rfq', chinese ? 'zh-CN' : 'en')} className={cn(btnSignal, 'hidden h-10 sm:inline-flex')}>
              {chinese ? ZH_COMMON.quote : 'Request a Quote'}
            </Link>
            <a href={switchHref} hrefLang={chinese ? 'en' : 'zh-CN'} className="inline-flex h-10 items-center rounded-md border border-border px-3 text-sm font-semibold text-primary transition-colors hover:bg-accent">
              {chinese ? 'EN' : '中文'}
            </a>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={chinese ? '打开导航菜单' : 'Open navigation menu'}
                  className="inline-flex size-11 items-center justify-center rounded-md border border-border text-ink transition-colors duration-200 hover:border-primary hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring lg:hidden"
                >
                  <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(88vw,360px)] gap-0 p-0">
                <SheetHeader className="border-b border-border p-4 text-left">
                  <SheetTitle className="text-base">JUFTECH</SheetTitle>
                  <SheetDescription className="text-xs">{chinese ? ZH_COMMON.mobileDescription : 'Industrial automation and control systems'}</SheetDescription>
                </SheetHeader>
                <nav aria-label={chinese ? '移动端主导航' : 'Mobile primary'} className="flex flex-col p-2">
                  {navLinks.map((link) => {
                    const href = localePath(link.href, chinese ? 'zh-CN' : 'en')
                    const active = isActive(pathname, href)
                    return (
                      <Link
                        key={link.href}
                        href={href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex h-12 items-center justify-between rounded-md px-3 text-[15px] font-medium transition-colors duration-200 hover:bg-accent',
                          active ? 'bg-accent text-primary' : 'text-ink',
                        )}
                      >
                        {link.label}
                        <ArrowRight className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                      </Link>
                    )
                  })}
                </nav>
                <div className="mt-auto space-y-3 border-t border-border p-4">
                  <Link href={localePath('/contact#rfq', chinese ? 'zh-CN' : 'en')} onClick={() => setOpen(false)} className={cn(btnSignal, 'w-full')}>
                    {chinese ? ZH_COMMON.quote : 'Request a Quote'}
                  </Link>
                  <a href={`mailto:${COMPANY.email}`} className="block text-sm text-primary underline-offset-4 hover:underline">
                    {COMPANY.email}
                  </a>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {COMPANY.phones.map((phone) => (
                      <a key={phone.href} href={phone.href} className="text-ink hover:text-primary">
                        {phone.display}
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
