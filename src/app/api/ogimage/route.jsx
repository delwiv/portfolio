import { ImageResponse } from 'next/og'
import { generatePngFromDocument } from '~/lib/opengraph'
import { sanityFetch } from '~/sanity/lib/live'
import { DEVELOPER_QUERY, HOME_QUERY, OG_QUERY } from '~/sanity/lib/queries'

export const contentType = 'image/png'

export async function GET(params) {
  const url = new URL(params.url)
  const pathname = url.searchParams.get('uri')

  const language = pathname.split('/')[1]
  const lastSegment = pathname.split('/').pop()

  const slug = language === lastSegment ? '' : lastSegment

  const query = slug === '' ? HOME_QUERY : OG_QUERY

  const [{ data: page }, { data: developer }] = await Promise.all([
    sanityFetch({
      query,
      params: { slug, language },
    }),
    sanityFetch({ query: DEVELOPER_QUERY, params: { language } }),
  ])

  const { image, options } = await generatePngFromDocument(
    { page, developer },
    url.origin
  )

  const result = new ImageResponse(image, options)

  return result
}
