import clsx from 'clsx'
import Image from './Image'

/**
 * Image pleine largeur utilisée en hero (fond) : remplit son parent absolu.
 * `src` est une URL déjà construite (urlFor).
 */
export default function FixedImage({ src, text, position = 'center' }) {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      <Image
        src={src}
        alt={text || 'Header'}
        fill
        sizes='100vw'
        priority
        className='object-cover'
      />
      {text && (
        <div
          className={clsx(
            'absolute inset-0 flex p-8',
            position === 'top'
              ? 'items-start justify-start'
              : 'items-center justify-center'
          )}
        >
          <div className='p-8 text-2xl text-white md:text-5xl'>{text}</div>
        </div>
      )}
    </div>
  )
}
