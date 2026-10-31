import assert from 'node:assert/strict'
import test from 'node:test'
import { PRODUCT_CONTENT, CASE_STUDIES, PROCUREMENT_FAQ } from '../content/juftech-content.mjs'

const publicCopy = JSON.stringify({ PRODUCT_CONTENT, CASE_STUDIES, PROCUREMENT_FAQ })
const prohibited = [/\b(?:warranty|warranties|guarantee|guaranteed)\b/i, /质保|保修/, /Bosch|BorgWarner|Magna|HUF|博世|博格华纳|麦格纳|霍富/i]

test('maps all 48 active catalogue products once', () => {
  assert.equal(PRODUCT_CONTENT.length, 48)
  assert.equal(new Set(PRODUCT_CONTENT.map((item) => item.slug)).size, 48)
  for (const item of PRODUCT_CONTENT) {
    assert.ok(item.sourceDirs.length > 0, `${item.slug} needs a source directory`)
    assert.ok(item.features.length > 0, `${item.slug} needs features`)
    assert.ok(item.applications.length > 0, `${item.slug} needs applications`)
  }
})

test('corrects the three confirmed catalogue translation errors', () => {
  const bySlug = Object.fromEntries(PRODUCT_CONTENT.map((item) => [item.slug, item]))
  assert.equal(bySlug['screw-distributor-29'].name, 'Automatic Bit Selector')
  assert.equal(bySlug['gear-shifter-production-line-43'].name, 'Robotic System Integration')
  assert.equal(bySlug['iantong-and-low-earth-orbit-satellite-telephone'].name, 'Tiantong and Low-Earth-Orbit Satellite Telephone')
})

test('keeps public copy anonymous and free of prohibited commitments', () => {
  for (const pattern of prohibited) assert.doesNotMatch(publicCopy, pattern)
})

test('provides evidence-led cases and a fuller procurement FAQ', () => {
  assert.ok(CASE_STUDIES.length >= 6)
  assert.ok(PROCUREMENT_FAQ.length >= 20)
  for (const item of CASE_STUDIES) {
    assert.ok(item.process.length >= 2)
    assert.ok(item.scope.length >= 2)
  }
})
