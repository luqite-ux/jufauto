import { createClient } from '@supabase/supabase-js'

const TENANT_ID = '98f85dd9-ba33-44b6-86b2-6dc81286d8b3'
const APPLY = process.argv.includes('--apply')
const TARGET = 'zh-CN'
const PROHIBITED = /质保|保修|质量保证|warrant(?:y|ies)|guarantee(?:d)?/i

const CATEGORY_ZH = {
  'non-standard-automated-customized-equipment': ['非标自动化定制设备', '根据工件、工艺顺序和现场空间配置定制工作站及生产线。'],
  'tighten-the-assembly-module-and-tools': ['装配锁付模块与工具', '将自动锁付模块与供料、控制及周边装配工艺协同集成。'],
  feeder: ['供料系统', '根据零件形状、姿态要求和后续工艺配置供料设备。'],
  'tighten-function-attachments': ['锁付功能附件', '用于螺钉供料、定位、导向和受控锁付的配套附件。'],
  'unmanned-aerial-vehicle-onboard-control-tablet': ['加固型与车载平板', '适用于现场作业、车辆安装和工业控制界面的终端设备。'],
  'robot-system-integration': ['机器人系统集成', '将机器人、工装、供料、安全防护和控制系统组合为应用单元。'],
  'forming-machine': ['成型设备', '根据材料、工艺和现场运行条件配置成型设备。'],
  'heavy-machinery-processing': ['大型机械加工', '为需要大行程和承载能力的重型工件提供加工支持。'],
  'outsourcing-services-for-control-software-plc-labview-c': ['工业控制软件开发', '围绕设备逻辑、数据采集和操作流程开发 PLC、LabVIEW 与 C# 控制软件。'],
}

const SITE_ZH = {
  site_title_i18n: '九峰自动化｜工业自动化设备与控制系统',
  site_tagline_i18n: '围绕工艺需求提供自动化设备与系统集成',
  site_description_i18n: '苏州工业园区九峰自动化技术有限公司提供非标自动化设备、锁付与供料系统、机器人集成、成型设备、大型加工及工业控制软件。',
  seo_title_i18n: '九峰自动化｜非标自动化设备、锁付供料与机器人集成',
  seo_description_i18n: '了解九峰自动化的非标设备、自动锁付、供料系统、机器人集成、成型设备、大型加工和工业控制软件。',
  contact_address_i18n: '中国江苏省苏州工业园区东富路33号',
}

function required(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} is required`)
  return value
}

export function existingChinese(value) {
  if (!value || typeof value !== 'object') return undefined
  for (const key of [TARGET, 'zh_CN', 'zh']) {
    const candidate = value[key]
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim()
    if (Array.isArray(candidate) && candidate.some((item) => typeof item === 'string' && item.trim())) {
      return candidate.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim())
    }
  }
}

function english(value, fallback) {
  if (value && typeof value === 'object' && typeof value.en === 'string' && value.en.trim()) return value.en.trim()
  return typeof fallback === 'string' ? fallback.trim() : ''
}

function englishList(value, fallback) {
  const candidate = value && typeof value === 'object' ? value.en : undefined
  const source = Array.isArray(candidate) ? candidate : Array.isArray(fallback) ? fallback : []
  return source.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim())
}

export function scanProhibited(value, label) {
  const text = JSON.stringify(value)
  if (PROHIBITED.test(text)) throw new Error(`Prohibited commitment found in ${label}`)
}

function mergeLanguage(value, translated) {
  return { ...(value && typeof value === 'object' ? value : {}), [TARGET]: translated }
}

function manualFields(extraSettings) {
  const value = extraSettings?.site_settings_manual_fields
  if (Array.isArray(value)) return new Set(value.map(String))
  if (value && typeof value === 'object') return new Set(Object.keys(value).filter((key) => value[key]))
  return new Set()
}

async function translateBatch(items) {
  if (!items.length) return []
  const apiKey = required('DEEPSEEK_API_KEY')
  const base = (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com').replace(/\/$/, '')
  const response = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: '你是工业自动化领域的严谨翻译。将英文产品资料翻译为简洁自然的简体中文 B2B 表达。只翻译输入事实，不新增参数、设备、认证、能力或商业承诺。品牌、型号、数字、单位、标准和认证编号保持原样。严禁出现质保、保修、warranty、guarantee 或同义承诺。严格返回 JSON：{"items":[{"id":"...","name":"...","description":"...","overview":"...","features":["..."],"applications":["..."]}]}。' },
        { role: 'user', content: JSON.stringify({ reference: { company: '苏州工业园区九峰自动化技术有限公司', brand: 'JUFTECH', industry: '工业自动化设备、锁付供料、机器人集成与控制软件' }, items }) },
      ],
    }),
  })
  if (!response.ok) throw new Error(`DeepSeek request failed with status ${response.status}`)
  const payload = await response.json()
  const content = payload.choices?.[0]?.message?.content
  const parsed = JSON.parse(content)
  if (!Array.isArray(parsed.items) || parsed.items.length !== items.length) throw new Error('DeepSeek returned an incomplete product batch')
  return parsed.items
}

async function main() {
  const db = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } })
  const [tenantResult, categoryResult, productResult] = await Promise.all([
    db.from('tenants').select('*').eq('id', TENANT_ID).single(),
    db.from('product_categories').select('*').eq('tenant_id', TENANT_ID).eq('is_active', true).order('sort_order'),
    db.from('products').select('*').eq('tenant_id', TENANT_ID).eq('is_active', true).order('sort_order'),
  ])
  for (const result of [tenantResult, categoryResult, productResult]) if (result.error) throw result.error

  const tenant = tenantResult.data
  const manual = manualFields(tenant.extra_settings)
  const tenantPatch = {
    supported_languages: Array.from(new Set([...(tenant.supported_languages || []), 'en', TARGET])),
  }
  for (const [field, translated] of Object.entries(SITE_ZH)) {
    if (!manual.has(field) || existingChinese(tenant[field])) tenantPatch[field] = mergeLanguage(tenant[field], existingChinese(tenant[field]) || translated)
  }

  const categoryPatches = categoryResult.data.map((row) => {
    const [name, description] = CATEGORY_ZH[row.slug] || [existingChinese(row.name_i18n), existingChinese(row.description_i18n)]
    return { id: row.id, slug: row.slug, patch: { name_i18n: mergeLanguage(row.name_i18n, existingChinese(row.name_i18n) || name), description_i18n: mergeLanguage(row.description_i18n, existingChinese(row.description_i18n) || description) } }
  })

  const translations = []
  for (let index = 0; index < productResult.data.length; index += 6) {
    const rows = productResult.data.slice(index, index + 6)
    const input = rows.map((row) => ({ id: row.id, name: english(row.name_i18n, row.name_en || row.name), description: english(row.description_i18n, row.description_en || row.description), overview: english(row.overview_i18n, row.overview || row.description), features: englishList(row.features_i18n, row.features), applications: englishList(row.applications_i18n, row.applications) }))
    translations.push(...await translateBatch(input))
  }
  const byId = new Map(translations.map((item) => [item.id, item]))
  const productPatches = productResult.data.map((row) => {
    const translated = byId.get(row.id)
    if (!translated) throw new Error(`Missing translation for product ${row.id}`)
    const patch = {
      name_i18n: mergeLanguage(row.name_i18n, existingChinese(row.name_i18n) || translated.name),
      description_i18n: mergeLanguage(row.description_i18n, existingChinese(row.description_i18n) || translated.description),
      overview_i18n: mergeLanguage(row.overview_i18n, existingChinese(row.overview_i18n) || translated.overview),
      features_i18n: mergeLanguage(row.features_i18n, existingChinese(row.features_i18n) || translated.features || []),
      applications_i18n: mergeLanguage(row.applications_i18n, existingChinese(row.applications_i18n) || translated.applications || []),
    }
    scanProhibited(patch, `product ${row.slug}`)
    return { id: row.id, slug: row.slug, patch }
  })
  scanProhibited({ tenantPatch, categoryPatches }, 'tenant/category patches')

  const summary = { mode: APPLY ? 'apply' : 'dry-run', tenantId: TENANT_ID, tenantFields: Object.keys(tenantPatch), categoryCount: categoryPatches.length, productCount: productPatches.length, supportedLanguages: tenantPatch.supported_languages }
  if (!APPLY) { console.log(JSON.stringify(summary, null, 2)); return }

  const tenantUpdate = await db.from('tenants').update(tenantPatch).eq('id', TENANT_ID).select('id').single()
  if (tenantUpdate.error) throw tenantUpdate.error
  for (const item of categoryPatches) {
    const result = await db.from('product_categories').update(item.patch).eq('tenant_id', TENANT_ID).eq('id', item.id).select('id').single()
    if (result.error) throw result.error
  }
  for (const item of productPatches) {
    const result = await db.from('products').update(item.patch).eq('tenant_id', TENANT_ID).eq('id', item.id).select('id').single()
    if (result.error) throw result.error
  }
  console.log(JSON.stringify(summary, null, 2))
}

main().catch((error) => { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1 })
