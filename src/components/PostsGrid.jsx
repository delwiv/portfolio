import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '~/sanity/lib/image'
import { sanityFetch } from '~/sanity/lib/live'
import { POSTS_QUERY } from '~/sanity/lib/queries'
import { formatDate } from '~/utils/format'
import { parseHeaders } from '~/utils/headers'
import PostCard from './PostCard'

export default async function PostsGrid({ title, limit, searchParams }) {
  const { language } = await parseHeaders()
  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
    params: { limit, language },
  })

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} language={language}></PostCard>
      ))}
    </div>
  )
}
