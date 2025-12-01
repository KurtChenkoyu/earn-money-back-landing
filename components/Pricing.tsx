export default function Pricing() {
  const pricingTiers = [
    {
      name: 'Beta Special',
      price: 'NT$500-1,000',
      description: 'Start small, see results',
      features: [
        '10-20 words per day',
        'Daily learning sessions',
        'Verification quizzes (Day 1, 3, 7)',
        'Direct cash withdrawal',
        'Parent dashboard',
        'Progress tracking',
        '50% off regular pricing',
      ],
      highlight: true,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Beta Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Special launch pricing for early adopters - 50% off regular pricing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 shadow-lg ${
                tier.highlight
                  ? 'ring-4 ring-primary-500 transform scale-105'
                  : ''
              }`}
            >
              {tier.highlight && (
                <div className="bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
                  ⭐ Beta Special
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {tier.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-primary-600">
                  {tier.price}
                </span>
                <span className="text-gray-600 ml-2">deposit</span>
              </div>
              <p className="text-gray-600 mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            <strong>Note:</strong> This is a deposit that your child can earn back through learning.
            You maintain full control over withdrawals.
          </p>
          <p className="text-sm text-gray-500">
            Regular pricing will be NT$1,000-2,000 after beta period ends
          </p>
        </div>
      </div>
    </section>
  )
}

