'use client'

import { useTranslations } from 'next-intl'

export default function ParentQuestions() {
  const t = useTranslations('parentQuestions')

  const questions = [
    {
      icon: '💰',
      questionKey: 'question1',
      answerKey: 'answer1',
    },
    {
      icon: '📊',
      questionKey: 'question2',
      answerKey: 'answer2',
    },
    {
      icon: '🎯',
      questionKey: 'question3',
      answerKey: 'answer3',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{q.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t(q.questionKey)}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t(q.answerKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


