"use client"

import clsx from "clsx"
import { useState } from "react"

export default function UnfoldableBox({ children, height = '84px' }) {
  const [unfold, setUnfold] = useState(false)

  return (
    <div className="cursor-pointer" onClick={() => setUnfold(unfold => !unfold)}>
      <div className={clsx(!unfold && "line-clamp-3")}>
        {children}
      </div>
    </div>
  )

}
