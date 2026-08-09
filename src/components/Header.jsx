import Link from 'next/link'
import Image from './Image'
import { parseHeaders } from '~/utils/headers'
import LanguagePicker from './LanguagePicker'
import ThemeToggle from './ThemeToggle'

const Logo = ({ language }) => (
  <Link href={`/${language}`} className='flex shrink-0 items-center'>
    {/* Mobile : pictogramme seul pour tenir dans la top bar */}
    <Image
      src='/logo/wrb_logo.png'
      alt='Wild Red Beard'
      width={509}
      height={526}
      priority
      className='h-8 w-auto dark:invert dark:hue-rotate-180 sm:hidden'
    />
    {/* Desktop : texte */}
    <Image
      src='/logo/wrb_text.png'
      alt='Wild Red Beard'
      width={918}
      height={99}
      priority
      className='hidden h-6 w-auto dark:invert sm:block md:h-7'
    />
  </Link>
)

export default async function Header({ settings }) {
  const { language } = await parseHeaders()

  return (
    <header className='header-blur sticky top-0 z-50 border-b border-border'>
      <div className='container-blog flex h-16 items-center justify-between gap-4'>
        <Logo language={language} />

        <nav className='flex items-center gap-1 md:gap-2'>
          {settings?.menu?.map((entry) => (
            <Link
              key={entry.link.slug || 'home'}
              href={`/${language}/${entry.link.slug || ''}`}
              className='rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink'
            >
              {entry.title}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <LanguagePicker language={language} />
        </div>
      </div>
    </header>
  )
}
