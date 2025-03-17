"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GradientCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.6 })

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20"></div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/80 via-white/40 to-transparent dark:from-gray-950/80 dark:via-gray-950/40"></div>

        {/* Animated gradient elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-bg opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Siap Meningkatkan <span className="text-gradient">Kualitas Pembelajaran</span> Anda?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Bergabunglah dengan ribuan guru yang telah menggunakan Guru Pintar untuk menciptakan pengalaman belajar yang
            luar biasa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
              Lihat Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

