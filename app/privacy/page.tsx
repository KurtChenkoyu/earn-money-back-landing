import Link from 'next/link'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/" className="text-primary-600 hover:text-primary-700 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect the following information when you join our waitlist:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Email address</strong> - Used to send you updates about our beta launch</li>
              <li><strong>Number of children</strong> - Helps us understand family size and plan our beta program</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information you provide to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Send you updates about our beta launch and product development</li>
              <li>Notify you when the platform is ready for beta testing</li>
              <li>Plan our beta program based on family sizes</li>
              <li>Send you relevant information about the Earn Money Back platform</li>
            </ul>
            <p className="mt-4">
              We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Storage and Security</h2>
            <p className="mb-4">
              Your information is stored securely using industry-standard email service providers (ConvertKit or Mailchimp) 
              that comply with data protection regulations. We implement appropriate technical and organizational measures 
              to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Access</strong> - Request a copy of the personal information we hold about you</li>
              <li><strong>Update</strong> - Correct any inaccurate information</li>
              <li><strong>Delete</strong> - Request deletion of your personal information</li>
              <li><strong>Opt-out</strong> - Unsubscribe from our emails at any time using the unsubscribe link in every email</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Opt-Out / Unsubscribe</h2>
            <p className="mb-4">
              You can opt-out of receiving emails from us at any time by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Clicking the "Unsubscribe" link at the bottom of any email we send you</li>
              <li>Contacting us directly at the email address provided below</li>
            </ul>
            <p className="mt-4">
              Once you unsubscribe, you will no longer receive updates about our beta launch, but your email will remain 
              in our system for record-keeping purposes unless you request deletion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Children's Privacy</h2>
            <p className="mb-4">
              This waitlist is for parents only. We do not knowingly collect personal information from children under the age of 20 
              (Taiwan's age of majority). When our platform launches, we will implement appropriate parental consent mechanisms 
              in compliance with Taiwan's Personal Data Protection Act (PDPA).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            </p>
            <p className="ml-4">
              <strong>Email:</strong> privacy@earnmoneyback.com<br />
              <strong>Subject:</strong> Privacy Policy Inquiry
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

