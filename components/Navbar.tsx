'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { trackEvent } from '@/lib/analytics'

export default function Navbar() {
  const t = useTranslations('navbar')
  
  const handleSurveyClick = () => {
    trackEvent('navbar_survey_clicked')
  }

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
            <Link
              href="/survey"
              onClick={handleSurveyClick}
              className="px-4 py-2 text-sm font-mono font-bold text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-900/20 transition-colors"
            >
              <span className="hidden sm:inline">{t('surveyLink')}</span>
              <span className="sm:hidden">{t('surveyLinkEn')}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

