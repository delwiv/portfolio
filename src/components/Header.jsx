import Image from 'next/image'
import Link from 'next/link'
import { parseHeaders } from '~/utils/headers'
import { locales } from '~/utils/locales'
import { getTranslation } from '~/utils/translations'
import LanguagePicker from './LanguagePicker'

export default async function Header({ settings }) {
  const { language, url, pathname } = await parseHeaders()
  const t = await getTranslation(language)
  return (
    <>
      <header className='fixed justify-between font-bebas text-xl top-0 w-full h-16 flex items-center px-4 gap-4 z-50 border-b border-b-black bg-black/50 text-white w-vw'>
        <div className='flex items-center gap-4'>
          {settings?.menu?.map((entry) => (
            <Link
              key={entry.link.slug || 'home'}
              href={`/${language}/${entry.link.slug || '#top'}`}
            >
              {entry.title}
            </Link>
          ))}
          <Link href={`/${language}/resume`}>{t.resume.title}</Link>
        </div>
        <div className='group mr-4'>
          <Image
            src={`/flag-${language}.svg`}
            width={30}
            height={20}
            alt={language}
          ></Image>
          <LanguagePicker></LanguagePicker>
        </div>
      </header>
    </>
  )
}
