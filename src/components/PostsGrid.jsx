import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '~/sanity/lib/image'
import { sanityFetch } from '~/sanity/lib/live'
import { POSTS_QUERY } from '~/sanity/lib/queries'

export default async function PostsGrid({ title, limit, searchParams }) {
  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
    params: { limit },
  })
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {posts.map((post) => (
        <Link
          href={`/blog/${post.slug.current}`}
          key={post._id}
          className='p-4 flex flex-col bg-gray-600 rounded-xl'
        >
          <Image
            alt={post.heroImage.alt}
            src={urlFor(post.heroImage)
              .width(500)
              .height(500)
              .fit('crop')
              .url()}
            width={500}
            height={500}
            className='rounded'
          ></Image>
          <h5>{post.title}</h5>
          <h6>{post.publishedAt}</h6>
          <p>{post.excerpt}</p>
        </Link>
      ))}
    </div>
  )
}
