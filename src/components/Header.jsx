import Link from 'next/link'

export default function Header({ settings }) {
  return (
    <>
      <div className='h-16'></div>
      <header className='fixed top-0'>
        <div className='h-16 flex items-center px-4 gap-4 z-50 border-b border-b-black bg-black/50 text-white w-vw'>
          {settings?.menu?.map((entry) => (
            <Link key={entry.link.slug} href={`/${entry.link.slug}`}>
              {entry.title}
            </Link>
          ))}
        </div>
      </header>
    </>
  )
}
