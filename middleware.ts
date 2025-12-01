import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

// Countries/regions that should default to Traditional Chinese
const ZH_TW_REGIONS = ['TW', 'HK', 'MO'] // Taiwan, Hong Kong, Macau

function detectLocale(request: NextRequest): string {
  // Check Vercel's geolocation header (if available)
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country')
  
  // Check Cloudflare's country header (if available)
  const cfCountry = request.headers.get('cf-ipcountry')
  
  // Use the first available country code
  const detectedCountry = country || cfCountry
  
  // Default to Traditional Chinese for Taiwan, Hong Kong, Macau
  if (detectedCountry && ZH_TW_REGIONS.includes(detectedCountry)) {
    return 'zh-TW'
  }
  
  // Check Accept-Language header as fallback
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    // Check if user prefers Traditional Chinese
    if (acceptLanguage.includes('zh-TW') || acceptLanguage.includes('zh-Hant')) {
      return 'zh-TW'
    }
    // Check if user prefers English
    if (acceptLanguage.includes('en')) {
      return 'en'
    }
  }
  
  // Default to Traditional Chinese (Taiwan) as specified
  return routing.defaultLocale
}

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // If accessing root, redirect to detected locale
  if (pathname === '/') {
    const detectedLocale = detectLocale(request)
    return NextResponse.redirect(new URL(`/${detectedLocale}`, request.url))
  }
  
  // Use next-intl middleware for locale handling
  return intlMiddleware(request)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh-TW|en)/:path*']
}

