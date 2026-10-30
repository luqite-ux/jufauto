'use client'

import { createElement, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type RevealProps = {
  as?: 'div' | 'li' | 'article' | 'section' | 'ul' | 'ol' | 'header' | 'figure' | 'dl'
  index?: number
  className?: string
  children: ReactNode
  id?: string
}

/**
 * Content is visible by default (server render and no-JS). After mount, an element that is still
 * below the viewport is hidden and revealed by its own IntersectionObserver. Elements already in
 * or above the viewport are left alone. There is no timer, so an element can never be marked
 * as revealed before the user actually reaches it.
 */
export function Reveal({ as = 'div', index = 0, className, children, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.getBoundingClientRect()
    if (rect.bottom <= 0 || rect.top < window.innerHeight * 0.92) return

    el.dataset.reveal = 'hidden'
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.reveal = 'shown'
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      delete el.dataset.reveal
    }
  }, [])

  const style = { '--reveal-delay': `${Math.min(Math.max(index, 0), 4) * 60}ms` } as CSSProperties

  return createElement(as, { ref, className, style, id }, children)
}
