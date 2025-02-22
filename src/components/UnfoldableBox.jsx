'use client'

import clsx from 'clsx'
import { useState } from 'react'

export default function UnfoldableBox({ children, height = '100px' }) {
  const [unfold, setUnfold] = useState(false)

  return (
    <div>
      <div
        onClick={() => {
          if (!unfold) {
            setUnfold(true)
          }
        }}
        className={clsx(
          unfold ? 'max-h-screen' : 'max-h-[100px] cursor-pointer',
          'transition-all overflow-y-hidden duration-500 ease-in-out'
        )}
      >
        {children}
      </div>
      <div
        className='cursor-pointer underline '
        onClick={() => setUnfold((unfold) => !unfold)}
      >
        View {unfold ? 'less' : 'more'}
      </div>
    </div>
  )
}
