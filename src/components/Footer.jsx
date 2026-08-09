import { getTranslation } from '~/utils/translations'
import { parseHeaders } from '~/utils/headers'

const ArrowIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
    className='transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
  >
    <path d='M7 17 17 7M7 7h10v10' />
  </svg>
)

export default async function Footer({ settings }) {
  const { language } = await parseHeaders()
  const t = await getTranslation(language)

  return (
    <footer className='mt-20 border-t border-border bg-base-soft'>
      <div className='container-blog flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
          {settings.socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target='_blank'
              rel='noreferrer'
              className='group flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-accent'
            >
              {social.platform}
              <ArrowIcon />
            </a>
          ))}
        </div>

        <p className='text-sm text-ink-faint'>
          {t.footer.openSource}{' '}
          <a
            href='https://github.com/delwiv/portfolio'
            target='_blank'
            rel='noreferrer'
            className='font-medium text-ink-soft underline decoration-accent underline-offset-2 transition-colors hover:text-accent'
          >
            GitHub
          </a>
          <span className='mx-2'>·</span>
          © {new Date().getFullYear()} Louis Cathala
        </p>
      </div>
    </footer>
  )
}
