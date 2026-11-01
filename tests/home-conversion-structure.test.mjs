import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'

const home = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8')
const catalogue = readFileSync(new URL('../components/home/catalogue-sections.tsx', import.meta.url), 'utf8')
const engineering = readFileSync(new URL('../components/home/engineering-sections.tsx', import.meta.url), 'utf8')
const faqNews = readFileSync(new URL('../components/home/faq-news-sections.tsx', import.meta.url), 'utf8')
const faq = readFileSync(new URL('../components/site/faq.tsx', import.meta.url), 'utf8')

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
  assert.match(catalogue, /className="object-cover transition-transform/)
  assert.doesNotMatch(catalogue, /className="object-contain p-3 transition-transform/)
  assert.match(engineering, /product\?\.images\?\.\[0\]/)
  assert.match(engineering, /<Image/)
  assert.match(engineering, /entry\.slug === item\.imageProductSlug/)
  assert.match(engineering, /aspect-\[16\/10\] overflow-hidden/)
  assert.match(engineering, /className="object-cover transition-transform duration-300 hover:scale/)
  assert.match(faqNews, /lg:grid-cols-\[minmax\(0,0\.8fr\)_minmax\(0,1\.2fr\)\]/)
  assert.match(faqNews, /Ask the engineering team/)
  assert.match(faq, /groups\.length > 1 && 'lg:grid-cols-2'/)
})
