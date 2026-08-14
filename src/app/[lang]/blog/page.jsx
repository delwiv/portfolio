import TranslationsComponent from '~/components/TranslationsComponent'
import PostCard from '~/components/PostCard'
import Reveal from '~/components/Reveal'
import { sanityFetch } from '~/sanity/lib/live'
import { BLOG_QUERY, POSTS_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'
import { getTranslation } from '~/utils/translations'

export default async function Page() {
  const { language } = await parseHeaders()

  const [{ data: page }, { data: posts }, t] = await Promise.all([
    sanityFetch({
      query: BLOG_QUERY,
      params: { language },
    }),
    sanityFetch({
      query: POSTS_QUERY,
      params: { limit: 12, language },
    }),
    getTranslation(language),
  ])

  return (
    <>
      <TranslationsComponent
        translations={page?.translations}
        language={language}
        basePath='/$LANG/blog'
      ></TranslationsComponent>

      {/* Titre de section */}
      <section className='container-blog pt-14'>
        <Reveal>
          <div className='flex items-center gap-4'>
            <h1 className='text-5xl md:text-6xl'>{t.blog.title}</h1>
            <div className='h-px flex-1 bg-gradient-to-r from-border to-transparent' />
          </div>
        </Reveal>
      </section>

      {/* Grille pleine largeur */}
      <section className='container-blog py-10'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {posts.map((post, i) => (
            <Reveal key={post._id} delay={Math.min(i, 8) * 60}>
              <PostCard post={post} language={language} t={t}></PostCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
