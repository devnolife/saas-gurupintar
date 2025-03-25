import Navbar from "@/components/Navbar"
import GradientLanding from "@/components/GradientLanding"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Benefits from "@/components/Benefits"
import Testimonials from "@/components/Testimonials"
import Pricing from "@/components/Pricing"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
import GradientCTA from "@/components/GradientCTA"
import RadialGradientBackground from "@/components/RadialGradientBackground"
import MobileActionButton from "@/components/MobileActionButton"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <RadialGradientBackground />
      <Navbar />
      <GradientLanding />

      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Pricing />
      <FAQ />
      <GradientCTA />
      <Footer />
      <MobileActionButton />
    </main>
  )
}

