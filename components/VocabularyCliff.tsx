'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { trackEvent } from '@/lib/analytics'

export default function VocabularyCliff() {
  const t = useTranslations('vocabularyCliff')
  
  const handleSurveyClick = () => {
    trackEvent('vocabulary_cliff_survey_clicked')
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
          <div className="mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="pb-4 text-gray-700 font-semibold">{t('table.stage')}</th>
                  <th className="pb-4 text-gray-700 font-semibold">{t('table.official')}</th>
                  <th className="pb-4 text-gray-700 font-semibold">{t('table.reality')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-900 font-medium">{t('table.junior')}</td>
                  <td className="py-4 text-gray-600">~1,200 {t('table.words')}</td>
                  <td className="py-4 text-green-600 font-medium">{t('table.comfortable')}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-900 font-medium">{t('table.senior')}</td>
                  <td className="py-4 text-gray-600">4,500 {t('table.words')} {t('table.listed')}</td>
                  <td className="py-4 text-orange-600 font-medium">{t('table.actuallyNeed')}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="py-4 text-gray-900 font-bold">{t('table.cliff')}</td>
                  <td className="py-4 text-red-600 font-bold">{t('table.gap')}</td>
                  <td className="py-4 text-red-600 font-bold">{t('table.crash')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-gray-800 leading-relaxed">
              {t('diagnostic')}
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-4">
              {t('keyQuestion')}
            </p>
            <Link
              href="/survey"
              onClick={handleSurveyClick}
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold tracking-wider shadow-lg shadow-cyan-900/20 transition-all"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


