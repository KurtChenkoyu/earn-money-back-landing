import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import BenefitsParents from '@/components/BenefitsParents'
import BenefitsKids from '@/components/BenefitsKids'
import Pricing from '@/components/Pricing'
import WaitlistForm from '@/components/WaitlistForm'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <BenefitsParents />
      <BenefitsKids />
      <Pricing />
      <FAQ />
      <WaitlistForm />
      <Footer />
    </main>
  )
}

