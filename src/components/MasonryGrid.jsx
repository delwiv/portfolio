"use client"

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function MasonryGrid({ children, columnsCountBreakPoints = {
  349: 1,
  767: 2,
  1535: 3
} }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints} gutterBreakpoints={{350: '1rem'}}>
      <Masonry >
        {children}
      </Masonry>
    </ResponsiveMasonry>
  )

}

