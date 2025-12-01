export default function BenefitsKids() {
  const benefits = [
    {
      icon: '🎮',
      title: 'Earn Real Money',
      description: 'Not points or badges - actual cash you can spend on anything you want!',
    },
    {
      icon: '🎁',
      title: 'Choose Your Rewards',
      description: 'Want a new game? Save for something big? It\'s your money, your choice!',
    },
    {
      icon: '🏆',
      title: 'Feel Accomplished',
      description: 'See your progress grow as you master more words. You\'re building real skills!',
    },
    {
      icon: '⏰',
      title: 'Learn at Your Pace',
      description: 'Daily word lists that fit your schedule. Learn when it works for you.',
    },
    {
      icon: '🎯',
      title: 'Fair Tests',
      description: 'Multiple choice quizzes that prove you really learned, not just memorized.',
    },
    {
      icon: '🌟',
      title: 'Build Confidence',
      description: 'Every word you master is a win. Watch your vocabulary grow and feel proud!',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Benefits for Kids
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learning becomes rewarding - literally! Earn money while building skills
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
                {benefit.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

