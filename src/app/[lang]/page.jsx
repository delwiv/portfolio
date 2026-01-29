import HomeComponent from '~/components/Home'
import TranslationsComponent from '~/components/TranslationsComponent'
import { sanityFetch } from '~/sanity/lib/live'
import { HOME_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'
import { getTranslation } from '~/utils/translations'

export default async function Home({ searchParams }) {
  const { locale: language } = await parseHeaders()

  const [t, { data }] = await Promise.all([
    getTranslation(language),
    sanityFetch({
      query: HOME_QUERY,
      params: { language },
    }),
  ])

  return (
    <>
      <TranslationsComponent
        translations={data.translations}
        language={language}
        basePath='/$LANG'
      ></TranslationsComponent>
      <HomeComponent
        className='home scroll-smooth'
        page={data}
        searchParams={searchParams}
        t={t}
      ></HomeComponent>
    </>
  )
}
