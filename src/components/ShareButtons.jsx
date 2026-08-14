import { sanityFetch } from '~/sanity/lib/live'
import { BLOG_QUERY, OG_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'
import queryString from 'querystring'
import ShareLink from './ShareLink'
import Image from './Image'

const ShareLinkedin = ({ url, title }) => {
  return (
    <a
      target='_blank'
      className='flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-ink-soft transition-all hover:border-accent hover:text-accent'
      href={`https://www.linkedin.com/shareArticle?${queryString.stringify({ mini: true, url, title })}`}
      rel='noreferrer'
      aria-label='Share on LinkedIn'
    >
      <Image
        src={`/share-linkedin.svg`}
        width={20}
        height={20}
        alt=''
      />
    </a>
  )
}

const ShareX = ({ url, title }) => {
  return (
    <a
      target='_blank'
      className='flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-ink-soft transition-all hover:border-accent hover:text-accent'
      href={`https://x.com/share?url=${url}&text=${title}`}
      rel='noreferrer'
      aria-label='Share on X'
    >
      <Image
        width={20}
        height={20}
        src={`/share-x.svg`}
        className='size-5'
        alt=''
      />
    </a>
  )
}

export default async function ShareButtons({ t }) {
  const { url, pathname, slug } = await parseHeaders()

  const query = slug === '' ? BLOG_QUERY : OG_QUERY

  const { data: page } = await sanityFetch({
    query,
    params: { slug },
  })

  return (
    <div className='flex items-center gap-4'>
      <h4 className='text-xl'>{t?.article?.share ?? 'Share this article'}</h4>
      <div className='flex gap-3'>
        <ShareX url={`${url}${pathname}`} title={page.title}></ShareX>
        <ShareLinkedin
          url={`${url}${pathname}`}
          title={page.title}
        ></ShareLinkedin>
        <ShareLink url={`${url}${pathname}`} title={page.title} t={t}></ShareLink>
      </div>
    </div>
  )
}
