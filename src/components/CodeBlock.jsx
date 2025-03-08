'use client'

import { useCallback, useEffect, useState } from 'react'
import Code from './Code'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import Image from 'next/image'

export default function CodeBlock({ code, language }) {
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
    toast.success('The code snippet was copied in your clipboard')
    setCopied(true)
  }, [code])

  return (
    <div className='max-w-[100vw] overflow-x-scroll relative codeblock'>
      <div
        className={clsx(
          'rounded-xl absolute right-1 top-3 cursor-pointer transition-colors duration-500 p-2',
          copied && 'bg-green-800  rounded-xl'
        )}
      >
        <Image
          width={32}
          height={32}
          className='size-8 '
          src='/icon-copy.svg'
          alt='Copy code'
          onClick={copyText}
        />
      </div>
      <Code language={language} code={code}></Code>
    </div>
  )
}
