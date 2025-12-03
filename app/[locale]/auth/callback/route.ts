import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'
  
  // Extract locale from pathname (e.g., /zh-TW/auth/callback)
  const pathname = requestUrl.pathname
  const locale = pathname.split('/')[1] || 'zh-TW'

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to dashboard or specified next URL (with locale prefix)
  const redirectUrl = next.startsWith('/') 
    ? `/${locale}${next}` 
    : `/${locale}/${next}`
  
  return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
}

