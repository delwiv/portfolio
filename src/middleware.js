import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  response.headers.set('pathname', request.nextUrl.pathname)

  return response
}
