"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Star, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Gratis",
    price: "0",
    features: ["Akses ke fitur dasar", "5 RPP per bulan", "Kolaborasi terbatas"],
    color: "primary",
  },
  {
    name: "Pro",
    price: "99.000",
    features: ["Semua fitur Gratis", "RPP tidak terbatas", "Kolaborasi penuh", "Analisis kinerja"],
    recommended: true,
    color: "secondary",
  },
  {
    name: "Sekolah",
    price: "Hubungi kami",
    features: ["Semua fitur Pro", "Manajemen sekolah", "Integrasi dengan sistem sekolah", "Dukungan prioritas"],
    color: "accent",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section
      id="pricing"
      ref={ref}
      className="bg-gradient-soft dark:bg-gradient-soft-dark py-16 md:py-24 overflow-hidden relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-light/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 noise-bg"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Harga</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Pilihan <span className="text-gradient">Paket</span> Untuk Anda
          </h2>
          <motion.p
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Pilih paket yang sesuai dengan kebutuhan Anda. Upgrade, downgrade, atau batalkan kapan saja.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-2 md:px-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-lg p-5 md:p-8 relative ${
                plan.recommended ? "border-2 border-secondary" : "border border-muted"
              }`}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 rounded-bl-xl rounded-tr-2xl text-xs md:text-sm font-semibold flex items-center">
                  <Star className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Rekomendasi
                </div>
              )}

              <div className={`inline-block p-2 rounded-lg bg-${plan.color}/10 mb-4`}>
                <Zap className={`h-5 w-5 md:h-6 md:w-6 text-${plan.color}`} />
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">{plan.name}</h3>
              <p className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gradient-primary">
                {plan.price === "Hubungi kami" ? (
                  plan.price
                ) : (
                  <>
                    Rp {plan.price}
                    <span className="text-sm md:text-base font-normal text-muted-foreground">/bulan</span>
                  </>
                )}
              </p>

              <ul className="mb-6 md:mb-8 space-y-2 md:space-y-3">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Check className={`text-${plan.color} mr-2 flex-shrink-0 h-4 w-4 md:h-5 md:w-5`} />
                    <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full relative overflow-hidden group ${
                  plan.recommended
                    ? `bg-gradient-${plan.color} hover:bg-${plan.color}/90`
                    : `bg-${plan.color}/10 hover:bg-${plan.color}/20 text-${plan.color}`
                }`}
              >
                <span className="relative z-10">{plan.price === "Hubungi kami" ? "Hubungi Kami" : "Pilih Paket"}</span>
                {plan.recommended && (
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 md:mt-16 text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Butuh solusi khusus?</h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            Kami menyediakan paket khusus untuk kebutuhan spesifik institusi Anda.
          </p>
          <Button className="rounded-full bg-gradient-primary relative overflow-hidden group">
            <span className="relative z-10">Hubungi Tim Kami</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

