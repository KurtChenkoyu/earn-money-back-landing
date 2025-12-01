'use client'

import { useTranslations } from 'next-intl'

export default function BenefitsParents() {
  const t = useTranslations('benefitsParents')
  
  const benefits = [
    { icon: '🎯', key: 'motivate' },
    { icon: '💪', key: 'habits' },
    { icon: '👨‍👩‍👧‍👦', key: 'control' },
    { icon: '📊', key: 'progress' },
    { icon: '💰', key: 'pricing' },
    { icon: '🛡️', key: 'safe' },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t(`${benefit.key}.title`)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`${benefit.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
