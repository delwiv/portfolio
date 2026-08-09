import { notFound } from 'next/navigation'
import Content from '~/components/Content'
import PageComponent from '~/components/Page'
import PostSummary from '~/components/PostSummary'
import RemarkComments from '~/components/RemarkComments'
import ShareButtons from '~/components/ShareButtons'
import Sources from '~/components/Sources'
import TranslationsComponent from '~/components/TranslationsComponent'
import { sanityFetch } from '~/sanity/lib/live'
import { POST_QUERY } from '~/sanity/lib/queries'
import { extractSummary } from '~/utils/summary'
import { getTranslation } from '~/utils/translations'
import { formatDate } from '~/utils/format'
import Reveal from '~/components/Reveal'
import { urlFor } from '~/sanity/lib/image'
import Image from '~/components/Image'

const remarkUrl = process.env.NEXT_PUBLIC_REMARK_URL
const remarkSite = process.env.NEXT_PUBLIC_REMARK_SITE

const countWords = (body) =>
  body.reduce((total, item) => {
    if (item._type !== 'block') return total
    return (
      total +
      item.children.reduce(
        (sum, child) => sum + (child.text?.split(/\s+/).filter(Boolean).length ?? 0),
        0
      )
    )
  }, 0)

export default async function Page({ params }) {
  const { slug, lang } = await params

  const [{ data: post }, t] = await Promise.all([
    sanityFetch({
      query: POST_QUERY,
      params: { slug },
    }),
    getTranslation(lang),
  ])

  if (!post) {
    return notFound()
  }

  const summary = extractSummary(post)
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  const readingTime = Math.max(1, Math.round(countWords(post.body) / 200))
  const categories = post.categories?.filter(Boolean) ?? []
  const heroImage = post.heroImage && urlFor(post.heroImage).url()

  return (
    <>
      <TranslationsComponent
        translations={post.translations}
        language={lang}
        basePath='/$LANG/blog/$SLUG'
      ></TranslationsComponent>

      <article className='w-full py-10'>
        {/* Hero */}
        <Reveal>
          <header className='mx-auto flex max-w-3xl flex-col items-center gap-4 text-center'>
            {categories.length > 0 && (
              <div className='flex flex-wrap justify-center gap-1.5'>
                {categories.map((cat) => (
                  <span
                    key={cat.title}
                    className='rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-strong'
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            )}
            <h1 className='text-5xl md:text-6xl'>{post.title}</h1>
            <p className='text-sm text-ink-faint'>
              {t.post.publishedOn} {formatDate(post.publishedAt, locale)} ·{' '}
              {readingTime} {t.post.minRead}
            </p>
          </header>

          {heroImage && (
            <div className='mt-8 overflow-hidden rounded-2xl border border-border'>
              <Image
                src={heroImage}
                alt={post.heroImage.alt || post.title}
                width={1600}
                height={900}
                blur
                className='aspect-video w-full object-cover'
              />
            </div>
          )}
        </Reveal>

        {/* Body : sommaire + contenu */}
        <div className='mt-12 flex w-full flex-col gap-8 px-4 md:px-8 xl:px-16 lg:flex-row'>
          <aside className='lg:w-64 lg:shrink-0'>
            <PostSummary title={post.title} summary={summary} t={t} />
          </aside>

          <div className='prose-blog prose-article min-w-0 flex-1 pb-16'>
            {post.body.map((item) => (
              <Content key={item._key} item={item} t={t}></Content>
            ))}

            {post.sources?.length > 0 && <Sources sources={post.sources} t={t} />}

            <div className='mt-12 border-t border-border pt-8'>
              <ShareButtons t={t} />
            </div>

            <div className='mt-12'>
              <RemarkComments
                remarkUrl={remarkUrl}
                remarkSite={remarkSite}
                t={t}
              />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
