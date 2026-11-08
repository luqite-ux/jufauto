'use client'

import { useLayoutEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { WORKFLOW_STEPS } from '@/lib/site-data'
import { WORKFLOW_STEPS_ZH } from '@/lib/messages'
import type { Locale } from '@/lib/i18n'

/**
 * Default state is `done` (every node lit). If the list is still below the viewport after mount it
 * is set to `idle` and a dedicated IntersectionObserver starts the run once it is reached.
 */
export function Workflow({ locale = 'en' }: { locale?: Locale }) {
  const ref = useRef<HTMLOListElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.getBoundingClientRect()
    if (rect.bottom <= 0 || rect.top < window.innerHeight * 0.85) return

    el.dataset.wf = 'idle'
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.wf = 'run'
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      el.dataset.wf = 'done'
    }
  }, [])

  return (
    <ol ref={ref} data-wf="done" className="relative grid gap-8 lg:grid-cols-5 lg:gap-4">
      <div
        aria-hidden="true"
        className="absolute bottom-[22px] left-[21px] top-[22px] w-0.5 bg-border lg:inset-x-[10%] lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-[21px] lg:h-0.5 lg:w-auto"
      >
        <div className="wf-line-fill absolute inset-0 bg-primary" />
        <span className="wf-signal absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_0_4px_rgba(245,130,32,0.25)] lg:left-0 lg:top-1/2 lg:translate-x-0" />
      </div>

      {(locale === 'zh-CN' ? WORKFLOW_STEPS_ZH : WORKFLOW_STEPS).map((step, i) => (
        <li
          key={step.title}
          className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-5 lg:text-center"
          style={{ '--i': i } as CSSProperties}
        >
          <span className="wf-node relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary font-mono text-sm font-medium text-white">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-base font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
