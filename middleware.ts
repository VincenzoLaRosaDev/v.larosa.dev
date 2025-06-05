import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from './i18n/routing';

export const config = {
  matcher: ['/((?!_next/|api/|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|webp|ico)$).*)'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths like /_next or /api
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) return;

  // If the path already includes a locale, do nothing
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathname === '/') {
    // Rewrite / to /it (defaultLocale)
    return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
  }

  if (pathnameIsMissingLocale) {
    // Optional: redirect all locale-less paths (e.g. /about → /it/about)
    return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return;
}