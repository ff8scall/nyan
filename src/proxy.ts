import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ko'];
const defaultLocale = 'ko';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 정적 에셋 및 내부 경로 즉시 통과 (가장 중요)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') || 
    pathname === '/favicon.ico' ||
    pathname === '/next.svg' ||
    pathname === '/vercel.svg'
  ) {
    return;
  }

  // 2. 이미 로캘이 포함되어 있는지 확인
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 3. 로캘이 없으면 기본 로캘로 리다이렉트
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  
  // 무한 루프 방지: 리다이렉트할 경로가 현재와 다를 때만 수행
  if (url.pathname !== pathname) {
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // 모든 페이지 경로에 적용 (정적 에셋 제외는 함수 내부에서 정밀 수행)
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.).*)',
  ],
};
