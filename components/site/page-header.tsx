import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'

export function PageHeader({
  title,
  description,
  eyebrow,
  crumbs,
  children,
  locale = 'en',
}: {
  title: string
  description?: string
  eyebrow?: string
  crumbs: { label: string; href?: string }[]
  children?: ReactNode
  locale?: Locale
}) {
  const isChinese = locale === 'zh-CN' || crumbs.some((crumb) => /[\u3400-\u9fff]/u.test(crumb.label))

  return (
    <section className="blueprint relative border-b border-border bg-stage">
      <div className="wrap py-10 md:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href={isChinese ? '/zh' : '/'} className="transition-colors duration-200 hover:text-primary">
                {isChinese ? '首页' : 'Home'}
              </Link>
            </li>
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                {crumb.href && i < crumbs.length - 1 ? (
                  <Link href={crumb.href} className="transition-colors duration-200 hover:text-primary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal-ink">
            <span className="mr-2 inline-block h-0.5 w-6 -translate-y-[3px] bg-signal align-middle" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>}
        {children}
      </div>
    </section>
  )
}
