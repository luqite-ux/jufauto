export type ProductContent = { slug: string; name: string; category: string; sourceDirs: string[]; features: string[]; applications: string[]; maxImages: number; imageStart: number }
export type CaseStudy = { productSlug: string; title: string; sector: string; process: string[]; scope: string[] }
export const PRODUCT_CONTENT: ProductContent[]
export const CASE_STUDIES: CaseStudy[]
export const PROCUREMENT_FAQ: { q: string; a: string }[]
