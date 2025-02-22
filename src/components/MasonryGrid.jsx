'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

export default function MasonryGrid({
  children,
  columnsCountBreakPoints = {
    349: 1,
    767: 2,
    1535: 3,
  },
}) {
  const isServer = typeof window === 'undefined'
  console.log({ isServer })
  // return (
  //   <ResponsiveMasonry
  //     columnsCountBreakPoints={columnsCountBreakPoints}
  //     gutterBreakpoints={{ 350: '1rem' }}
  //   >
  //     <Masonry>{children}</Masonry>
  //   </ResponsiveMasonry>
  // )
  return isServer ? (
    <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[10px]'>
      {children}
    </div>
  ) : (
    <ResponsiveMasonry
      columnsCountBreakPoints={columnsCountBreakPoints}
      gutterBreakpoints={{ 350: '1rem' }}
    >
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  )
}
