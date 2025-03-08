import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  response.headers.set('pathname', request.nextUrl.pathname)
  response.headers.set('proto', request.nextUrl.protocol)

  return response
}
