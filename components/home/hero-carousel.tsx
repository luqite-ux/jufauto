'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { HERO_SLIDES, type HeroSlide } from '@/lib/site-data'
import { btnOutline, btnSignal } from '@/lib/ui'
import { cn } from '@/lib/utils'

const controlButton =
  'inline-flex size-11 items-center justify-center rounded-md text-ink transition-[background-color,color,transform] duration-200 hover:bg-accent hover:text-primary active:scale-95 focus-visible:outline-2 focus-visible:outline-ring'

export function HeroCarousel({ slides = HERO_SLIDES }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false)
  const total = slides.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  const go = (next: number) => setIndex((next + total) % total)
  const running = playing && !held

  return (
    <section
      aria-roledescription="carousel"
      aria-label="JUFTECH featured capabilities"
      className="relative border-b border-border bg-white"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <h1 className="sr-only">JUFTECH industrial automation equipment and control systems</h1>

      <div className="grid" aria-live={playing ? 'off' : 'polite'}>
        {slides.map((slide, i) => {
          const active = i === index
          const imageStyle = {
            '--fx-d': `${slide.focusDesktop}%`,
            '--fx-m': `${slide.focusMobile}%`,
          } as CSSProperties
          const right = slide.textSide === 'right'

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={!active}
              inert={!active}
              data-active={active}
              className="hero-slide relative flex flex-col [grid-area:1/1] lg:block lg:h-[clamp(560px,44vw,700px)]"
            >
              <div className="relative h-[240px] overflow-hidden bg-stage sm:h-[340px] lg:absolute lg:inset-0 lg:h-full">
                <Image
                  src={slide.image || '/placeholder.svg'}
                  alt={slide.imageAlt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="hero-img object-cover"
                  style={imageStyle}
                />
              </div>

              <div className="relative bg-white lg:absolute lg:inset-0 lg:flex lg:items-center lg:bg-transparent lg:pb-24 lg:pt-6">
                <div className="wrap w-full py-7 lg:py-0">
                  <div
                    className={cn(
                      'lg:max-w-[540px] lg:rounded-md lg:border lg:border-border lg:bg-white/92 lg:p-9 lg:shadow-[0_18px_50px_-24px_rgba(11,31,58,0.45)] lg:backdrop-blur-sm',
                      right && 'lg:ml-auto',
                    )}
                  >
                    <p
                      className="hero-item font-mono text-xs font-medium uppercase tracking-[0.14em] text-signal-ink"
                      style={{ '--i': 0 } as CSSProperties}
                    >
                      <span className="mr-2 inline-block h-0.5 w-6 -translate-y-[3px] bg-signal align-middle" aria-hidden="true" />
                      {slide.eyebrow}
                    </p>
                    <h2
                      className="hero-item mt-3 text-[1.75rem] font-semibold leading-[1.12] text-ink sm:text-4xl lg:text-[2.5rem]"
                      style={{ '--i': 1 } as CSSProperties}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className="hero-item mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base"
                      style={{ '--i': 2 } as CSSProperties}
                    >
                      {slide.body}
                    </p>
                    <div
                      className="hero-item mt-6 flex flex-col gap-3 sm:flex-row"
                      style={{ '--i': 3 } as CSSProperties}
                    >
                      <Link href={slide.primary.href} className={btnSignal}>
                        {slide.primary.label}
                      </Link>
                      <Link href={slide.secondary.href} className={btnOutline}>
                        {slide.secondary.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-border bg-white lg:absolute lg:inset-x-0 lg:bottom-6 lg:z-10 lg:border-t-0 lg:bg-transparent">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-3 lg:py-0">
          <div className="flex items-center gap-1 rounded-md border border-border bg-white p-1 shadow-sm">
            <button type="button" aria-label="Previous slide" className={controlButton} onClick={() => go(index - 1)}>
              <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              aria-pressed={!playing}
              className={controlButton}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? (
                <Pause className="size-5" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Play className="size-5" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
            <button type="button" aria-label="Next slide" className={controlButton} onClick={() => go(index + 1)}>
              <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>

            <ul className="ml-1 flex items-center border-l border-border pl-1">
              {slides.map((slide, i) => {
                const active = i === index
                return (
                  <li key={slide.id}>
                    <button
                      type="button"
                      aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                      aria-current={active ? 'true' : undefined}
                      onClick={() => go(i)}
                      className="group flex h-11 w-12 items-center justify-center focus-visible:outline-2 focus-visible:outline-ring sm:w-14"
                    >
                      <span
                        className={cn(
                          'relative h-1 w-full overflow-hidden rounded-full transition-colors duration-200',
                          active ? 'bg-primary/20' : 'bg-border group-hover:bg-primary/40',
                        )}
                      >
                        {active && (
                          <span
                            key={`${index}-${playing}`}
                            className="hero-progress absolute inset-0 rounded-full bg-primary"
                            data-state={playing ? 'running' : 'paused'}
                            style={{ animationPlayState: running ? 'running' : 'paused' }}
                            onAnimationEnd={() => go(index + 1)}
                          />
                        )}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <span className="px-2 font-mono text-xs tabular-nums text-muted-foreground" aria-hidden="true">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          <p className="rounded-md bg-white/90 px-2 py-1 text-xs text-muted-foreground lg:border lg:border-border">
            Concept artwork for application overview
          </p>
        </div>
      </div>
    </section>
  )
}
