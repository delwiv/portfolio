import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { sanityFetch, SanityLive } from '~/sanity/lib/live'
import {
  DEVELOPER_QUERY,
  HOME_QUERY,
  LAYOUT_QUERY,
  OG_QUERY,
} from '~/sanity/lib/queries'

import './prism-okaidia.css'
import Layout from '~/components/Layout'
import { headers } from 'next/headers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata() {
  const head = await headers()
  const origin = head.get('host')
  const pathname = head.get('pathname') || ''
  const proto = head.get('proto')

  const slug = pathname.split('/').pop()

  const url = new URL(`${proto}//${origin}`)

  const query = slug === '' ? HOME_QUERY : OG_QUERY

  const [{ data: page }, { data: developer }] = await Promise.all([
    sanityFetch({
      query,
      params: { slug },
    }),
    sanityFetch({ query: DEVELOPER_QUERY }),
  ])

  return {
    title: `Louis Cathala's blog | ${page.title}`,
    description: page.excerpt,
    creator: developer.name,
    openGraph: {
      title: `Louis Cathala's blog | ${page.title}`,
      description: page.excerpt,
      url: `${url.toString()}${pathname}`,
      locale: 'en-US',
      images: [
        `${url.toString()}api/ogimage?uri=${encodeURIComponent(pathname)}`,
      ],
    },
  }
}

export default async function RootLayout({ children }) {
  const settings = await sanityFetch({ query: LAYOUT_QUERY })

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id='top'></div>
        <Layout settings={settings}>{children}</Layout>
        <SanityLive></SanityLive>
      </body>
    </html>
  )
}
