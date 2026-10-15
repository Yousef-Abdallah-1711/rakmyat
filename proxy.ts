import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'
import { negotiateLocale } from '@/lib/i18n/negotiate-locale'

const intlMiddleware = createMiddleware(routing)
const localeCookie = 'NEXT_LOCALE'
const oneYear = 60 * 60 * 24 * 365

function isLocale(
  value: string | undefined,
): value is (typeof routing.locales)[number] {
  return (
    value !== undefined && routing.locales.some((locale) => locale === value)
  )
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const locale = negotiateLocale(
      request.cookies.get(localeCookie)?.value ?? undefined,
      request.headers.get('accept-language') ?? undefined,
    )
    const response = NextResponse.redirect(new URL(`/${locale}`, request.url))
    response.cookies.set(localeCookie, locale, {
      maxAge: oneYear,
      path: '/',
      sameSite: 'lax',
    })
    return response
  }

  const response = intlMiddleware(request)
  const pathLocale = request.nextUrl.pathname.split('/')[1]

  if (isLocale(pathLocale)) {
    response.cookies.set(localeCookie, pathLocale, {
      maxAge: oneYear,
      path: '/',
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: '/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)',
}
