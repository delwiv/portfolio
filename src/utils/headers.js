import { headers } from 'next/headers'

export const parseHeaders = async () => {
  const head = await headers()
  const origin = head.get('host')
  const pathname = head.get('pathname') || ''
  const proto = head.get('proto')

  const slug = pathname.split('/').pop()

  let url = new URL(`${proto}//${origin}`).toString()

  return { url, pathname, slug }
}
