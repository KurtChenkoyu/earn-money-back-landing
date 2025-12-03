import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  // Extract locale from pathname (e.g., /zh-TW/auth/callback)
  const pathname = requestUrl.pathname
  const locale = pathname.split('/')[1] || 'zh-TW'

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Always redirect to dashboard after successful auth
  // The 'next' parameter might not be preserved through OAuth flow
  const redirectUrl = `/${locale}/dashboard`
  
  return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
}

