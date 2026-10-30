import { createClient } from '@supabase/supabase-js'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try { body = await request.json() } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }) }
  const value = (key: string) => String(body[key] ?? '').trim()
  const name = value('name')
  const email = value('email')
  const message = value('message')
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) return Response.json({ error: 'Complete the required fields.' }, { status: 400 })

  try {
    const context = createSupabaseCaptchaContextFromEnv()
    const captcha = await verifyCaptchaSubmission({
      secret: process.env.CAPTCHA_SECRET || '', ...context,
      scope: value('captchaScope'), token: value('captchaToken'), answer: value('captchaAnswer'),
    })
    if (!captcha.ok) return Response.json({ error: 'Verification failed. Please try the new image.' }, { status: 400 })
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
    const result = await db.from('inquiries').insert({
      tenant_id: process.env.NEXT_PUBLIC_TENANT_ID, name, email,
      phone: value('phone') || null, company: value('company') || null,
      subject: value('subject') || 'General inquiry', message, status: 'unread',
    })
    if (result.error) throw result.error
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Unable to send your request right now.' }, { status: 503 })
  }
}
