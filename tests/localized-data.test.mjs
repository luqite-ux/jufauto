import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

import { localizedStrings } from '../lib/i18n.ts'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('localized array values follow Chinese, English, then first non-empty fallback', () => {
  assert.deepEqual(localizedStrings({ en: ['A'], 'zh-CN': ['甲'] }, 'zh-CN', ['fallback']), ['甲'])
  assert.deepEqual(localizedStrings({ en: ['A'] }, 'zh-CN', ['fallback']), ['A'])
  assert.deepEqual(localizedStrings({ de: ['D'] }, 'zh-CN', ['fallback']), ['D'])
  assert.deepEqual(localizedStrings({}, 'zh-CN', ['fallback']), ['fallback'])
})

test('product and article loaders accept locale and use shared fallback helpers', () => {
  const products = read('lib/products-db.ts')
  const articles = read('lib/articles-db.ts')
  assert.match(products, /fetchProductsData\(locale[^)]*Locale/)
  assert.match(products, /getProductBySlug\(slug:\s*string,\s*locale/)
  assert.match(products, /localizedValue/)
  assert.match(products, /localizedStrings/)
  assert.match(articles, /getPublishedArticles\(locale[^)]*Locale/)
  assert.match(articles, /getArticleBySlug\(slug:\s*string,\s*locale/)
  assert.match(articles, /localizedValue/)
})

test('Chinese product and article detail routes exist with locale SEO', () => {
  for (const path of ['app/zh/products/[slug]/page.tsx', 'app/zh/news/[slug]/page.tsx']) {
    assert.equal(existsSync(new URL(`../${path}`, import.meta.url)), true)
    const source = read(path)
    assert.match(source, /alternateLanguages/)
    assert.match(source, /'zh-CN'/)
    assert.match(source, /application\/ld\+json/)
  }
})
