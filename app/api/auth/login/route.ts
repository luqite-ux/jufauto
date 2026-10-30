import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const fail = () => NextResponse.redirect(new URL('/admin/login?error=invalid', req.url), 303)
  if (req.headers.get('origin') !== new URL(req.url).origin) return fail()
  const form = await req.formData()
  const email = String(form.get('email') || '').trim().toLowerCase()
  const password = String(form.get('password') || '')
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!email || !password || password.length > 256 || !tenantId) return fail()
  const db = createAdminClient()
  const { data: user } = await db.from('admin_users').select('id,password_hash,is_active,tenant_id').eq('email', email).maybeSingle()
  if (!user?.is_active || user.tenant_id !== tenantId || !(await bcrypt.compare(password, user.password_hash))) return fail()
  const token = randomUUID()
  const expires = new Date(Date.now() + 7 * 86400000)
  const { error } = await db.from('admin_user_sessions').insert({ admin_user_id: user.id, token, expires_at: expires.toISOString(), user_agent: req.headers.get('user-agent') })
  if (error) return fail()
  const response = NextResponse.redirect(new URL('/admin', req.url), 303)
  const options = { httpOnly: true, secure: new URL(req.url).protocol === 'https:', sameSite: 'lax' as const, path: '/', expires }
  response.cookies.set(SESSION_COOKIE, token, options)
  response.cookies.set(TENANT_COOKIE, tenantId, options)
  response.headers.set('cache-control', 'no-store')
  return response
}
