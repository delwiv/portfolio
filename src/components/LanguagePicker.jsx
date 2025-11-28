'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '~/contexts/appContext'

export default function LanguagePicker() {
  const { translations } = useApp()
  const pathname = usePathname()
  const language = pathname.split('/')[1]

  return (
    translations?.length > 0 && (
      <div className='group-hover:flex absolute top-10 group pt-6 mr-4 hidden right-0 flex-col gap-4 bg-black/50 p-4 rounded-lg'>
        {translations
          .filter((loc) => loc.language !== language)
          .map((loc) => (
            <Link
              key={loc.newPath}
              href={loc.newPath}
              className='w-[30px] h-[20px]'
            >
              <Image
                src={`/flag-${loc.language}.svg`}
                width={30}
                height={20}
                alt={loc}
              ></Image>
            </Link>
          ))}
      </div>
    )
  )
}
