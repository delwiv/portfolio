import PageComponent from '~/components/Page'
import { sanityFetch } from '~/sanity/lib/live'
import { BLOG_QUERY } from '~/sanity/lib/queries'
import { parseHeaders } from '~/utils/headers'

export default async function Page() {
  const { language } = await parseHeaders()
  const { data } = await sanityFetch({
    query: BLOG_QUERY,
    params: { language },
  })

  return <PageComponent page={data}></PageComponent>
}
