import clsx from 'clsx'
import Image from './Image'
import { urlFor } from '~/sanity/lib/image'

export default function FixedImage({ src, text, position }) {
  return (
    <div className='aspect-video  w-full h-fit contain relative'>
      <div
        className='fixed top-0'
        // style={{ '--image-url': `url(${src})` }}
        // className={clsx(
        //   'bg-fixed bg-top-left bg-no-repeat bg-[image:var(--image-url)] bg-contain aspect-video w-full h-fit'
        // )}
      >
        <Image
          src={urlFor(src).width(2560).height(1440).url()}
          width={2560}
          height={1440}
          alt='Header'
        ></Image>
      </div>
      {text && (
        <div
          className={clsx(
            'size-full fixed flex p-8 mt-16',
            position === 'top'
              ? 'items-start justify-start'
              : 'items-center justify-center'
          )}
        >
          <div className='p-8 text-2xl md:text-5xl text-white bg-black/50 rounded-xl'>
            {text}
          </div>
        </div>
      )}
    </div>
  )
}
