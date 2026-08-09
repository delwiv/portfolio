import { NextResponse } from 'next/server'
import { getUserLocale, locales } from './utils/locales.js'
import { SLUG_REDIRECTS } from './utils/redirects.js'

export function proxy(request) {
  const response = NextResponse.next()

  const { pathname } = request.nextUrl

  const ignore =
    pathname.startsWith('/api') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/favicon') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.svg')

  if (ignore) {
    return
  }

  if (pathname.includes('/resume')) {
    return NextResponse.redirect('https://cv.wildredbeard.tech')
  }

  // Redirects d'anciens slugs (301)
  const slug = pathname.split('/').pop()
  if (SLUG_REDIRECTS[slug]) {
    const pathLocale = pathname.split('/')[1]
    const prefix = locales.includes(pathLocale) ? `/${pathLocale}` : ''
    const target = `${prefix}/blog/${SLUG_REDIRECTS[slug]}`
    return NextResponse.redirect(new URL(target, request.url), 301)
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    let locale = getUserLocale(request.headers.get('accept-language'))

    if (!['en', 'fr'].includes(locale)) {
      locale = 'en'
    }

    const newPath = `/${locale}/${pathname}`

    request.nextUrl.pathname = newPath
    response.headers.set('pathname', newPath)

    return NextResponse.redirect(request.nextUrl)
  }

  response.headers.set('pathname', pathname)
  const pathLocale = pathname.split('/')[1]

  response.headers.set('locale', pathLocale)

  return response
}

export const config = {
  matcher: ['/((?!_next).*)'],
}
