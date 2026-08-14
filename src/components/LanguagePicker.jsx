'use client'

import clsx from 'clsx'
import Image from './Image'
import Link from 'next/link'
import { useState } from 'react'
import { useApp } from '~/contexts/appContext'

export default function LanguagePicker({ language }) {
  const { translations } = useApp()

  const [show, setShow] = useState(false)

  return (
    translations?.length > 0 && (
      <div className='relative'>
        <button
          onClick={() => setShow((show) => !show)}
          aria-label='Change language'
          aria-expanded={show}
          className='flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 text-sm font-medium text-ink-soft transition-all hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
        >
          <Image
            src={`/flag-${language}.svg`}
            width={20}
            height={14}
            alt={language}
          ></Image>
          <svg
            width='12'
            height='12'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={clsx('transition-transform', show && 'rotate-180')}
            aria-hidden='true'
          >
            <path d='m6 9 6 6 6-6' />
          </svg>
        </button>

        {show && (
          <div className='absolute right-0 top-11 z-50 flex min-w-24 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card animate-fade-in'>
            {translations
              .filter((loc) => loc.language !== language)
              .map((loc) => (
                <Link
                  key={loc.newPath}
                  href={loc.newPath}
                  onClick={() => setShow(false)}
                  className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink'
                >
                  <Image
                    src={`/flag-${loc.language}.svg`}
                    width={20}
                    height={14}
                    alt={loc.language}
                  ></Image>
                  <span className='uppercase'>{loc.language}</span>
                </Link>
              ))}
          </div>
        )}
      </div>
    )
  )
}
