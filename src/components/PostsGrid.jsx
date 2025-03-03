import Link from 'next/link'
import { sanityFetch } from '~/sanity/lib/live'
import { POSTS_QUERY } from '~/sanity/lib/queries'

export default async function PostsGrid({ title, limit, searchParams }) {
  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
    params: { limit },
  })
  return (
    <>
      <h2 className='text-4xl'>{title}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug.current}`}
            key={post._id}
            className='p-4'
          >
            <h3 className='text-2xl'>{post.title}</h3>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
