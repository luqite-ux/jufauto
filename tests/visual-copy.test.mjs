import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

async function source(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8')
}

test('English captcha field contains no Chinese UI copy', async () => {
  const component = [
    await source('components/inquiry-captcha-field.tsx'),
    await source('app/api/captcha/route.ts'),
    await source('lib/inquiry-captcha.ts'),
  ].join('\n')
  for (const text of ['验证码', '输入验证码', '换一张', '正在加载', '加载失败']) {
    assert.equal(component.includes(text), false, `unexpected Chinese copy: ${text}`)
  }
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

test('database product families receive professional buyer-facing presentation copy', async () => {
  const loader = await source('lib/products-db.ts')
  for (const copy of [
    'Custom Automation Equipment',
    'Assembly Tightening Modules & Tools',
    'Feeding Systems',
    'Tightening Accessories',
    'Rugged & Vehicle-Mounted Tablets',
    'Robotic System Integration',
    'Forming Machines',
    'Heavy Machining',
    'Industrial Control Software Development',
  ]) {
    assert.match(loader, new RegExp(copy.replace(/[&]/g, '\\&')))
  }
  assert.doesNotMatch(loader, /Explore \$\{.*\} from JUFTECH/)
  assert.match(loader, /familyName: FAMILY_PRESENTATION\[row\.category_slug\]\?\.name \|\| row\.category/)
})

test('fallback product families mirror the nine production family slugs', async () => {
  const fallback = await source('lib/site-data.ts')
  for (const slug of [
    'non-standard-automated-customized-equipment',
    'tighten-the-assembly-module-and-tools',
    'feeder',
    'tighten-function-attachments',
    'unmanned-aerial-vehicle-onboard-control-tablet',
    'robot-system-integration',
    'forming-machine',
    'heavy-machinery-processing',
    'outsourcing-services-for-control-software-plc-labview-c',
  ]) {
    assert.match(fallback, new RegExp(`slug: '${slug}'`))
  }
  assert.doesNotMatch(fallback, /eyebrow: 'Eight product families'/)
  assert.doesNotMatch(fallback, /\{ value: '8', label: 'Product families'/)
  assert.match(fallback, /\{ value: '9', label: 'Product families'/)
})
