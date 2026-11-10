export type Locale = 'en' | 'zh-CN'

export const DEFAULT_LOCALE: Locale = 'en'
export const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'zh-CN']
export const SITE_ORIGIN = 'https://jufauto.com'

const UNLOCALIZED_PREFIXES = ['/admin', '/api', '/service-expired']

export function normalizeLocale(value: unknown): Locale {
  const normalized = String(value ?? '').trim().toLowerCase()
  return normalized === 'zh' || normalized === 'zh-cn' || normalized === 'zh_cn'
    ? 'zh-CN'
    : DEFAULT_LOCALE
}

export function localeFromPath(pathname: string): Locale {
  return pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh-CN' : DEFAULT_LOCALE
}

function splitSuffix(value: string) {
  const index = value.search(/[?#]/)
  return index === -1 ? { pathname: value, suffix: '' } : { pathname: value.slice(0, index), suffix: value.slice(index) }
}

export function localePath(path: string, locale: Locale): string {
  const { pathname: rawPathname, suffix } = splitSuffix(path || '/')
  const pathname = rawPathname.startsWith('/') ? rawPathname : `/${rawPathname}`
  if (UNLOCALIZED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return `${pathname}${suffix}`
  }
  const withoutChinese = pathname === '/zh' ? '/' : pathname.replace(/^\/zh(?=\/)/, '')
  if (locale === 'en') return `${withoutChinese || '/'}${suffix}`
  return `${withoutChinese === '/' ? '/zh' : `/zh${withoutChinese}`}${suffix}`
}

export function alternateLanguages(path: string) {
  return {
    en: `${SITE_ORIGIN}${localePath(path, 'en')}`,
    'zh-CN': `${SITE_ORIGIN}${localePath(path, 'zh-CN')}`,
    'x-default': `${SITE_ORIGIN}${localePath(path, 'en')}`,
  }
}

export function localizedValue(
  value: Record<string, unknown> | null | undefined,
  locale: Locale,
  fallback: unknown = '',
): string {
  const candidates = locale === 'zh-CN' ? ['zh-CN', 'zh_CN', 'zh', 'en'] : ['en']
  for (const key of candidates) {
    const candidate = value?.[key]
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim()
  }
  for (const candidate of Object.values(value ?? {})) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim()
  }
  return typeof fallback === 'string' ? fallback.trim() : ''
}

export function localizedStrings(
  value: Record<string, unknown> | null | undefined,
  locale: Locale,
  fallback: unknown = [],
): string[] {
  const candidates = locale === 'zh-CN' ? ['zh-CN', 'zh_CN', 'zh', 'en'] : ['en']
  for (const key of candidates) {
    const result = toStrings(value?.[key])
    if (result.length) return result
  }
  for (const candidate of Object.values(value ?? {})) {
    const result = toStrings(candidate)
    if (result.length) return result
  }
  return toStrings(fallback)
}

const SPEC_LABELS_ZH: Record<string, string> = {
  'Configuration basis': '配置依据',
  'Minimum order quantity': '最小起订量',
}

const SPEC_VALUES_ZH: Record<string, string> = {
  'Customised to project requirements': '按项目要求定制',
}

export function localizedSpec(label: string, value: string, locale: Locale): { label: string; value: string } {
  if (locale !== 'zh-CN') return { label, value }
  return {
    label: SPEC_LABELS_ZH[label] ?? label,
    value: SPEC_VALUES_ZH[value] ?? value,
  }
}

function toStrings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string' && Boolean(item.trim())).map((item) => item.trim())
    : []
}
