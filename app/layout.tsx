import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import './globals.css'
import { normalizeLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  metadataBase: new URL('https://jufauto.com'),
  title: {
    default: 'JUFTECH | Industrial Automation Equipment & Control Systems',
    template: '%s | JUFTECH',
  },
  description:
    'JUFTECH is the public brand of Suzhou Industrial Park Jiufeng Automation Technology Co., Ltd. Custom automation equipment, tightening modules, feeding systems, robotic integration, forming, heavy machining and industrial control software.',
  applicationName: 'JUFTECH',
  icons: {
    icon: [{ url: '/images/logo.png', type: 'image/png' }],
    apple: [{ url: '/images/logo.png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0A4A9E',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = normalizeLocale((await headers()).get('x-site-locale'))
  const chinese = locale === 'zh-CN'
  const organization = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': 'https://jufauto.com/#organization', name: chinese ? '苏州工业园区九峰自动化技术有限公司' : 'Suzhou Industrial Park Jiufeng Automation Technology Co., Ltd.', alternateName: 'JUFTECH', url: 'https://jufauto.com', logo: 'https://jufauto.com/images/logo.png', email: 'info@jufauto.com', telephone: '+86-512-6767-8265', address: { '@type': 'PostalAddress', streetAddress: chinese ? '东富路33号' : 'No. 33 Dongfu Road', addressLocality: chinese ? '苏州工业园区' : 'Suzhou Industrial Park', addressRegion: chinese ? '江苏省' : 'Jiangsu', addressCountry: 'CN' } },
    { '@type': 'WebSite', '@id': 'https://jufauto.com/#website', url: 'https://jufauto.com', name: 'JUFTECH', publisher: { '@id': 'https://jufauto.com/#organization' }, inLanguage: locale },
  ] }
  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          {chinese ? '跳到主要内容' : 'Skip to main content'}
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
