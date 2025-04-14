import { headers } from 'next/headers'
import { locales } from './locales'

export const parseHeaders = async () => {
  const head = await headers()
  const origin = head.get('host')
  const pathname = head.get('pathname') || ''
  const locale = head.get('locale')

  const tmpSlug = pathname.split('/').pop()

  let url = new URL(`https://${origin}`).toString()

  let slug = tmpSlug

  if (locales.includes(tmpSlug)) {
    slug = ''
  }

  return { url, pathname, slug, locale, language: locale }
}
