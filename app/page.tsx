import  Hero  from "./components/Hero"
import Features   from "./components/Features"
import Benefits  from "./components/Benefits"
import  Testimonials  from "./components/Testimonials"
import  HowItWorks  from "./components/HowItWorks"
import  Pricing  from "./components/Pricing"
import  FAQ  from "./components/FAQ"
import  CallToAction  from "./components/CallToAction"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Features />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CallToAction />
    </main>
  )
}

