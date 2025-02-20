"use client"

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function MasonryGrid({ children, columnsCountBreakPoints = {
  350: 1,
  768: 2,
  1536: 3
} }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints} gutterBreakpoints={{350: '1rem'}}>
      <Masonry >
        {children}
      </Masonry>
    </ResponsiveMasonry>
  )

}

