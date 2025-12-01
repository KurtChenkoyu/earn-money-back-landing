import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Earn Money Back - Kids Earn Money by Learning Vocabulary',
  description: 'Kids earn real money by mastering vocabulary. Parents invest upfront, kids earn it back. Use earnings for allowance, toys, savings, or anything they want!',
  keywords: 'kids learning, vocabulary, earn money, education, Taiwan, English learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}

