'use client'

import clsx from 'clsx'
import { useApp } from '~/contexts/appContext'

export default function Overlay() {
  const { expandOverlay, setExpandOverlay } = useApp()

  return (
    <div
      onClick={() => setExpandOverlay(false)}
      id='overlay'
      className={clsx('transition-all', expandOverlay && 'expanded')}
    ></div>
  )
}
