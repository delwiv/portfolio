import '~/app/globals.css'
import { sanityFetch, SanityLive } from '~/sanity/lib/live'
import {
  BLOG_QUERY,
  DEVELOPER_QUERY,
  LAYOUT_QUERY,
  OG_QUERY,
} from '~/sanity/lib/queries'

import '~/app/prism-okaidia.css'
import { parseHeaders } from '~/utils/headers'

import { Bebas_Neue, Ubuntu_Mono, Ubuntu_Sans } from 'next/font/google'
import clsx from 'clsx'
import Layout from '~/components/Layout'
import { ToastContainer } from 'react-toastify'

const bebas = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin-ext'],
  variable: '--font-display',
})

const ubuntuSans = Ubuntu_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin-ext'],
  variable: '--font-sans',
})

const ubuntuMono = Ubuntu_Mono({
  weight: ['400'],
  subsets: ['latin-ext'],
  variable: '--font-mono',
})

export async function generateMetadata() {
  const { url, pathname, slug, locale } = await parseHeaders()
  const language = locale || 'en'

  const query = slug === '' ? BLOG_QUERY : OG_QUERY

  const [{ data: page }, { data: developer }] = await Promise.all([
    sanityFetch({
      query,
      params: { slug, language },
    }),
    sanityFetch({
      query: DEVELOPER_QUERY,
      params: { language },
    }),
  ])

  const result = {
    title: `Louis Cathala's blog | ${page?.SEO?.title}`,
    description: page?.SEO?.description,
    creator: developer.name,
    openGraph: {
      title: `Louis Cathala's blog | ${page?.SEO?.title}`,
      description: page?.SEO?.description,
      url: `${url}${pathname}`,
      locale: 'en-US',
      images: [`${url}api/ogimage?uri=${encodeURIComponent(pathname)}`],
    },
    other: {
      ['p:domain_verify']: '017e2951793e0463a7d249b99e5e6257',
    },
  }

  return result
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export default async function RootLayout({ children }) {
  const { locale: language } = await parseHeaders()
  const settings = await sanityFetch({
    query: LAYOUT_QUERY,
    params: { language },
  })

  return (
    <html
      lang={language}
      suppressHydrationWarning
      className={clsx(
        bebas.variable,
        ubuntuSans.variable,
        ubuntuMono.variable,
        'font-sans'
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className='antialiased'>
        <div id='top'></div>
        <Layout settings={settings}>{children}</Layout>
        <SanityLive></SanityLive>
        <ToastContainer theme='dark' position='bottom-center' />
      </body>
    </html>
  )
}
