import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'
export async function GET(req: NextRequest) { const response = NextResponse.redirect(new URL('/admin/login', req.url), 303); response.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 }); response.cookies.set(TENANT_COOKIE, '', { path: '/', maxAge: 0 }); return response }
