import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from '@/lib/service-status'

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  if (!isServiceGuardExcludedPath(path) && !(await isWebsiteServiceAvailable(request))) return NextResponse.rewrite(new URL('/service-expired', request.url))
  const publicAdmin = path.startsWith('/admin/login') || path.startsWith('/admin/logout')
  if (!publicAdmin && path.startsWith('/admin') && !request.cookies.get(SESSION_COOKIE)?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('reason', 'unauthorized')
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
export const config = { matcher: ['/((?!_next/static|_next/image).*)'] }
