export default function BenefitsParents() {
  const benefits = [
    {
      icon: '🎯',
      title: 'Motivate Learning',
      description: 'Financial incentive makes kids actually want to learn vocabulary instead of fighting you on it.',
    },
    {
      icon: '💪',
      title: 'Build Good Habits',
      description: 'Kids develop daily learning habits that stick. They see the connection between effort and reward.',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Control',
      description: 'You decide how to reward your child. Allowance, toys, savings, or special treats - it\'s your choice.',
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'See exactly what your child is learning and how well they\'re retaining the vocabulary.',
    },
    {
      icon: '💰',
      title: 'Fair Pricing',
      description: 'Beta special: Start with just NT$500-1,000. No hidden fees, no subscriptions.',
    },
    {
      icon: '🛡️',
      title: 'Safe & Secure',
      description: 'Platform-controlled verification ensures kids actually learn, not just game the system.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Benefits for Parents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Finally, a way to motivate your kids to learn without the daily battles
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
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

