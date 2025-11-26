import '~/app/globals.css'

import '~/app/prism-okaidia.css'

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
  subsets: ['latin-ext'],
})

const ubuntuMono = Ubuntu_Mono({ weight: ['400'], subsets: ['latin-ext'] })
const ubuntuSansMono = Ubuntu_Sans_Mono({
  weight: ['400'],
  subsets: ['latin-ext'],
})

const ubuntu = Ubuntu({ weight: ['400'], subsets: ['latin-ext'] })
const ubuntuSans = Ubuntu_Sans({ weight: ['400'], subsets: ['latin-ext'] })

export function generateMetadata() {
  const result = {
    title: `Louis Cathala's blog | Resume`,
    openGraph: {
      title: `Louis Cathala's blog | Resume`,
      description: 'Freshly generated resume',
      locale: 'en-US',
    },
  }

  return result
}

export default async function RootLayout({ children }) {
  const language = 'en'
  return (
    <html
      lang={language}
      className={clsx(
        bebas.className,
        ubuntu.className,
        ubuntuMono.className,
        ubuntuSans.className,
        ubuntuSansMono.className
      )}
    >
      <body className='antialiased min-h-screen'>{children}</body>
    </html>
  )
}
