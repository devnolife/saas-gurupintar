import Hero from "./components/Hero"
import Benefits from "./components/Benefits"
import Features from "./components/Features"
import Testimonials from "./components/Testimonials"
import HowItWorks from "./components/HowItWorks"
import Pricing from "./components/Pricing"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <Hero />
      <Benefits />
      <Features />
      <Testimonials />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}

