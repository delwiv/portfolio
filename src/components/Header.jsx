import Link from 'next/link'
import { parseHeaders } from '~/utils/headers'
import { getTranslation } from '~/utils/translations'
import LanguagePicker from './LanguagePicker'

export default async function Header({ settings }) {
  const { language } = await parseHeaders()
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
        <LanguagePicker language={language}></LanguagePicker>
      </header>
    </>
  )
}
