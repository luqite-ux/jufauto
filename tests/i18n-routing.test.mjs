import assert from 'node:assert/strict'
import test from 'node:test'

import {
  alternateLanguages,
  localeFromPath,
  localePath,
  localizedValue,
  normalizeLocale,
} from '../lib/i18n.ts'

test('normalizes supported locale aliases', () => {
  assert.equal(normalizeLocale('zh'), 'zh-CN')
  assert.equal(normalizeLocale('zh-cn'), 'zh-CN')
  assert.equal(normalizeLocale('en-US'), 'en')
  assert.equal(normalizeLocale('fr'), 'en')
})

test('detects the locale from public paths without localizing protected routes', () => {
  assert.equal(localeFromPath('/zh/products'), 'zh-CN')
  assert.equal(localeFromPath('/products'), 'en')
  assert.equal(localePath('/admin/login', 'zh-CN'), '/admin/login')
  assert.equal(localePath('/api/inquiries', 'zh-CN'), '/api/inquiries')
  assert.equal(localePath('/service-expired', 'zh-CN'), '/service-expired')
})

test('prefixes and unprefixes locale paths idempotently', () => {
  assert.equal(localePath('/', 'zh-CN'), '/zh')
  assert.equal(localePath('/products', 'zh-CN'), '/zh/products')
  assert.equal(localePath('/zh/products', 'zh-CN'), '/zh/products')
  assert.equal(localePath('/zh/products', 'en'), '/products')
  assert.equal(localePath('/zh', 'en'), '/')
})

test('builds reciprocal canonical language alternates', () => {
  assert.deepEqual(alternateLanguages('/zh/products'), {
    en: 'https://jufauto.com/products',
    'zh-CN': 'https://jufauto.com/zh/products',
    'x-default': 'https://jufauto.com/products',
  })
})

test('uses requested locale, English, then the first non-empty translation', () => {
  assert.equal(localizedValue({ en: 'English', 'zh-CN': '中文' }, 'zh-CN', 'fallback'), '中文')
  assert.equal(localizedValue({ en: 'English' }, 'zh-CN', 'fallback'), 'English')
  assert.equal(localizedValue({ de: 'Deutsch' }, 'zh-CN', 'fallback'), 'Deutsch')
  assert.equal(localizedValue({}, 'zh-CN', 'fallback'), 'fallback')
})
