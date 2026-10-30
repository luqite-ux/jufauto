import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'JUFTECH website administration', robots: { index: false, follow: false } }

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 p-5"><section className="w-full max-w-md rounded-xl bg-white p-7 shadow-2xl"><p className="text-sm font-semibold uppercase tracking-widest text-primary">JUFTECH</p><h1 className="mt-2 text-2xl font-bold text-slate-950">Website administration</h1><form action="/api/auth/login" method="post" className="mt-6 space-y-4">{error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">Sign-in failed. Check your email and password.</p>}<label className="block text-sm font-medium text-slate-800">Email<input name="email" type="email" required autoComplete="username" className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3" /></label><label className="block text-sm font-medium text-slate-800">Password<input name="password" type="password" required autoComplete="current-password" className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3" /></label><button className="h-11 w-full rounded-md bg-slate-950 font-semibold text-white" type="submit">Sign in</button></form></section></main>
}
