import type { ReactNode } from 'react'
import { Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  tone = 'light',
}: {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  return (
    <Reveal className={cn('flex flex-col gap-5 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <p
          className={cn(
            'font-mono text-xs font-medium uppercase tracking-[0.16em]',
            dark ? 'text-signal' : 'text-signal-ink',
          )}
        >
          <span className="mr-2 inline-block h-0.5 w-6 -translate-y-[3px] bg-signal align-middle" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className={cn('mt-3 text-[1.75rem] font-semibold leading-tight sm:text-4xl', dark ? 'text-white' : 'text-ink')}>
          {title}
        </h2>
        {description && (
          <p className={cn('mt-4 text-base leading-relaxed', dark ? 'text-white/85' : 'text-muted-foreground')}>
            {description}
          </p>
        )}
      </div>
      {action}
    </Reveal>
  )
}
