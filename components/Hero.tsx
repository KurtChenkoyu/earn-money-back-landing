'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { trackEvent } from '@/lib/analytics'

export default function Hero() {
  const t = useTranslations('hero')
  
  const handleScrollToForm = () => {
    trackEvent('hero_waitlist_clicked')
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSurveyClick = () => {
    trackEvent('hero_survey_clicked')
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white pt-16">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wide font-mono">
              {t('platformName')}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            {t('headline')}
          </h1>
          <p className="text-xl sm:text-2xl mb-6 text-slate-200 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-lg sm:text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
            {t('description')}
          </p>
          
          {/* Three Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm text-slate-200">{t('valueProp1')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
              <div className="text-2xl mb-2">⛏️</div>
              <p className="text-sm text-slate-200">{t('valueProp2')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
              <div className="text-2xl mb-2">💎</div>
              <p className="text-sm text-slate-200">{t('valueProp3')}</p>
            </div>
          </div>

          {/* Primary and Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link
              href="/survey"
              onClick={handleSurveyClick}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold tracking-wider shadow-lg shadow-cyan-900/20 transition-all text-center"
            >
              {t('cta')}
            </Link>
            
            <button
              onClick={handleScrollToForm}
              className="px-8 py-4 bg-yellow-400 text-slate-900 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('ctaSecondary')}
            </button>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-300">
            <span>{t('trustBar')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

