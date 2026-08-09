import PostCard from './PostCard'
import Reveal from './Reveal'
import Image from './Image'

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

const PostGrid = ({ posts, language, t }) => (
  <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
    {posts.map((post, i) => (
      <Reveal key={post._id} delay={Math.min(i, 8) * 60}>
        <PostCard post={post} language={language} t={t}></PostCard>
      </Reveal>
    ))}
  </div>
)

export default async function HomePage({ page, posts, commentedPosts, t }) {
  const language = posts[0]?.language ?? 'en'

  return (
    <div id='top' className='home scroll-smooth'>
      {/* Hero : logo + tagline */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-accent-soft via-base-soft/60 to-base' />
        <div className='pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.18] [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:28px_28px]' />
        <div className='container-blog relative flex min-h-[62vh] flex-col items-center justify-center gap-8 py-24 text-center'>
          <Reveal>
            <Image
              src='/logo/wrb_full.png'
              alt='Wild Red Beard'
              width={1408}
              height={768}
              priority
              className='w-52 h-auto dark:invert sm:w-64 md:w-80'
            />
          </Reveal>
          <Reveal delay={120}>
            <p className='max-w-xl text-lg text-ink-soft md:text-xl'>
              {t.home.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Latest posts */}
      <section className='container-blog flex flex-col gap-8 py-12'>
        <Reveal>
          <div className='flex items-center gap-4'>
            <h2 className='text-4xl'>{t.home.latest}</h2>
            <div className='h-px flex-1 bg-gradient-to-r from-border to-transparent' />
          </div>
        </Reveal>
        <PostGrid posts={posts} language={language} t={t} />
      </section>

      {/* Most commented */}
      {commentedPosts.length > 0 && (
        <section className='container-blog flex flex-col gap-8 py-12'>
          <Reveal>
            <div className='flex items-center gap-4'>
              <h2 className='text-4xl'>{t.home.commented}</h2>
              <div className='h-px flex-1 bg-gradient-to-r from-border to-transparent' />
            </div>
          </Reveal>
          <PostGrid
            posts={commentedPosts}
            language={language}
            t={t}
          />
        </section>
      )}
    </div>
  )
}
