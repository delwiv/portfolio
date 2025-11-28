'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useApp } from '~/contexts/appContext'

export default function LanguagePicker({ language }) {
  const { translations } = useApp()

  const [show, setShow] = useState(false)

  return (
    translations?.length > 0 && (
      <div className='group mr-4'>
        <Image
          className='cursor-pointer'
          onClick={() => setShow((show) => !show)}
          src={`/flag-${language}.svg`}
          width={30}
          height={20}
          alt={language}
        ></Image>
        {translations?.length > 0 && (
          <div
            className={clsx(
              'absolute top-16 group mr-4 right-0 flex-col gap-4 bg-black/50 p-4 rounded-b-lg',
              show ? 'flex' : 'hidden'
            )}
          >
            {translations
              .filter((loc) => loc.language !== language)
              .map((loc) => (
                <Link
                  onClick={() => setShow(false)}
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
        )}
      </div>
    )
  )
}
