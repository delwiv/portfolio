import { headers } from 'next/headers'

export const parseHeaders = async () => {
  const head = await headers()
  const origin = head.get('host')
  const pathname = head.get('pathname') || ''

  const slug = pathname.split('/').pop()

  let url = new URL(`https://${origin}`).toString()

  return { url, pathname, slug }
}
