'use client'

import Image from './Image'
import { useCallback } from 'react'

const { toast } = require('react-toastify')

const ShareLink = ({ url, t }) => {
  const handleClick = useCallback(() => {
    window.navigator.clipboard.writeText(url)
    toast.success(t?.article?.copyLink ?? 'Article link copied to clipboard')
  }, [url, t])

  return (
    <button
      onClick={handleClick}
      aria-label={t?.article?.copyLinkLabel ?? 'Copy link'}
      className='flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-ink-soft transition-all hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
    >
      <Image src={`/share-link.svg`} width={20} height={20} alt='' />
    </button>
  )
}

export default ShareLink
