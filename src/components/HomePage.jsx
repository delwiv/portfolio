import PostCard from './PostCard'
import Reveal from './Reveal'
import Image from './Image'
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

  const heroImage = page?.heroImage && urlFor(page.heroImage).url()

  return (
    <div id='top' className='home scroll-smooth'>
      {/* Hero : image générée + logo en vignette (les 2 thèmes) */}
      <section className='relative overflow-hidden border-b border-border'>
        <Image
          src={heroImage}
          alt=''
          width={1536}
          height={1024}
          priority
          className='absolute inset-0 h-full w-full object-cover'
        />
        {/* Voile léger pour la lisibilité (plus sombre en bas) */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60' />
        <div className='container-blog relative flex min-h-[62vh] flex-col justify-end pb-14 pt-32'>
          <Reveal>
            <div className='flex flex-col items-start gap-6 md:flex-row md:items-end'>
              {/* Vignette crème : le logo noir+rouge reste lisible sur l'image sombre */}
              <div className='inline-block rounded-3xl bg-white/95 p-5 shadow-card md:p-6'>
                <Image
                  src='/logo/logo_full.png'
                  alt='Wild Red Beard'
                  width={932}
                  height={647}
                  priority
                  className='h-auto w-40 sm:w-48 md:w-56'
                />
              </div>
              <p className='max-w-md text-left text-lg text-white/90 drop-shadow-md md:pb-4 md:text-xl'>
                {t.home.tagline}
              </p>
            </div>
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
