'use client'

import { useCallback } from 'react'

const { toast } = require('react-toastify')

const ShareLink = ({ url, title }) => {
  const handleClick = useCallback(() => {
    window.navigator.clipboard.writeText(url)
    toast.success('Article link copied to clipboard')
  }, [url])

  return (
    <div
      className='flex size-[32px] cursor-pointer items-center justify-center rounded-full bg-gray-100 font-bai text-3xl font-bold'
      onClick={handleClick}
    >
      <img src={`/share-link.svg`} alt='' />
    </div>
  )
}

export default ShareLink
