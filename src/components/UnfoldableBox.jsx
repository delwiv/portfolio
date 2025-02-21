'use client'

import clsx from 'clsx'
import { useState } from 'react'

export default function UnfoldableBox({ children, height = '84px' }) {
  const [unfold, setUnfold] = useState(false)

  return (
    <div>
      <div
        className={clsx(
          unfold ? 'max-h-screen' : 'max-h-[63px]',
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
