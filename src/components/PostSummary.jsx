import clsx from 'clsx'
import { getHeadingId } from '~/utils/summary'

export default function PostSummary({ summary, title, t }) {
  return (
    <nav className='lg:sticky lg:top-24'>
      <div className='flex flex-col rounded-2xl border border-border bg-surface p-5'>
        <h4 className='mb-2 flex items-center gap-2 text-xl text-ink'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-accent'
            aria-hidden='true'
          >
            <path d='M4 6h16M4 12h16M4 18h10' />
          </svg>
          {t?.article?.summary ?? 'Summary'}
        </h4>
        <div className='flex flex-col gap-1 border-l border-border'>
          {summary.map((entry) => (
            <a
              key={entry._key}
              href={`#${getHeadingId(entry.children.map((c) => c.text))}`}
              className={clsx(
                '-ml-px border-l-2 border-transparent py-1 transition-colors hover:border-accent hover:text-accent',
                entry.style === 'h1' && 'pl-2 text-summary-1',
                entry.style === 'h2' && 'pl-2 text-summary-2',
                entry.style === 'h3' && 'pl-4 text-summary-3',
                entry.style === 'h4' && 'pl-6 text-summary-4',
                entry.style === 'h5' && 'pl-8 text-summary-5',
                entry.style === 'h6' && 'pl-10 text-summary-6'
              )}
            >
              <span className='text-ink-soft'>{entry.children[0].text}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
