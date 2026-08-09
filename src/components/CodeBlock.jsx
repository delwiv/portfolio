'use client'

import { useCallback, useEffect, useState } from 'react'
import Code from './Code'
import clsx from 'clsx'
import { toast } from 'react-toastify'

const CopyIcon = ({ copied }) => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    {copied ? (
      <>
        <path d='M20 6 9 17l-5-5' />
      </>
    ) : (
      <>
        <rect x='9' y='9' width='13' height='13' rx='2' />
        <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
      </>
    )}
  </svg>
)

export default function CodeBlock({ code, language, t }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 250)
    }
  }, [copied])

  const copyText = useCallback(() => {
    window.navigator.clipboard.writeText(code)
    toast.success(t?.article?.copyCode ?? 'Code snippet copied to clipboard')
    setCopied(true)
  }, [code, t])

  return (
    <div className='group/code relative my-6 overflow-hidden rounded-xl border border-border'>
      <div className='flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2'>
        <span className='font-mono text-xs uppercase tracking-wider text-ink-faint'>
          {language}
        </span>
        <button
          onClick={copyText}
          aria-label='Copy code'
          title='Copy code'
          className={clsx(
            'flex size-8 items-center justify-center rounded-lg transition-colors',
            copied
              ? 'bg-accent text-white'
              : 'text-ink-faint hover:bg-surface hover:text-ink'
          )}
        >
          <CopyIcon copied={copied} />
        </button>
      </div>
      <Code language={language} code={code}></Code>
    </div>
  )
}
