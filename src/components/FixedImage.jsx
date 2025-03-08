import clsx from 'clsx'

export default function FixedImage({ src, text, position }) {
  return (
    <div
      style={{ '--image-url': `url(${src})` }}
      className={clsx(
        'bg-fixed bg-top-left bg-no-repeat bg-[image:var(--image-url)] bg-contain aspect-video w-full h-fit'
      )}
    >
      {text && (
        <div
          className={clsx(
            'size-full flex p-8 relative mt-16',
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
