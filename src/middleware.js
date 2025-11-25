import { NextResponse } from 'next/server'
import { getUserLocale, locales } from './utils/locales.js'

export function middleware(request) {
  const response = NextResponse.next()

  const { pathname } = request.nextUrl

  const ignore =
    pathname.startsWith('/api') ||
    pathname.startsWith('/resume') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/favicon') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.svg')

  if (ignore) {
    return
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    // const locale = getUserLocale(request.headers.get('accept-language'))

    const newPath = `/en${pathname}`

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
