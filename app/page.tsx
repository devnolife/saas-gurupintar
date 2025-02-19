import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Benefits from "@/components/Benefits"
import Testimonials from "@/components/Testimonials"
import PricingSection from "@/components/PricingSection"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="benefits">
        <Benefits />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </main>
  )
}

