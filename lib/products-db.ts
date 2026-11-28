import { normalizeFamilySlug, PRODUCT_FAMILIES, PRODUCTS, type Product, type ProductFamily } from '@/lib/site-data'
import { getSupabaseClient } from '@/lib/supabase'
import { localizedSpec, localizedStrings, localizedValue, type Locale } from '@/lib/i18n'

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID?.trim()

const FAMILY_PRESENTATION: Record<string, Pick<ProductFamily, 'name' | 'short' | 'description'>> = {
  'non-standard-automated-customized-equipment': {
    name: 'Custom Automation Equipment',
    short: 'Non-standard assembly stations and custom production lines engineered around your workpiece, process and layout.',
    description: 'Custom stations and lines developed around the workpiece, process sequence and available production space.',
  },
  'standard-tightening-feeding': {
    name: 'Standard Products: Tightening & Feeding',
    short: 'Standardized tightening units, feeding systems and fastening accessories for reliable automated assembly.',
    description: 'Automatic screw-tightening modules, bowl and step feeders, and supporting fastening accessories configured as standard units or integrated subsystems.',
  },
  'tighten-the-assembly-module-and-tools': {
    name: 'Standard Products: Tightening & Feeding',
    short: 'Standardized tightening units, feeding systems and fastening accessories for reliable automated assembly.',
    description: 'Fastening modules and tools integrated with feeding, controls and the surrounding assembly process.',
  },
  feeder: {
    name: 'Standard Products: Tightening & Feeding',
    short: 'Standardized tightening units, feeding systems and fastening accessories for reliable automated assembly.',
    description: 'Feeding systems configured for the part geometry, required orientation and downstream process.',
  },
  'tighten-function-attachments': {
    name: 'Standard Products: Tightening & Feeding',
    short: 'Standardized tightening units, feeding systems and fastening accessories for reliable automated assembly.',
    description: 'Accessories selected to support stable fastening, part presentation and operator or machine access.',
  },
  'unmanned-aerial-vehicle-onboard-control-tablet': {
    name: 'UAV & Vehicle-Mounted Tablets',
    short: 'Rugged industrial tablets for UAV ground control, vehicle-mounted operation and demanding field environments.',
    description: 'Tablet terminals engineered for UAV control, vehicle installation and field data display.',
  },
  'robot-system-integration': {
    name: 'Robotic System Integration',
    short: 'Robot cells and handling systems integrated with tooling, feeding, safety and production controls.',
    description: 'Robot-based systems assembled with the tooling, controls and safeguards required by the application.',
  },
  'forming-machine': {
    name: 'Forming Machines (Standard Equipment)',
    short: 'Standard forming equipment focused on belt forming machines and compression molding machines.',
    description: 'Standard forming machines—especially belt forming machines and compression molding machines—supplied with electrical controls and guarded structures.',
  },
  'heavy-machinery-processing': {
    name: 'Batch Heavy Machining & OEM Processing',
    short: 'Batch heavy-machinery part machining and OEM custom processing to your drawings or samples.',
    description: 'Large-format gantry machining and batch OEM custom processing for heavy structural components and stocked machinery spare parts.',
  },
  'outsourcing-services-for-control-software-plc-labview-c': {
    name: 'Control Software, Electrical Cabinets & Technical Services',
    short: 'Industrial control software, electrical cabinet fabrication and automation upgrade technical services.',
    description: 'PLC, LabVIEW and C# control software development, custom electrical control cabinets, and turnkey automation upgrade technical services.',
  },
}

const FAMILY_PRESENTATION_ZH: Record<string, Pick<ProductFamily, 'name' | 'short' | 'description'>> = {
  'non-standard-automated-customized-equipment': {
    name: '非标自动化',
    short: '围绕工件、工艺与现场布局定制非标自动化单机与生产线。',
    description: '根据工件、工艺顺序及现场空间配置非标自动化定制设备与多工位生产线。',
  },
  'standard-tightening-feeding': {
    name: '标准产品（拧紧单元、供料系统）',
    short: '标准化拧紧单元、供料系统及配套锁付功能附件，支持独立选型或产线集成。',
    description: '涵盖自动锁付拧紧单元、振动盘/阶梯/滚筒供料系统及相关功能附件，适配各类装配工位。',
  },
  'tighten-the-assembly-module-and-tools': {
    name: '标准产品（拧紧单元、供料系统）',
    short: '标准化拧紧单元、供料系统及配套锁付功能附件。',
    description: '将拧紧单元与供料、控制及周边装配工艺协同集成。',
  },
  feeder: {
    name: '标准产品（拧紧单元、供料系统）',
    short: '标准化拧紧单元、供料系统及配套锁付功能附件。',
    description: '根据零件形状、姿态要求和后续工艺配置供料系统。',
  },
  'tighten-function-attachments': {
    name: '标准产品（拧紧单元、供料系统）',
    short: '标准化拧紧单元、供料系统及配套锁付功能附件。',
    description: '用于稳定锁付、零件输送及工位操作的配套附件。',
  },
  'unmanned-aerial-vehicle-onboard-control-tablet': {
    name: '无人机和车载平板',
    short: '适用于无人机地面站控制、车载作业与复杂现场环境的加固型平板终端。',
    description: '面向无人机操控、车载安装和现场数据采集的工业级三防平板与手持终端。',
  },
  'robot-system-integration': {
    name: '机器人系统集成',
    short: '将机器人单元与工装、供料、安全防护和生产控制集成。',
    description: '根据应用任务组合机器人、末端工具、控制及安全防护系统。',
  },
  'forming-machine': {
    name: '成型机（标准设备）',
    short: '标准成型设备制造，重点聚焦皮带成型机与模压成型机。',
    description: '提供皮带成型机、模压成型机等标准成型设备及配套电控与安全防护结构。',
  },
  'heavy-machinery-processing': {
    name: '批量重型机械加工、OEM定制加工',
    short: '重型机械部件批量龙门机加工、现货备件及按图/按样 OEM 定制加工。',
    description: '为大型及重型结构件提供大行程龙门批量机加工与 OEM 定制加工服务。',
  },
  'outsourcing-services-for-control-software-plc-labview-c': {
    name: '控制软件开发、电柜制作与技术服务',
    short: '工业控制软件开发、电气控制柜制作及东南亚纺织智能缝制升级等自动化技术服务。',
    description: '提供 PLC/LabVIEW/C# 控制软件开发、电柜成套制作及整线自动化升级技术服务。',
  },
}

function buildCoreFamilies(locale: Locale): ProductFamily[] {
  const presentationMap = locale === 'zh-CN' ? FAMILY_PRESENTATION_ZH : FAMILY_PRESENTATION
  return PRODUCT_FAMILIES.map((family) => {
    const p = presentationMap[family.slug]
    return {
      ...family,
      name: p?.name || family.name,
      short: p?.short || family.short,
      description: p?.description || family.description,
    }
  })
}

export async function fetchProductsData(locale: Locale = 'en'): Promise<{ products: Product[]; families: ProductFamily[]; source: 'database' | 'fallback' }> {
  const families = buildCoreFamilies(locale)
  const db = getSupabaseClient()
  if (!db || !TENANT_ID) {
    return {
      products: PRODUCTS.map((p) => ({ ...p, familySlug: normalizeFamilySlug(p.familySlug) || p.familySlug })),
      families,
      source: 'fallback',
    }
  }
  const [categoryResult, productResult] = await Promise.all([
    db.from('product_categories').select('*').eq('tenant_id', TENANT_ID).eq('is_active', true).order('sort_order'),
    db.from('products').select('*').eq('tenant_id', TENANT_ID).eq('is_active', true).order('sort_order'),
  ])
  if (categoryResult.error || productResult.error) {
    return {
      products: PRODUCTS.map((p) => ({ ...p, familySlug: normalizeFamilySlug(p.familySlug) || p.familySlug })),
      families,
      source: 'fallback',
    }
  }
  const products: Product[] = productResult.data.map((row) => {
    const normalizedFamily = normalizeFamilySlug(row.category_slug) || row.category_slug
    const summary = localizedValue(row.description_i18n, locale, row.description_en || row.description)
    const overview = localizedValue(row.overview_i18n, locale, summary)
    const images = [row.image_url, ...(Array.isArray(row.extra_data?.images) ? row.extra_data.images : [])]
      .filter((url, index, all): url is string => typeof url === 'string' && !!url && all.indexOf(url) === index)
      .map((src) => ({ src, alt: locale === 'zh-CN' ? `${localizedValue(row.name_i18n, locale, row.name_en || row.name)} 产品图片` : `${localizedValue(row.name_i18n, locale, row.name_en || row.name)} product image` }))
    const specs = row.specs && typeof row.specs === 'object'
      ? Object.entries(row.specs).map(([label, value]) => localizedSpec(label, String(value ?? ''), locale))
      : []
    return {
      slug: row.slug,
      name: localizedValue(row.name_i18n, locale, row.name_en || row.name),
      familySlug: normalizedFamily,
      familyName: (locale === 'zh-CN' ? FAMILY_PRESENTATION_ZH : FAMILY_PRESENTATION)[normalizedFamily]?.name || row.category,
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
