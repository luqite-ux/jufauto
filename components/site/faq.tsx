import { ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { FAQ_GROUPS } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function FaqGroups({ groups = FAQ_GROUPS }: { groups?: typeof FAQ_GROUPS }) {
  return (
    <div className={cn('grid gap-x-10 gap-y-10', groups.length > 1 && 'lg:grid-cols-2')}>
      {groups.map((group, gi) => (
        <Reveal key={group.title} index={gi % 2} as="div">
          <h3 className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal-ink">
            <span className="tabular-nums text-primary">{String(gi + 1).padStart(2, '0')}</span>
            {group.title}
          </h3>
          <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-white">
            {group.items.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-3 text-left text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:px-5">
                  {item.q}
                  <ChevronDown
                    className="faq-chevron size-5 shrink-0 text-primary transition-transform duration-200"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </summary>
                <p className="faq-body px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-5">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
