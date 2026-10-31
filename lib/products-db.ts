import { PRODUCT_FAMILIES, PRODUCTS, type Product, type ProductFamily } from '@/lib/site-data'
import { getSupabaseClient } from '@/lib/supabase'

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
const ICONS: ProductFamily['icon'][] = ['cog', 'wrench', 'funnel', 'tablet', 'bot', 'hammer', 'drill', 'braces', 'workflow']

const FAMILY_PRESENTATION: Record<string, Pick<ProductFamily, 'name' | 'short' | 'description'>> = {
  'non-standard-automated-customized-equipment': {
    name: 'Custom Automation Equipment',
    short: 'Purpose-built assembly equipment and production lines configured around your part, process and plant layout.',
    description: 'Custom stations and lines developed around the workpiece, process sequence and available production space.',
  },
  'tighten-the-assembly-module-and-tools': {
    name: 'Assembly Tightening Modules & Tools',
    short: 'Automatic screw-fastening modules and tools for integration into assembly stations and production lines.',
    description: 'Fastening modules and tools integrated with feeding, controls and the surrounding assembly process.',
  },
  feeder: {
    name: 'Feeding Systems',
    short: 'Feeding equipment that presents fasteners and small parts reliably to automated assembly stations.',
    description: 'Feeding systems configured for the part geometry, required orientation and downstream process.',
  },
  'tighten-function-attachments': {
    name: 'Tightening Accessories',
    short: 'Supporting accessories for screw feeding, positioning, alignment and controlled fastening operations.',
    description: 'Accessories selected to support stable fastening, part presentation and operator or machine access.',
  },
  'unmanned-aerial-vehicle-onboard-control-tablet': {
    name: 'Rugged & Vehicle-Mounted Tablets',
    short: 'Rugged tablet terminals for vehicle-mounted, field-control and demanding mobile applications.',
    description: 'Tablet terminals designed for field work, vehicle installation and industrial control interfaces.',
  },
  'robot-system-integration': {
    name: 'Robotic System Integration',
    short: 'Robot cells and handling systems integrated with tooling, feeding, safety and production controls.',
    description: 'Robot-based systems assembled with the tooling, controls and safeguards required by the application.',
  },
  'forming-machine': {
    name: 'Forming Machines',
    short: 'Forming equipment supplied with electrical controls, guarded structures and application-specific tooling.',
    description: 'Forming machines configured around the material, process requirements and plant operating conditions.',
  },
  'heavy-machinery-processing': {
    name: 'Heavy Machining',
    short: 'Large-format machining services for heavy components using gantry-type machine tools.',
    description: 'Machining support for large and heavy workpieces that require substantial travel and load capacity.',
  },
  'outsourcing-services-for-control-software-plc-labview-c': {
    name: 'Industrial Control Software Development',
    short: 'PLC, LabVIEW and C# development services for automated equipment, monitoring and production systems.',
    description: 'Control and industrial software developed around equipment logic, data collection and operator workflows.',
  },
}

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
  const families: ProductFamily[] = categoryResult.data.map((row, index) => {
    const presentation = FAMILY_PRESENTATION[row.slug]
    const databaseDescription = localized(row.description_i18n, row.description_en || row.description)
    return {
      slug: row.slug,
      name: presentation?.name || localized(row.name_i18n, row.name_en || row.name),
      short: presentation?.short || databaseDescription || 'Review the available products or send the engineering team your application requirements.',
      description: presentation?.description || databaseDescription || 'Configuration is confirmed for the application and project requirements.',
      icon: ICONS[index % ICONS.length],
    }
  })
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
      familyName: FAMILY_PRESENTATION[row.category_slug]?.name || row.category,
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
