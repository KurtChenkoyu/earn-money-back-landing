'use client'

import { trackEvent } from '@/lib/analytics'

export default function Hero() {
  const handleScrollToForm = () => {
    trackEvent('hero_cta_clicked')
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Kids Earn Money by Learning Vocabulary
          </h1>
          <p className="text-xl sm:text-2xl mb-4 text-primary-100 max-w-3xl mx-auto">
            Kids earn real money by mastering vocabulary. Parents invest upfront, kids earn it back.
          </p>
          <p className="text-lg sm:text-xl mb-8 text-primary-200 max-w-2xl mx-auto">
            Use their earnings for allowance, toys, savings, or anything they want!
          </p>
          <button
            onClick={handleScrollToForm}
            className="bg-white text-primary-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Join the Waitlist - Get 50% off Beta
          </button>
        </div>
      </div>
    </section>
  )
}

