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
import { parseHeaders } from '~/utils/headers'
import { ToastContainer } from 'react-toastify'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata() {
  const { url, pathname, slug } = await parseHeaders()

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
      url: `${url}${pathname}`,
      locale: 'en-US',
      images: [`${url}api/ogimage?uri=${encodeURIComponent(pathname)}`],
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
        <ToastContainer theme='dark' position='bottom-center' />
      </body>
    </html>
  )
}
