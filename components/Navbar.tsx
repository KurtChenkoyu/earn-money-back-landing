'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { trackEvent } from '@/lib/analytics'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const languages = [
  { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  // Future ready (commented out per strategic decision - native localization only):
  // { code: 'ja', label: '日本語', flag: '🇯🇵' },
  // { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  // { code: 'ko', label: '한국어', flag: '🇰🇷' },
]

export default function Navbar({ currentLocale }: { currentLocale: string }) {
  const t = useTranslations('navbar')
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)
  
  const handleSurveyClick = () => {
    trackEvent('navbar_survey_clicked')
  }

  // Find current language from the languages array
  const currentLang = languages.find(l => l.code === currentLocale) || languages[0]

  const switchLanguage = (langCode: string) => {
    // Use next-intl's router to switch locale (maintains current path)
    router.replace(pathname, { locale: langCode })
    setIsLanguageMenuOpen(false)
    trackEvent('language_switched', { from: currentLocale, to: langCode })
  }

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLanguageMenuOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-cyan-400 font-mono">
              LexiCraft • 字塊所
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-mono font-bold text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-900/20 transition-colors"
                >
                  控制台
                </Link>
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-sm font-mono text-gray-400 hover:text-white transition-colors"
                >
                  登出
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-mono text-gray-400 hover:text-white transition-colors"
                >
                  登入
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-mono font-bold text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-900/20 transition-colors"
                >
                  註冊
                </Link>
              </>
            )}
            
            <Link
              href="/survey"
              onClick={handleSurveyClick}
              className="px-4 py-2 text-sm font-mono font-bold text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-900/20 transition-colors"
            >
              <span className="hidden sm:inline">{t('surveyLink')}</span>
              <span className="sm:hidden">{currentLocale === 'zh-TW' ? t('surveyLinkEn') : t('surveyLink')}</span>
            </Link>

            {/* Language Switcher - Integrated into Navbar */}
            <div className="relative" ref={languageMenuRef}>
              <button 
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm font-mono"
              >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.label}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-cyan-500/20 rounded-lg shadow-xl overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 text-xs font-mono hover:bg-slate-800 flex items-center space-x-3 transition-colors
                        ${currentLang.code === lang.code ? 'text-cyan-400 bg-slate-800/50' : 'text-gray-400'}
                      `}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

