import clsx from 'clsx'

export default function FixedImage({ src, text, position, fullWidth = false }) {
  return (
    <div
      style={{ '--image-url': `url(${src})` }}
      className={clsx(
        'w-full bg-fixed bg-top bg-no-repeat h-auto bg-[image:var(--image-url)] bg-cover aspect-video'
      )}
    >
      {text && (
        <div
          className={clsx(
            'size-full flex p-8 relative',
            position === 'top'
              ? 'items-start justify-start'
              : 'items-center justify-center'
          )}
        >
          <div className='p-8 text-5xl text-white bg-black/50 rounded-xl'>
            {text}
          </div>
        </div>
      )}
    </div>
  )
}
