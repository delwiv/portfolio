import HomePage, { getTopCommentedPosts } from '~/components/HomePage'
import TranslationsComponent from '~/components/TranslationsComponent'
import { sanityFetch } from '~/sanity/lib/live'
import { ALL_POSTS_QUERY, BLOG_QUERY, POSTS_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'
import { getTranslation } from '~/utils/translations'

export default async function Home() {
  const { language } = await parseHeaders()

  const [t, { data: page }, { data: posts }, { data: allPosts }] =
    await Promise.all([
      getTranslation(language),
      sanityFetch({
        query: BLOG_QUERY,
        params: { language },
      }),
      sanityFetch({
        query: POSTS_QUERY,
        params: { limit: 11, language },
      }),
      sanityFetch({
        query: ALL_POSTS_QUERY,
      }),
    ])

  const commentedSlugs = await getTopCommentedPosts()

  const commentedPosts = commentedSlugs
    .map((slug) => allPosts.find((post) => post.slug.current === slug))
    .filter(Boolean)
    .slice(0, 4)

  return (
    <>
      <TranslationsComponent
        translations={page?.translations}
        language={language}
        basePath='/$LANG'
      ></TranslationsComponent>
      <HomePage
        page={page}
        posts={posts}
        commentedPosts={commentedPosts}
        t={t}
      ></HomePage>
    </>
  )
}
