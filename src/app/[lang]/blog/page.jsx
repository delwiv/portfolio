import PageComponent from '~/components/Page'
import TranslationsComponent from '~/components/TranslationsComponent'
import { sanityFetch } from '~/sanity/lib/live'
import { BLOG_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'

export default async function Page() {
  const { language } = await parseHeaders()
  const { data } = await sanityFetch({
    query: BLOG_QUERY,
    params: { language },
  })

  return (
    <>
      <TranslationsComponent
        translations={data.translations}
        language={language}
        basePath='/$LANG/blog'
      ></TranslationsComponent>
      <PageComponent page={data}></PageComponent>
    </>
  )
}
