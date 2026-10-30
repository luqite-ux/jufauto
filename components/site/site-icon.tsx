import {
  Bot,
  Braces,
  Cable,
  ClipboardList,
  Cog,
  Drill,
  Factory,
  Funnel,
  Hammer,
  Layers,
  Ruler,
  Tablet,
  Truck,
  Workflow,
  Wrench,
  type LucideProps,
} from 'lucide-react'
import type { IconKey } from '@/lib/site-data'

const ICONS = {
  cog: Cog,
  wrench: Wrench,
  funnel: Funnel,
  tablet: Tablet,
  bot: Bot,
  hammer: Hammer,
  drill: Drill,
  braces: Braces,
  clipboard: ClipboardList,
  ruler: Ruler,
  cable: Cable,
  truck: Truck,
  factory: Factory,
  layers: Layers,
  workflow: Workflow,
} as const

export function SiteIcon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Icon = ICONS[name]
  return <Icon strokeWidth={1.5} aria-hidden="true" {...props} />
}

export function IconTile({ name, className = '' }: { name: IconKey; className?: string }) {
  return (
    <span
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-accent text-primary transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-white ${className}`}
    >
      <SiteIcon name={name} className="size-5" />
    </span>
  )
}
