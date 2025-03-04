import Link from 'next/link'

export default function Header({ settings }) {
  return (
    <>
      <div className='h-16 bg-none hidden'></div>
      <header className='fixed font-bebas text-xl top-0 w-full h-16 flex items-center px-4 gap-4 z-50 border-b border-b-black bg-black/50 text-white w-vw'>
        {settings?.menu?.map((entry) => (
          <Link
            key={entry.link.slug || 'home'}
            href={`/${entry.link.slug || '#top'}`}
          >
            {entry.title}
          </Link>
        ))}
      </header>
    </>
  )
}
