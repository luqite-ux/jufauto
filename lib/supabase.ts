import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null | undefined

export function getSupabaseClient() {
  if (client !== undefined) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null
  return client
}
