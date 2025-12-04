import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';

export function middleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
