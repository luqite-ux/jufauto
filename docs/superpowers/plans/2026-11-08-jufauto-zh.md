# JUFTECH Chinese Locale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete Simplified Chinese locale under `/zh` while preserving all existing English URLs and behavior.

**Architecture:** A shared locale module owns route prefixing, language fallback, SEO alternates, and UI dictionaries. English and Chinese route entrypoints call shared renderers and localized database loaders rather than duplicating business logic.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Supabase, Node test runner.

**Spec:** `docs/superpowers/specs/2026-11-08-jufauto-zh-design.md`

## Global Constraints

- Existing English URLs remain unchanged and English remains the default language.
- Chinese URLs use the `/zh` prefix.
- Locale fallback is request locale, then English, then first non-empty translation.
- No visual redesign, v0 call, invented customer fact, or prohibited warranty/guarantee language.
- All tenant queries and updates remain restricted to tenant `98f85dd9-ba33-44b6-86b2-6dc81286d8b3`.

## Review Focus

- `/zh` paths must not create doubled prefixes when links are switched repeatedly.
- Missing Chinese database fields must fall back to English without blank cards or metadata.
- Query strings and dynamic product/article slugs must survive language switching.
- English and Chinese canonical/hreflang pairs must remain reciprocal.
- Admin, API, CAPTCHA, and service-expiry routes must not be accidentally localized.

---

### Task 1: Locale routing and SEO primitives

**Files:**
- Create: `lib/i18n.ts`
- Create: `tests/i18n-routing.test.mjs`
- Modify: `proxy.ts`
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Produces: `Locale`, `normalizeLocale()`, `localizedValue()`, `localePath()`, `alternateLanguages()`.
- Consumes: pathname and JSONB language maps.

- [ ] Write tests for locale normalization, path prefixing, reciprocal alternates, fallback order, and excluded `/admin`/`/api` paths.
- [ ] Run `node --test tests/i18n-routing.test.mjs` and verify the new tests fail because `lib/i18n.ts` does not exist.
- [ ] Implement the locale helpers and request header propagation; make root layout emit locale-aware `html lang`, organization/WebSite JSON-LD, skip link, header and footer.
- [ ] Update Sitemap to emit English and Chinese URLs with language alternates.
- [ ] Run the locale test and `pnpm exec tsc --noEmit`; expect both to pass.
- [ ] Commit the exact Task 1 files.

### Task 2: Shared localized navigation, layout, and static content

**Files:**
- Create: `lib/messages.ts`
- Create: `app/zh/page.tsx`
- Create: `app/zh/{products,solutions,capabilities,about,news,contact}/page.tsx`
- Modify: `components/site/site-header.tsx`
- Modify: `components/site/site-footer.tsx`
- Modify: `components/site/page-header.tsx`
- Modify: `components/home/*.tsx`
- Modify: `components/site/{product-card,product-catalog,news-grid,rfq-section,rfq-form}.tsx`
- Modify: English route page files only as needed to call shared renderers.
- Test: `tests/chinese-static-content.test.mjs`

**Interfaces:**
- Consumes: Task 1 `Locale` and `localePath()`.
- Produces: locale-aware page renderers and language switcher.

- [ ] Add failing source/renderer tests covering all seven Chinese static routes, localized navigation, language switching, form labels, CAPTCHA labels, and prohibited-term absence.
- [ ] Run the new test and confirm the expected failures.
- [ ] Add the Chinese dictionary and locale props, keeping the existing markup, motion, images, and component boundaries.
- [ ] Add `/zh` route entrypoints that reuse the shared renderers.
- [ ] Run the new test, existing tests, and TypeScript; expect all to pass.
- [ ] Commit the exact Task 2 files.

### Task 3: Localized products, articles, metadata, and structured data

**Files:**
- Modify: `lib/products-db.ts`
- Modify: `lib/articles-db.ts`
- Create: `app/zh/products/[slug]/page.tsx`
- Create: `app/zh/news/[slug]/page.tsx`
- Modify: `app/products/[slug]/page.tsx`
- Modify: `app/news/[slug]/page.tsx`
- Test: `tests/localized-data.test.mjs`

**Interfaces:**
- Consumes: Task 1 fallback helpers and Task 2 page components.
- Produces: `fetchProductsData(locale)`, `getProductBySlug(slug, locale)`, `getPublishedArticles(locale)`, and `getArticleBySlug(slug, locale)`.

- [ ] Add failing tests for Chinese-first JSONB reads, English fallback, first-non-empty fallback, localized product/article URLs, metadata, and JSON-LD.
- [ ] Run the test and confirm failures against the current English-only loaders.
- [ ] Add locale parameters and map all product/article i18n fields consistently.
- [ ] Add Chinese detail routes and reciprocal SEO metadata/Schema.
- [ ] Run localized-data, existing tests, and TypeScript; expect all to pass.
- [ ] Commit the exact Task 3 files.

### Task 4: Tenant content and backend language configuration

**Files:**
- Create: `scripts/prepare-jufauto-zh.mjs`
- Create: `deliverables/jufauto-zh-data-readback.json`
- Test: `tests/jufauto-zh-data-script.test.mjs`

**Interfaces:**
- Consumes: tenant ID and service credentials from environment only.
- Produces: idempotent dry-run/apply script restricted to the JUFTECH tenant.

- [ ] Add a failing test that requires dry-run by default, exact tenant restriction, field-level preservation, `en`/`zh-CN` language configuration, and prohibited-term scanning.
- [ ] Run the test and confirm the script is absent.
- [ ] Implement dry-run and apply modes; translate only supported customer facts and preserve manual fields.
- [ ] Run dry-run, review affected fields, apply once, and read back tenant/product/article i18n data into the evidence file without secrets.
- [ ] Run the script test and post-apply readback checks; expect all to pass.
- [ ] Commit the script, test, and sanitized evidence.

### Task 5: Build, deploy, and production verification

**Files:**
- Create: `deliverables/jufauto-zh-verification.md`
- Modify: only files required by evidence-backed fixes.

**Interfaces:**
- Consumes: Tasks 1-4 and existing Vercel/GitHub integration.
- Produces: verified Production deployment and closeout evidence.

- [ ] Install dependencies and run the complete Node tests, TypeScript check, lint, and production build.
- [ ] Scan source, database readback, and generated routes for prohibited terms and unintended untranslated interface copy.
- [ ] Push the `codex/jufauto-zh` branch with the verified company token, then merge/push `main` only within the user-authorized deployment workflow.
- [ ] Verify Vercel Production, formal-domain HTML, sitemap, robots, canonical, reciprocal hreflang, JSON-LD, all sitemap URLs, and GitHub/Vercel SHA alignment.
- [ ] Use a safe browser session to verify desktop and 390px mobile English/Chinese navigation, switching, product/article pages, CAPTCHA visibility, logo/favicon, and motion; close only task-created tabs.
- [ ] Re-read tenant settings and one localized product/article through the backend; clean any test data.
- [ ] Update the workbench task if the API is available; otherwise record `未建立工作台任务` with the HTTP failure evidence.

