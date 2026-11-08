import { PRODUCT_FAMILIES, PRODUCTS, type Product, type ProductFamily } from '@/lib/site-data'
import { getSupabaseClient } from '@/lib/supabase'
import { localizedStrings, localizedValue, type Locale } from '@/lib/i18n'

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

const FAMILY_PRESENTATION_ZH: Record<string, Pick<ProductFamily, 'name' | 'short' | 'description'>> = {
  'non-standard-automated-customized-equipment': { name: '非标自动化定制设备', short: '围绕工件、工艺与现场布局设计的装配设备和生产线。', description: '根据工件、工艺顺序及现场空间配置定制工作站和生产线。' },
  'tighten-the-assembly-module-and-tools': { name: '装配锁付模块与工具', short: '用于装配工作站和生产线集成的自动锁螺丝模块与工具。', description: '将锁付模块与供料、控制及周边装配工艺协同集成。' },
  feeder: { name: '供料系统', short: '将紧固件和小型零件稳定输送至自动化装配工位。', description: '根据零件形状、姿态要求和后续工艺配置供料系统。' },
  'tighten-function-attachments': { name: '锁付功能附件', short: '用于螺钉供料、定位、导向和受控锁付的配套附件。', description: '根据稳定锁付、零件输送及设备操作空间选择配套附件。' },
  'unmanned-aerial-vehicle-onboard-control-tablet': { name: '加固型与车载平板', short: '适用于车载、现场控制和复杂移动环境的加固型终端。', description: '面向现场作业、车辆安装和工业控制界面的平板终端。' },
  'robot-system-integration': { name: '机器人系统集成', short: '将机器人单元与工装、供料、安全防护和生产控制集成。', description: '根据应用任务组合机器人、工具、控制及安全防护系统。' },
  'forming-machine': { name: '成型设备', short: '配置电气控制、防护结构和应用工装的成型设备。', description: '根据材料、工艺和现场运行条件配置成型设备。' },
  'heavy-machinery-processing': { name: '大型机械加工', short: '使用龙门类机床为大型及重型部件提供加工服务。', description: '为需要大行程和承载能力的重型工件提供加工支持。' },
  'outsourcing-services-for-control-software-plc-labview-c': { name: '工业控制软件开发', short: '面向自动化设备、监控和生产系统的 PLC、LabVIEW 与 C# 开发。', description: '围绕设备逻辑、数据采集和操作流程开发工业控制软件。' },
}

export async function fetchProductsData(locale: Locale = 'en'): Promise<{ products: Product[]; families: ProductFamily[]; source: 'database' | 'fallback' }> {
  const db = getSupabaseClient()
  if (!db || !TENANT_ID) return { products: PRODUCTS, families: PRODUCT_FAMILIES, source: 'fallback' }
  const [categoryResult, productResult] = await Promise.all([
    db.from('product_categories').select('*').eq('tenant_id', TENANT_ID).eq('is_active', true).order('sort_order'),
    db.from('products').select('*').eq('tenant_id', TENANT_ID).eq('is_active', true).order('sort_order'),
  ])
  if (categoryResult.error || productResult.error) return { products: PRODUCTS, families: PRODUCT_FAMILIES, source: 'fallback' }
  const families: ProductFamily[] = categoryResult.data.map((row, index) => {
    const presentation = locale === 'zh-CN' ? FAMILY_PRESENTATION_ZH[row.slug] : FAMILY_PRESENTATION[row.slug]
    const databaseDescription = localizedValue(row.description_i18n, locale, row.description_en || row.description)
    return {
      slug: row.slug,
      name: presentation?.name || localizedValue(row.name_i18n, locale, row.name_en || row.name),
      short: presentation?.short || databaseDescription || 'Review the available products or send the engineering team your application requirements.',
      description: presentation?.description || databaseDescription || 'Configuration is confirmed for the application and project requirements.',
      icon: ICONS[index % ICONS.length],
    }
  })
  const products: Product[] = productResult.data.map((row) => {
    const summary = localizedValue(row.description_i18n, locale, row.description_en || row.description)
    const overview = localizedValue(row.overview_i18n, locale, summary)
    const images = [row.image_url, ...(Array.isArray(row.extra_data?.images) ? row.extra_data.images : [])]
      .filter((url, index, all): url is string => typeof url === 'string' && !!url && all.indexOf(url) === index)
      .map((src) => ({ src, alt: locale === 'zh-CN' ? `${localizedValue(row.name_i18n, locale, row.name_en || row.name)} 产品图片` : `${localizedValue(row.name_i18n, locale, row.name_en || row.name)} product image` }))
    const specs = row.specs && typeof row.specs === 'object' ? Object.entries(row.specs).map(([label, value]) => ({ label, value: String(value ?? '') })) : []
    return {
      slug: row.slug,
      name: localizedValue(row.name_i18n, locale, row.name_en || row.name),
      familySlug: row.category_slug,
      familyName: (locale === 'zh-CN' ? FAMILY_PRESENTATION_ZH : FAMILY_PRESENTATION)[row.category_slug]?.name || row.category,
      summary,
      overview: overview ? [overview] : [summary],
      specs,
      features: localizedStrings(row.features_i18n, locale, row.features),
      applications: localizedStrings(row.applications_i18n, locale, row.applications),
      images,
      featured: Number(row.sort_order) <= 6,
    }
  })
  return { products, families, source: 'database' }
}

export async function getProductBySlug(slug: string, locale: Locale = 'en') {
  const data = await fetchProductsData(locale)
  return { ...data, product: data.products.find((item) => item.slug === slug) }
}
