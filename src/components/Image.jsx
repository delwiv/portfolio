'use client'

import clsx from 'clsx'
import NextImage from 'next/image'
import { useState } from 'react'

export default function Image(props) {
  const [loaded, setLoaded] = useState(false)

  let placeholderUrl = null
  let placeholderProps = {}

  if (props.blur) {
    const url = new URL(props.src)
    const query = new URLSearchParams(url.search)

    const width = parseInt(query.get('w'), 10) || props.width
    const height = parseInt(query.get('h'), 10) || props.height

    const placeholderW = Math.round(width / 4)
    const placeholderH = Math.round(height / 4)

    query.set('q', 50)
    query.set('w', placeholderW)
    query.set('h', placeholderH)

    placeholderProps.width = props.width
    placeholderProps.height = props.height
    placeholderProps.alt = props.alt

    url.search = query.toString()

    placeholderUrl = url.toString()
    placeholderProps.src = placeholderUrl
  }

  return (
    <>
      {!loaded && placeholderUrl && (
        <NextImage
          {...placeholderProps}
          className={clsx(props.className)}
        ></NextImage>
      )}
      <NextImage
        {...props}
        blur={undefined}
        onLoad={() => setLoaded(true)}
        className={clsx(
          props.className,
          !placeholderUrl && 'transition-opacity duration-100',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      ></NextImage>
    </>
  )
}
