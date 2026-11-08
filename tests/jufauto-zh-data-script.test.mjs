import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../scripts/prepare-jufauto-zh.mjs', import.meta.url), 'utf8')

test('data script is dry-run by default and tenant scoped', () => {
  assert.match(source, /const APPLY = process\.argv\.includes\('--apply'\)/)
  assert.match(source, /98f85dd9-ba33-44b6-86b2-6dc81286d8b3/)
  assert.match(source, /\.eq\('tenant_id', TENANT_ID\)/)
  assert.match(source, /if \(!APPLY\)/)
})

test('data script preserves existing Chinese values and manual fields', () => {
  assert.match(source, /existingChinese/)
  assert.match(source, /site_settings_manual_fields/)
  assert.match(source, /supported_languages/)
  assert.match(source, /'zh-CN'/)
})

test('data script rejects prohibited commitments before updates', () => {
  assert.match(source, /质保|保修/)
  assert.match(source, /warranty|guarantee/i)
  assert.match(source, /scanProhibited/)
})
