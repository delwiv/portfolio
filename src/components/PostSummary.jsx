import clsx from 'clsx'
import { getHeadingId } from '~/utils/summary'

export default function PostSummary({ summary, title }) {
  return (
    <div className='flex flex-col lg:items-end w-full lg:sticky lg:top-24 font-ubuntu-sans underline-offset-2 '>
      <div className='w-full flex flex-col bg-gray-800 p-4 rounded-xl gap-1'>
        <a
          href={`#${encodeURIComponent(title)}`}
          className='h1 uppercase text-xl '
        >
          {title}
        </a>
        <h4 className='py-2'>Summary</h4>

        {summary.map((entry) => (
          <a
            key={entry._key}
            href={`#${getHeadingId(entry.children.map((c) => c.text))}`}
            className={clsx(
              entry.style === 'h1' && 'pl-2 text-summary-1',
              entry.style === 'h2' && 'pl-2 text-summary-2',
              entry.style === 'h3' && 'pl-4 text-summary-3',
              entry.style === 'h4' && 'pl-6 text-summary-4',
              entry.style === 'h5' && 'pl-8 text-summary-5',
              entry.style === 'h6' && 'pl-10 text-summary-6'
            )}
          >
            {entry.children[0].text}
          </a>
        ))}
      </div>
    </div>
  )
}
