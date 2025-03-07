import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { sanityFetch, SanityLive } from '~/sanity/lib/live'
import { LAYOUT_QUERY } from '~/sanity/lib/queries'

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
  const pathname = head.get('pathname') || ''

  return {
    title: 'Louis Cathala',
    description: 'Full stack web engineer',
    openGraph: {
      images: [`/api/ogimage?uri=${encodeURIComponent(pathname)}`],
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
