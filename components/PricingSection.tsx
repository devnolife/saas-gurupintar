"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingPackage {
  id: string
  name: string
  price: number
  billingCycle: string
  maxTeachers: number
  maxRPPsPerMonth: number
  maxSyllabiPerMonth: number
  features: string[]
  isPopular: boolean 
}

export default function PricingSection() {
  const [packages, setPackages] = useState<PricingPackage[]>([])

  useEffect(() => {
    async function fetchPricingPackages() {
      try {
        const response = await fetch("/api/pricing-packages")
        if (response.ok) {
          const data = await response.json()
          setPackages(data)
        } else {
          console.error("Failed to fetch pricing packages")
        }
      } catch (error) {
        console.error("Error fetching pricing packages:", error)
      }
    }

    fetchPricingPackages()
  }, [])

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
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`bg-white rounded-2xl shadow-lg p-8 relative ${pkg.isPopular ? "border-2 border-primary" : ""}`}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-2xl rounded-tr-2xl text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" /> Rekomendasi
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 text-very-dark">{pkg.name}</h3>
              <p className="text-4xl font-bold mb-6 text-primary">
                Rp {pkg.price.toLocaleString()}
                <span className="text-base font-normal text-dark">/{pkg.billingCycle}</span>
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <Check className="text-primary mr-2 flex-shrink-0" />
                  <span className="text-dark">Hingga {pkg.maxTeachers} guru</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 flex-shrink-0" />
                  <span className="text-dark">{pkg.maxRPPsPerMonth} RPP per bulan</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 flex-shrink-0" />
                  <span className="text-dark">{pkg.maxSyllabiPerMonth} Silabus per bulan</span>
                </li>
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-primary mr-2 flex-shrink-0" />
                    <span className="text-dark">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${pkg.isPopular ? "bg-primary hover:bg-primary-dark" : "bg-secondary hover:bg-secondary-dark"}`}
              >
                Pilih Paket
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

