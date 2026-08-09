import RichText from './RichText'

export default function Sources({ sources, t }) {
  return (
    <div className='mt-12 flex flex-col gap-4'>
      <h3 className='text-3xl'>{t?.article?.sources ?? 'Sources'}</h3>
      <div className='flex flex-col gap-3'>
        {sources.map((source) => (
          <div
            key={source.name}
            className='flex flex-col rounded-xl border border-border bg-surface p-4'
          >
            <a
              href={source.url}
              target='_blank'
              rel='noreferrer'
              className='group flex items-center gap-2 font-display text-xl text-ink transition-colors hover:text-accent'
            >
              {source.name}
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                aria-hidden='true'
              >
                <path d='M7 17 17 7M7 7h10v10' />
              </svg>
            </a>
            <div className='prose-blog text-sm'>
              <RichText value={source.comment.content}></RichText>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
