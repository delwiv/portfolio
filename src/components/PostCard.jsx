import clsx from 'clsx'
import Image from './Image'
import Link from 'next/link'
import { urlFor } from '~/sanity/lib/image'
import { formatDate } from '~/utils/format'

export default function PostCard({ post, language, compact = false, t }) {
  const locale = language === 'fr' ? 'fr-FR' : 'en-US'
  const date = formatDate(post.publishedAt, locale)
  const categories = post.categories?.filter(Boolean) ?? []

  return (
    <Link
      href={`/${language}/blog/${post.slug.current}`}
      className='group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
    >
      <div className='relative overflow-hidden'>
        <Image
          alt={post.heroImage?.alt || post.title}
          src={urlFor(post.heroImage).width(800).height(450).fit('crop').url()}
          width={800}
          height={450}
          blur
          className={clsx(
            'w-full object-cover transition-transform duration-500 group-hover:scale-105',
            compact ? 'aspect-video' : 'aspect-video'
          )}
        ></Image>
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      </div>

      <div className='flex flex-1 flex-col gap-2 p-5'>
        {categories.length > 0 && (
          <div className='flex flex-wrap gap-1.5'>
            {categories.map((cat) => (
              <span
                key={cat.title}
                className='rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-strong'
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <h3 className='font-display text-2xl leading-tight text-ink transition-colors group-hover:text-accent'>
          {post.title}
        </h3>

        <p className='text-xs uppercase tracking-wider text-ink-faint'>
          {t?.post?.publishedOn ?? 'Published on'} {date}
        </p>

        {post.excerpt && !compact && (
          <p className='mt-1 line-clamp-3 text-sm text-ink-soft'>
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}
