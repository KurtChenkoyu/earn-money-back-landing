'use client'

import { useTranslations } from 'next-intl'

export default function HowItWorks() {
  const t = useTranslations('howItWorks')
  
  const steps = [
    {
      number: '1',
      icon: '🔒',
      titleKey: 'step1.title',
      descKey: 'step1.description',
    },
    {
      number: '2',
      icon: '🧱',
      titleKey: 'step2.title',
      descKey: 'step2.description',
    },
    {
      number: '3',
      icon: '⛏️',
      titleKey: 'step3.title',
      descKey: 'step3.description',
    },
    {
      number: '4',
      icon: '✨',
      titleKey: 'step4.title',
      descKey: 'step4.description',
    },
    {
      number: '5',
      icon: '💎',
      titleKey: 'step5.title',
      descKey: 'step5.description',
    },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <div className="absolute top-4 right-4 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t(step.titleKey)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(step.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

