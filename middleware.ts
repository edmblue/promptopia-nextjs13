import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;

  if (!isAuth) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
}

export const config = {
  matcher: ['/profile', '/edit-prompt'],
};
