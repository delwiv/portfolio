export default function Footer({ settings }) {
  return (
    <div className='w-full flex justify-between p-12 gap-8'>
      <div className='flex gap-8'>
        {settings.socialLinks.map((social) => (
          <a key={social.platform} className='underline' href={social.url}>
            {social.platform}
          </a>
        ))}
      </div>
      <div>
        This app is open source and available on{' '}
        <a className='underline' href='https://github.com/delwiv/portfolio'>
          GitHub
        </a>
      </div>
    </div>
  )
}
