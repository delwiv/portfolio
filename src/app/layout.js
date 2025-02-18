import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { sanityFetch, SanityLive } from '~/sanity/lib/live'
import { LAYOUT_QUERY } from '~/sanity/lib/queries'
import Header from '~/components/Header'

import './prism-okaidia.css'
import Footer from '~/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Louis "Delwiv" Cathala',
  description: 'Full stack web engineer',
}

export default async function RootLayout({ children }) {
  const settings = await sanityFetch({ query: LAYOUT_QUERY })

  console.log({ settings })
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header settings={settings.data}></Header>
        {children}
        <Footer></Footer>
        <SanityLive></SanityLive>
      </body>
    </html>
  )
}
