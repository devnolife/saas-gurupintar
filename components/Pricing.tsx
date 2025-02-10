/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Gratis",
    price: "0",
    features: ["Akses ke fitur dasar", "5 RPP per bulan", "Kolaborasi terbatas"],
  },
  {
    name: "Pro",
    price: "99.000",
    features: ["Semua fitur Gratis", "RPP tidak terbatas", "Kolaborasi penuh", "Analisis kinerja"],
    recommended: true,
  },
  {
    name: "Sekolah",
    price: "Hubungi kami",
    features: ["Semua fitur Pro", "Manajemen sekolah", "Integrasi dengan sistem sekolah", "Dukungan prioritas"],
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
  return (
    <section className="bg-gradient-to-b from-white to-light py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-very-dark mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pilihan <span className="text-primary">Harga</span>
        </motion.h2>
        <motion.p
          className="text-center text-dark mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Pilih paket yang sesuai dengan kebutuhan Anda. Upgrade, downgrade, atau batalkan kapan saja.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg p-8 relative ${plan.recommended ? "border-2 border-primary" : ""}`}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-2xl rounded-tr-2xl text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" /> Rekomendasi
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 text-very-dark">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-primary">
                {plan.price === "Hubungi kami" ? (
                  plan.price
                ) : (
                  <>
                    Rp {plan.price}
                    <span className="text-base font-normal text-dark">/bulan</span>
                  </>
                )}
              </p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="text-primary mr-2 flex-shrink-0" />
                    <span className="text-dark">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${plan.recommended ? "bg-primary hover:bg-primary-dark" : "bg-secondary hover:bg-secondary-dark"}`}
              >
                {plan.price === "Hubungi kami" ? "Hubungi Kami" : "Pilih Paket"}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

