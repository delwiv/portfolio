import PageComponent from '~/components/Page'
import { sanityFetch } from '~/sanity/lib/live'
import { HOME_QUERY } from '~/sanity/lib/queries'

export default async function Home({ searchParams }) {
  const { data } = await sanityFetch({ query: HOME_QUERY })

  return <PageComponent page={data} searchParams={searchParams}></PageComponent>
}
