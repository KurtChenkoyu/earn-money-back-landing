import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Earn Money Back</h3>
            <p className="text-sm">
              Kids earn money by learning vocabulary. Parents invest upfront, kids earn it back.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm">
              Questions? Reach out to us at{' '}
              <a
                href="mailto:support@earnmoneyback.com"
                className="text-primary-400 hover:text-primary-300"
              >
                support@earnmoneyback.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Earn Money Back. All rights reserved.
          </p>
          <p className="mt-2 text-gray-500">
            Designed for Taiwan market. Parent accounts required for users under 20.
          </p>
        </div>
      </div>
    </footer>
  )
}

