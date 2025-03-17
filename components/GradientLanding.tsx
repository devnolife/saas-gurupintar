"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GradientLanding() {
  const [scrollY, setScrollY] = useState(0)

  // Track scroll position to enhance gradient effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient that transitions from primary to white */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-white dark:from-primary/20 dark:via-primary/10 dark:to-gray-950"></div>

        {/* Radial gradient overlay for added depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>

        {/* Subtle animated gradient elements */}
        <div
          className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        ></div>
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
          style={{
            transform: `translateY(${-scrollY * 0.05}px)`,
          }}
        ></div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-bg opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1.5 border border-primary/20 shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Revolusi Pembelajaran Modern</span>
            </motion.div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="block"
              >
                Tingkatkan
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="block text-gradient mt-2"
              >
                Kualitas Pembelajaran
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="block mt-2"
              >
                Dengan Guru Pintar
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8 text-xl text-muted-foreground"
            >
              Platform perencanaan pembelajaran yang membantu guru menciptakan pengalaman belajar yang luar biasa dengan
              mudah dan efisien.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="rounded-full bg-gradient-primary relative overflow-hidden group shadow-md shadow-primary/20"
              >
                <span className="relative z-10 flex items-center">
                  Mulai Gratis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-primary/20 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-primary"
              >
                Pelajari Lebih Lanjut
              </Button>
            </motion.div>

            {/* Quick benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-12 grid grid-cols-2 gap-4"
            >
              {[
                "Hemat waktu hingga 70%",
                "Kolaborasi real-time",
                "Template siap pakai",
                "Sesuai kurikulum terbaru",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 p-4 shadow-xl border border-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl"></div>
              <Image
                src="/placeholder.svg"
                alt="Dashboard Preview"
                width={600}
                height={400}
                className="rounded-2xl relative z-10"
              />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-secondary/5 rounded-tr-3xl"></div>

              {/* Floating cards */}
              <motion.div
                className="absolute -left-12 top-1/4 rounded-xl border border-primary/20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="text-sm font-medium text-muted-foreground">Total Guru</p>
                <p className="text-2xl font-bold text-gradient-primary">1,234</p>
              </motion.div>

              <motion.div
                className="absolute -right-12 bottom-1/4 rounded-xl border border-primary/20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <p className="text-sm font-medium text-muted-foreground">RPP Dibuat</p>
                <p className="text-2xl font-bold text-gradient-secondary">10,567</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trusted by section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-24 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Dipercaya oleh institusi pendidikan terkemuka:</p>
          <div className="flex flex-wrap items-center justify-center gap-8 grayscale opacity-70">
            <Image src="/placeholder.svg" alt="Logo 1" width={120} height={40} className="h-8 w-auto" />
            <Image src="/placeholder.svg" alt="Logo 2" width={120} height={40} className="h-8 w-auto" />
            <Image src="/placeholder.svg" alt="Logo 3" width={120} height={40} className="h-8 w-auto" />
            <Image src="/placeholder.svg" alt="Logo 4" width={120} height={40} className="h-8 w-auto" />
            <Image src="/placeholder.svg" alt="Logo 5" width={120} height={40} className="h-8 w-auto" />
          </div>
        </motion.div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 clip-path-wave"></div>
    </section>
  )
}

