'use client'

import clsx from 'clsx'
import NextImage from 'next/image'
import { useState } from 'react'

export default function Image(props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* {!loaded && ( */}
      {/*   <div */}
      {/*     style={{ */}
      {/*       width: props.width, */}
      {/*       height: props.height, */}
      {/*     }} */}
      {/*     className={clsx( */}
      {/*       'rounded-md', */}
      {/*       props.className, */}
      {/*       'animate-pulse bg-gray-500' */}
      {/*     )} */}
      {/*   ></div> */}
      {/* )} */}
      <NextImage
        {...props}
        onLoad={() => setLoaded(true)}
        className={clsx(
          props.className,
          'transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      ></NextImage>
    </>
  )
}
