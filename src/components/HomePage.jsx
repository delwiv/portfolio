import FixedImage from './FixedImage'
import PostCard from './PostCard'
import { urlFor } from '~/sanity/lib/image'

const remarkUrl = process.env.NEXT_PUBLIC_REMARK_URL
const remarkSite = process.env.NEXT_PUBLIC_REMARK_SITE

export async function getTopCommentedPosts(limit = 4) {
  if (!remarkUrl || !remarkSite) {
    return []
  }

  try {
    const res = await fetch(
      `${remarkUrl}/api/v1/comments?site=${remarkSite}&format=list&limit=200`,
      { cache: 'no-store' }
    )

    if (!res.ok) {
      return []
    }

    const comments = await res.json()

    const byUrl = new Map()

    for (const comment of comments) {
      const key = comment.locator?.url

      if (!key) {
        continue
      }

      byUrl.set(key, Math.max(byUrl.get(key) ?? 0, comment.count ?? 1))
    }

    return [...byUrl.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([url]) => url.split('/').pop())
  } catch {
    return []
  }
}

export default async function HomePage({ page, posts, commentedPosts, t }) {
  const heroImage = page?.heroImage && urlFor(page.heroImage).url()

  return (
    <div id='top' className='home scroll-smooth'>
      {heroImage && (
        <FixedImage
          src={heroImage}
          text={page.title}
          position='top'
          fullWidth
          fullHeight
        ></FixedImage>
      )}
      <div className='md:px-12 px-4 py-8 flex flex-col justify-center items-center gap-16 w-full bg-black'>
        <section className='w-full flex flex-col gap-8'>
          <h2 className='text-4xl'>{t.home.latest}</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                language={post.language}
              ></PostCard>
            ))}
          </div>
        </section>
        {commentedPosts.length > 0 && (
          <section className='w-full flex flex-col gap-8'>
            <h2 className='text-4xl'>{t.home.commented}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
              {commentedPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  language={post.language}
                ></PostCard>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
