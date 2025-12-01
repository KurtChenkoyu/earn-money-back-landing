'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: 'How does the earning system work?',
      answer: 'Parents deposit NT$500-1,000 upfront. Kids learn vocabulary daily and take verification quizzes on Day 1, 3, and 7. As they pass tests, points unlock. Parents can withdraw the earned cash anytime.',
    },
    {
      question: 'What if my child doesn\'t complete the learning?',
      answer: 'The deposit remains in your account. You can withdraw unused funds at any time. There\'s no penalty for not completing - we want learning to be positive!',
    },
    {
      question: 'How many words will my child learn?',
      answer: 'Kids learn 10-20 words per day. The platform includes 3,000-4,000 carefully selected words from CEFR standards, Taiwan MOE curriculum, and high-frequency vocabulary.',
    },
    {
      question: 'Is this safe for kids?',
      answer: 'Yes! Parents control all deposits and withdrawals. The platform uses secure verification to ensure kids actually learn, not just game the system. All accounts are parent-owned.',
    },
    {
      question: 'When will the beta launch?',
      answer: 'We\'re targeting a 4-6 week launch timeline. Join the waitlist to be notified as soon as we\'re ready! Beta users get 50% off regular pricing.',
    },
    {
      question: 'What age is this for?',
      answer: 'The platform is designed for elementary and junior high school students (ages 6-15). All accounts must be created and managed by parents (Taiwan\'s age of majority is 20).',
    },
    {
      question: 'Can I use the earnings for anything?',
      answer: 'Yes! Parents have full control. Use earnings for allowance, toys, savings accounts, special treats, or anything your child wants. It\'s your money, your choice.',
    },
    {
      question: 'How do I withdraw money?',
      answer: 'Parents can request withdrawals anytime through the parent dashboard. Funds are transferred directly to your bank account. Processing typically takes 3-5 business days.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Earn Money Back
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-primary-600 flex-shrink-0 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

