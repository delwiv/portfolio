import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '~/sanity/lib/image'
import { formatDate } from '~/utils/format'

export default function PostCard({ post, language, compact = false }) {
  return (
    <Link
      href={`/${language}/blog/${post.slug.current}`}
      key={post._id}
      className='p-4 flex flex-col bg-gray-600 rounded-xl'
    >
      <Image
        alt={post.heroImage.alt}
        src={urlFor(post.heroImage).width(500).height(500).fit('crop').url()}
        width={500}
        height={500}
        className={clsx(
          'rounded w-full object-cover',
          compact ? 'aspect-video' : 'aspect-square'
        )}
      ></Image>
      <h5>{post.title}</h5>
      <h6>Published on {formatDate(post.publishedAt)}</h6>
      <p>{post.excerpt}</p>
    </Link>
  )
}
