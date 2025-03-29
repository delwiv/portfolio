import '~/app/globals.css'
import { sanityFetch, SanityLive } from '~/sanity/lib/live'
import {
  DEVELOPER_QUERY,
  HOME_QUERY,
  LAYOUT_QUERY,
  OG_QUERY,
} from '~/sanity/lib/queries'

import '~/app/prism-okaidia.css'
import Layout from '~/components/Layout'
import { parseHeaders } from '~/utils/headers'
import { ToastContainer } from 'react-toastify'

import {
  Bebas_Neue,
  Ubuntu_Mono,
  Ubuntu_Sans,
  Ubuntu_Sans_Mono,
  Ubuntu,
} from 'next/font/google'
import clsx from 'clsx'

const bebas = Bebas_Neue({
  weight: ['400'],
})

const ubuntuMono = Ubuntu_Mono({ weight: ['400'] })
const ubuntuSansMono = Ubuntu_Sans_Mono({ weight: ['400'] })
const ubuntu = Ubuntu({ weight: ['400'] })
const ubuntuSans = Ubuntu_Sans({ weight: ['400'] })

export async function generateMetadata() {
  const { url, pathname, slug, locale } = await parseHeaders()

  console.log({ locale })

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
  const { locale } = await parseHeaders()
  const settings = await sanityFetch({
    query: LAYOUT_QUERY,
    variables: { locale },
  })

  return (
    <html
      lang='en'
      className={clsx(
        bebas.className,
        ubuntu.className,
        ubuntuMono.className,
        ubuntuSans.className,
        ubuntuSansMono.className
      )}
    >
      <body className='antialiased'>
        <div id='top'></div>
        <Layout settings={settings}>{children}</Layout>
        <SanityLive></SanityLive>
        <ToastContainer theme='dark' position='bottom-center' />
      </body>
    </html>
  )
}
