import { sanityFetch } from '~/sanity/lib/live'
import { HOME_QUERY, OG_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'
import queryString from 'querystring'
import ShareLink from './ShareLink'
import Image from './Image'

const ShareLinkedin = ({ url, title }) => {
  return (
    <a
      target='_blank'
      className='flex size-[32px] cursor-pointer items-center justify-center rounded-full bg-gray-100 font-bai text-3xl font-bold'
      href={`https://www.linkedin.com/shareArticle?${queryString.stringify({ mini: true, url, title })}`}
      rel='noreferrer'
    >
      <Image
        src={`/share-linkedin.svg`}
        width={32}
        height={32}
        alt='Share on LinkedIn'
      />
    </a>
  )
}

const ShareX = ({ url, title }) => {
  return (
    <a
      target='_blank'
      className='flex size-[32px] cursor-pointer items-center justify-center rounded-full bg-gray-100 p-2 font-bai text-3xl font-bold'
      href={`https://x.com/share?url=${url}&text=${title}`}
      rel='noreferrer'
    >
      <Image
        width={32}
        height={32}
        src={`/share-x.svg`}
        className='size-[32px]'
        alt='Share on X'
      />
    </a>
  )
}

export default async function ShareButtons() {
  const { url, pathname, slug } = await parseHeaders()

  const query = slug === '' ? HOME_QUERY : OG_QUERY

  const { data: page } = await sanityFetch({
    query,
    params: { slug },
  })

  return (
    <>
      <h2>Share this article</h2>
      <div className='flex gap-4'>
        <ShareX url={`${url}${pathname}`} title={page.title}></ShareX>
        <ShareLinkedin
          url={`${url}${pathname}`}
          title={page.title}
        ></ShareLinkedin>
        <ShareLink url={`${url}${pathname}`} title={page.title}></ShareLink>
      </div>
    </>
  )
}
