import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('language switch uses a full document navigation so the root layout locale refreshes', () => {
  const header = read('components/site/site-header.tsx')
  assert.match(header, /<a\s+href=\{switchHref\}/)
  assert.doesNotMatch(header, /<Link\s+href=\{switchHref\}/)
})

test('Chinese logo links and landmark labels stay in the Chinese locale', () => {
  const logo = read('components/site/logo.tsx')
  const header = read('components/site/site-header.tsx')
  const footer = read('components/site/site-footer.tsx')
  const pageHeader = read('components/site/page-header.tsx')
  assert.match(logo, /localePath\('\/',\s*locale\)/)
  assert.match(logo, /JUFTECH\s*首页/)
  assert.match(header, /<LogoLink[^>]*locale=\{chinese\s*\?\s*'zh-CN'\s*:\s*'en'\}/)
  assert.match(header, /chinese\s*\?\s*'主导航'\s*:\s*'Primary'/)
  assert.match(footer, /<LogoLink[^>]*locale=\{locale\}/)
  assert.match(footer, /zh\s*\?\s*'页脚导航'\s*:\s*'Footer'/)
  assert.match(footer, /zh\s*\?\s*'产品分类'\s*:\s*'Product families'/)
  assert.match(pageHeader, /isChinese\s*\?\s*'面包屑导航'\s*:\s*'Breadcrumb'/)
})

test('Chinese solution and gallery accessibility copy is localized', () => {
  const engineering = read('components/home/engineering-sections.tsx')
  const gallery = read('components/site/product-gallery.tsx')
  const hero = read('components/home/hero-carousel.tsx')
  assert.match(engineering, /zh\s*\?\s*'解决方案领域'\s*:\s*'Solution areas'/)
  assert.match(gallery, /产品图片缩略图/)
  assert.match(gallery, /查看第\$\{i \+ 1\}张图片/)
  assert.match(hero, /chinese\s*\?\s*`第\$\{i \+ 1\}张，共\$\{total\}张`/)
  assert.match(gallery, /localeFromPath\(pathname\)/)
})

test('Chinese product specification labels and values are localized', async () => {
  const i18n = await import('../lib/i18n.ts')
  assert.equal(typeof i18n.localizedSpec, 'function')
  const { localizedSpec } = i18n
  assert.deepEqual(localizedSpec('Configuration basis', 'Customised to project requirements', 'zh-CN'), {
    label: '配置依据',
    value: '按项目要求定制',
  })
  assert.deepEqual(localizedSpec('Minimum order quantity', '100', 'zh-CN'), {
    label: '最小起订量',
    value: '100',
  })
  assert.deepEqual(localizedSpec('Configuration basis', 'Customised to project requirements', 'en'), {
    label: 'Configuration basis',
    value: 'Customised to project requirements',
  })
})
