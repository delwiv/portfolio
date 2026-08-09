import TranslationsComponent from '~/components/TranslationsComponent'
import FixedImage from '~/components/FixedImage'
import Content from '~/components/Content'
import PostCard from '~/components/PostCard'
import Reveal from '~/components/Reveal'
import { sanityFetch } from '~/sanity/lib/live'
import { BLOG_QUERY, POSTS_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'
import { getTranslation } from '~/utils/translations'
import { urlFor } from '~/sanity/lib/image'

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

  const heroImage = page?.heroImage && urlFor(page.heroImage).url()
  const description = page?.content?.filter((item) => item._type !== 'postsGrid')

  return (
    <>
      <TranslationsComponent
        translations={page?.translations}
        language={language}
        basePath='/$LANG/blog'
      ></TranslationsComponent>

      {/* Hero */}
      {heroImage && (
        <section className='relative overflow-hidden'>
          <FixedImage src={heroImage} position='top' />
          <div className='page-hero-fade absolute inset-0' />
          <div className='container-blog relative flex min-h-[38vh] flex-col justify-end pb-10 pt-32'>
            <Reveal>
              <h1 className='text-6xl md:text-7xl'>{page.title}</h1>
            </Reveal>
          </div>
        </section>
      )}

      {/* Description */}
      {description?.length > 0 && (
        <div className='container-blog py-10'>
          <div className='prose-blog mx-auto max-w-3xl'>
            {description.map((item) => (
              <Content key={item._key} item={item}></Content>
            ))}
          </div>
        </div>
      )}

      {/* Grille pleine largeur */}
      <section className='container-blog pb-16'>
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
