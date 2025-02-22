'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

export default function MasonryGrid({ children }) {
  const columnsCountBreakPoints = {
    350: 1,
    768: 2,
    1280: 3,
    1536: 4,
  }

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={columnsCountBreakPoints}
      gutterBreakpoints={{ 350: '1rem' }}
    >
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  )
}
