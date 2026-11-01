import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'

const home = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8')
const catalogue = readFileSync(new URL('../components/home/catalogue-sections.tsx', import.meta.url), 'utf8')
const engineering = readFileSync(new URL('../components/home/engineering-sections.tsx', import.meta.url), 'utf8')

test('homepage removes repetitive capability and full workflow sections', () => {
  assert.doesNotMatch(home, /<CapabilityGrid\b/)
  assert.doesNotMatch(home, /<ProcessSection\b/)
})

test('homepage limits decision support content to three solutions, three cases and six FAQs', () => {
  assert.match(home, /<SolutionsPreview products=\{products\} limit=\{3\}/)
  assert.match(home, /<CaseStudiesSection products=\{products\} limit=\{3\}/)
  assert.match(home, /PROCUREMENT_FAQ\.slice\(0, 6\)/)
})

test('product family and proof cards use real catalogue images', () => {
  assert.match(catalogue, /familyProduct\?\.images\?\.\[0\]/)
  assert.match(catalogue, /<Image/)
  assert.match(engineering, /product\?\.images\?\.\[0\]/)
  assert.match(engineering, /<Image/)
})
