import { ImageResponse } from 'next/og'
import { generatePngFromDocument } from '~/lib/opengraph'
import { sanityFetch } from '~/sanity/lib/live'
import { DEVELOPER_QUERY, HOME_QUERY, OG_QUERY } from '~/sanity/lib/queries'

export const contentType = 'image/png'

export async function GET(params) {
  const url = new URL(params.url)
  const uri = url.searchParams.get('uri')
  // console.log({ url, uri })

  const slug = uri.split('/').pop()

  // console.log({ slug })

  const query = slug === '' ? HOME_QUERY : OG_QUERY

  const [{ data: page }, { data: developer }] = await Promise.all([
    sanityFetch({
      query,
      params: { slug },
    }),
    sanityFetch({ query: DEVELOPER_QUERY }),
  ])

  const { image, options } = await generatePngFromDocument(
    { page, developer },
    url.origin
  )

  return new ImageResponse(image, options)
}
