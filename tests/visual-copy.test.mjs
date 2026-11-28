import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

async function source(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8')
}

test('captcha field keeps English as the default and scopes Chinese copy to zh-CN', async () => {
  const component = [
    await source('components/inquiry-captcha-field.tsx'),
    await source('app/api/captcha/route.ts'),
    await source('lib/inquiry-captcha.ts'),
  ].join('\n')
  assert.match(component, /locale = 'en'/)
  assert.match(component, /locale === 'zh-CN'/)
  assert.match(component, /图片验证码/)
  assert.match(component, /Security check/)
  assert.match(component, /Enter the 4-character code/)
  assert.match(component, /Refresh code/)
  assert.match(component, /sm:w-64/)
})

test('product-family cards use a balanced three-column desktop grid and product counts', async () => {
  const component = await source('components/home/catalogue-sections.tsx')
  assert.match(component, /lg:grid-cols-3/)
  assert.doesNotMatch(component, /lg:grid-cols-4/)
  assert.match(component, /count === 1 \? 'product' : 'products'/)
  assert.doesNotMatch(component, /catalogue items?/)
})

test('database product families receive professional buyer-facing presentation copy for seven core business lines', async () => {
  const loader = await source('lib/products-db.ts')
  for (const copy of [
    'Custom Automation Equipment',
    'Standard Products: Tightening & Feeding',
    'UAV & Vehicle-Mounted Tablets',
    'Robotic System Integration',
    'Forming Machines \\(Standard Equipment\\)',
    'Batch Heavy Machining & OEM Processing',
    'Control Software, Electrical Cabinets & Technical Services',
  ]) {
    assert.match(loader, new RegExp(copy))
  }
  assert.doesNotMatch(loader, /Explore \$\{.*\} from JUFTECH/)
  assert.match(loader, /familyName: \(locale === 'zh-CN' \? FAMILY_PRESENTATION_ZH : FAMILY_PRESENTATION\)\[normalizedFamily\]\?\.name \|\| row\.category/)
})

test('fallback product families mirror the seven core business lines and hero slides separate UAV tablets from forming machines', async () => {
  const fallback = await source('lib/site-data.ts')
  const zhMessages = await source('lib/messages.ts')
  for (const slug of [
    'non-standard-automated-customized-equipment',
    'standard-tightening-feeding',
    'unmanned-aerial-vehicle-onboard-control-tablet',
    'robot-system-integration',
    'forming-machine',
    'heavy-machinery-processing',
    'outsourcing-services-for-control-software-plc-labview-c',
  ]) {
    assert.match(fallback, new RegExp(`slug: '${slug}'`))
  }
  assert.match(fallback, /\{ value: '7', label: 'Core business lines'/)
  assert.doesNotMatch(fallback, /Machined Parts for UAV Tablets and Forming Equipment/)
  assert.doesNotMatch(zhMessages, /无人机平板与成型机加工配件/)
  assert.match(zhMessages, /非标自动化定制设备与产线集成/)
  assert.match(zhMessages, /皮带成型机与模压成型机/)
  assert.match(zhMessages, /东南亚纺织服装厂智能缝制自动化升级方案集成/)
  assert.match(zhMessages, /控制软件开发、电柜制作与技术服务/)
})
