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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-950/80 backdrop-blur-md border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold font-mono tracking-tighter group">
              <span className="text-white group-hover:text-neon-cyan transition-colors">Lexi</span>
              <span className="text-neon-cyan group-hover:text-white transition-colors">Craft</span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-400 border border-white/10">BETA</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-mono font-bold text-neon-cyan border border-neon-cyan/30 rounded-lg hover:bg-neon-cyan/10 transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                >
                  控制台
                </Link>
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
                >
                  登出
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:block px-4 py-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
                >
                  登入
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 text-sm font-bold text-white bg-white/10 border border-white/10 rounded-full hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm"
                >
                  註冊
                </Link>
              </>
            )}

            <Link
              href="/survey"
              onClick={handleSurveyClick}
              className="hidden md:flex px-5 py-2 text-sm font-bold text-cosmic-950 bg-neon-cyan rounded-full hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all items-center gap-2"
            >
              <span className="hidden sm:inline">{t('surveyLink')}</span>
              <span className="sm:hidden">{currentLocale === 'zh-TW' ? t('surveyLinkEn') : t('surveyLink')}</span>
            </Link>

            {/* Language Switcher - Integrated into Navbar */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm font-mono p-2 rounded-lg hover:bg-white/5"
              >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="hidden lg:inline">{currentLang.label}</span>
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
                <div className="absolute right-0 mt-2 w-40 bg-cosmic-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in-up">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 text-sm font-mono hover:bg-white/5 flex items-center space-x-3 transition-colors
                        ${currentLang.code === lang.code ? 'text-neon-cyan bg-white/5' : 'text-slate-400'}
                      `}
                    >
                      <span className="text-lg">{lang.flag}</span>
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

