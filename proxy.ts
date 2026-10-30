import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from '@/lib/service-status'
import { protectPreviewResponse } from '@/lib/site-content/preview-protection'

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const finalize = (response: NextResponse) => {
    protectPreviewResponse(response.headers, request.cookies.has('__Host-hq-site-preview'))
    return response
  }
  if (!isServiceGuardExcludedPath(path) && !(await isWebsiteServiceAvailable(request))) return finalize(NextResponse.rewrite(new URL('/service-expired', request.url)))
  const publicAdmin = path.startsWith('/admin/login') || path.startsWith('/admin/logout')
  if (!publicAdmin && path.startsWith('/admin') && !request.cookies.get(SESSION_COOKIE)?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('reason', 'unauthorized')
    return finalize(NextResponse.redirect(url))
  }
  return finalize(NextResponse.next())
}
export const config = { matcher: ['/((?!_next/static|_next/image).*)'] }
