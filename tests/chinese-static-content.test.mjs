import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('provides all seven Chinese static route entrypoints', () => {
  for (const path of ['app/zh/page.tsx', 'app/zh/products/page.tsx', 'app/zh/solutions/page.tsx', 'app/zh/capabilities/page.tsx', 'app/zh/about/page.tsx', 'app/zh/news/page.tsx', 'app/zh/contact/page.tsx']) {
    assert.equal(existsSync(new URL(`../${path}`, import.meta.url)), true, `${path} missing`)
  }
})

test('Chinese dictionary covers navigation, inquiry, captcha, and homepage conversion copy', () => {
  const source = read('lib/messages.ts')
  for (const text of ['首页', '产品中心', '解决方案', '能力与服务', '关于九峰', '新闻资讯', '联系我们', '获取报价', '图片验证码', '提交需求', '自动化设备']) {
    assert.match(source, new RegExp(text))
  }
  assert.doesNotMatch(source, /质保|保修|warranty|guarantee/i)
})

test('language switcher preserves the current pathname through localePath', () => {
  const source = read('components/site/site-header.tsx')
  assert.match(source, /localePath\(pathname,\s*chinese\s*\?\s*'en'\s*:\s*'zh-CN'\)/)
  assert.match(source, /中文|EN/)
})

test('Chinese pages declare reciprocal language alternates', () => {
  for (const path of ['app/zh/page.tsx', 'app/zh/products/page.tsx', 'app/zh/solutions/page.tsx', 'app/zh/capabilities/page.tsx', 'app/zh/about/page.tsx', 'app/zh/news/page.tsx', 'app/zh/contact/page.tsx']) {
    assert.match(read(path), /alternateLanguages/)
  }
})
