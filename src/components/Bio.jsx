import { Suspense, use } from 'react'
import { client } from '~/sanity/lib/client'
import { sanityFetch } from '~/sanity/lib/live'
import { DEVELOPER_QUERY } from '~/sanity/lib/queries'

export default function Bio({ developer }) {
  const bio = use(
    sanityFetch({
      query: DEVELOPER_QUERY,
      params: { developerId: developer._ref },
    })
  )

  return <Suspense fallback='Loading bio...'></Suspense>
}
