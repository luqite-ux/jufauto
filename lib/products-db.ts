import { PRODUCT_FAMILIES, PRODUCTS, type Product, type ProductFamily } from '@/lib/site-data'
import { getSupabaseClient } from '@/lib/supabase'

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
const ICONS: ProductFamily['icon'][] = ['cog', 'wrench', 'funnel', 'tablet', 'bot', 'hammer', 'drill', 'braces', 'workflow']

function localized(value: Record<string, unknown> | null | undefined, fallback: unknown) {
  if (value && typeof value.en === 'string' && value.en.trim()) return value.en.trim()
  return typeof fallback === 'string' ? fallback : ''
}

function strings(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string' && !!item.trim())
  return []
}

export async function fetchProductsData(): Promise<{ products: Product[]; families: ProductFamily[]; source: 'database' | 'fallback' }> {
  const db = getSupabaseClient()
  if (!db || !TENANT_ID) return { products: PRODUCTS, families: PRODUCT_FAMILIES, source: 'fallback' }
  const [categoryResult, productResult] = await Promise.all([
    db.from('product_categories').select('*').eq('tenant_id', TENANT_ID).eq('is_active', true).order('sort_order'),
    db.from('products').select('*').eq('tenant_id', TENANT_ID).eq('is_active', true).order('sort_order'),
  ])
  if (categoryResult.error || productResult.error) return { products: PRODUCTS, families: PRODUCT_FAMILIES, source: 'fallback' }
  const families: ProductFamily[] = categoryResult.data.map((row, index) => ({
    slug: row.slug,
    name: localized(row.name_i18n, row.name_en || row.name),
    short: localized(row.description_i18n, row.description_en || row.description) || `Explore ${localized(row.name_i18n, row.name_en || row.name)} from JUFTECH.`,
    description: localized(row.description_i18n, row.description_en || row.description) || `Configuration is confirmed for the application and project requirements.`,
    icon: ICONS[index % ICONS.length],
  }))
  const products: Product[] = productResult.data.map((row) => {
    const summary = localized(row.description_i18n, row.description_en || row.description)
    const overview = localized(row.overview_i18n, summary)
    const images = [row.image_url, ...(Array.isArray(row.extra_data?.images) ? row.extra_data.images : [])]
      .filter((url, index, all): url is string => typeof url === 'string' && !!url && all.indexOf(url) === index)
      .map((src) => ({ src, alt: `${localized(row.name_i18n, row.name_en || row.name)} product image` }))
    const specs = row.specs && typeof row.specs === 'object' ? Object.entries(row.specs).map(([label, value]) => ({ label, value: String(value ?? '') })) : []
    return {
      slug: row.slug,
      name: localized(row.name_i18n, row.name_en || row.name),
      familySlug: row.category_slug,
      familyName: row.category,
      summary,
      overview: overview ? [overview] : [summary],
      specs,
      applications: strings(row.applications_i18n?.en ?? row.applications),
      images,
      featured: Number(row.sort_order) <= 6,
    }
  })
  return { products, families, source: 'database' }
}

export async function getProductBySlug(slug: string) {
  const data = await fetchProductsData()
  return { ...data, product: data.products.find((item) => item.slug === slug) }
}
