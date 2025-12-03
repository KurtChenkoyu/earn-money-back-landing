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
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      // Redirect to login on error
      return NextResponse.redirect(new URL(`/${locale}/login?error=auth_failed`, requestUrl.origin))
    }
    
    // Verify session was created
    if (!data.session) {
      console.error('No session created after code exchange')
      return NextResponse.redirect(new URL(`/${locale}/login?error=no_session`, requestUrl.origin))
    }
  }

  // Always redirect to dashboard after successful auth
  const redirectUrl = `/${locale}/dashboard`
  
  return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
}

