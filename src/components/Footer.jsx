export default function Footer({ settings }) {
  return (
    <div className='p-8 flex flex-col gap-4'>
      <div className='w-full flex md:flex-row flex-col justify-center md:justify-between gap-8'>
        <div className='flex md:gap-8 gap-4 w-full justify-center md:justify-start'>
          {settings.socialLinks.map((social) => (
            <a key={social.platform} className='underline' href={social.url}>
              {social.platform}
            </a>
          ))}
        </div>
        <div className='w-full md:text-right text-center'>
          This app is open source and available on{' '}
          <a className='underline' href='https://github.com/delwiv/portfolio'>
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
