export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Parent Deposits',
      description: 'Parents deposit NT$500-1,000 into a platform-controlled account. This becomes the earning pool for your child.',
      icon: '💰',
    },
    {
      number: '2',
      title: 'Child Learns',
      description: 'Kids learn vocabulary through interactive flashcards and daily word lists. They master 10-20 words per day.',
      icon: '📚',
    },
    {
      number: '3',
      title: 'Child Earns',
      description: 'Kids take verification quizzes (Day 1, 3, and 7) to prove they learned. Points unlock as they pass tests.',
      icon: '✅',
    },
    {
      number: '4',
      title: 'Parent Withdraws',
      description: 'Parents can withdraw earned cash anytime. Use it for allowance, toys, savings, or anything your child wants!',
      icon: '💵',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple 4-step process that motivates kids to learn while giving parents control
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

