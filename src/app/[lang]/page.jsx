import PageComponent from '~/components/Page'
import { sanityFetch } from '~/sanity/lib/live'
import { HOME_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'

export default async function Home({ searchParams }) {
  const { locale: language } = await parseHeaders()

  const { data } = await sanityFetch({
    query: HOME_QUERY,
    params: { language },
  })

  return (
    <PageComponent
      className='home scroll-smooth'
      page={data}
      searchParams={searchParams}
    ></PageComponent>
  )
}
