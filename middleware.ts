import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale } from './i18n/routing';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  return NextResponse.next();
}
