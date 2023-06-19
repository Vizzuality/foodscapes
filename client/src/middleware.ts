import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import env from 'env.mjs';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (url.origin === 'https://globalfoodscapes.org') {
    return NextResponse.next();
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue as string).split(':');

    if (user === env.BASICAUTH_USERNAME && pwd === env.BASICAUTH_PASSWORD) {
      return NextResponse.next();
    }
  }
  url.pathname = '/api/auth/basic-auth';

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * - assets (static assets)
     */
    '/((?!api|_next/static|favicon.ico|assets|manifest.json).*)',
  ],
};
