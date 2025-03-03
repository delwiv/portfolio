import clsx from 'clsx'

export default function FixedImage({
  src,
  text,
  position,
  fullWidth = false,
  fullHeight,
}) {
  return (
    <div
      style={{ '--image-url': `url(${src})` }}
      className={clsx(
        fullHeight ? 'h-[80vh] max-w-[100dvw] w-full' : 'h-[25vh] w-screen',
        'bg-fixed bg-top-left bg-no-repeat bg-[image:var(--image-url)] bg-cover aspect-auto'
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
