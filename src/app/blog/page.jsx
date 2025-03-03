import PageComponent from '~/components/Page'
import { sanityFetch } from '~/sanity/lib/live'
import { BLOG_QUERY } from '~/sanity/lib/queries'

export default async function Page() {
  const { data } = await sanityFetch({ query: BLOG_QUERY })

  return <PageComponent page={data}></PageComponent>
}
