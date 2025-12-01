'use client'

import { useTranslations } from 'next-intl'

export default function BenefitsKids() {
  const t = useTranslations('benefitsKids')
  
  const benefits = [
    { icon: '🎮', key: 'money' },
    { icon: '🎁', key: 'choice' },
    { icon: '🏆', key: 'accomplished' },
    { icon: '⏰', key: 'pace' },
    { icon: '🎯', key: 'fair' },
    { icon: '🌟', key: 'confidence' },
  ]

  return (
    <section className="py-20 bg-white">
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
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t(`${benefit.key}.title`)}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t(`${benefit.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
