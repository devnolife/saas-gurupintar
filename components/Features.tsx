"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Editor RPP Intuitif",
    description: "Buat rencana pembelajaran dengan mudah menggunakan editor yang ramah pengguna.",
    image: "/placeholder.svg",
  },
  {
    title: "Template Siap Pakai",
    description: "Pilih dari berbagai template yang dirancang secara profesional.",
    image: "/placeholder.svg",
  },
  {
    title: "Alat Kolaborasi",
    description: "Bekerja sama dengan rekan Anda secara real-time.",
    image: "/placeholder.svg",
  },
  {
    title: "Analisis Kinerja",
    description: "Dapatkan wawasan tentang strategi pengajaran Anda dengan analitik terperinci.",
    image: "/placeholder.svg",
  },
]

export default function Features() {
  const [currentFeature, setCurrentFeature] = useState(0)

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length)
  }

  useEffect(() => {
    const interval = setInterval(nextFeature, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="features" className="w-full bg-gradient-to-b from-white to-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-very-dark mb-12">
          Fitur <span className="text-primary">Unggulan</span>
        </h2>
        <div className="relative max-w-5xl mx-auto"> {/* Increased max-width */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="md:w-1/2 p-12"> {/* Increased padding */}
                <motion.h3
                  className="text-2xl font-semibold mb-4 text-very-dark"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {features[currentFeature].title}
                </motion.h3>
                <motion.p
                  className="text-dark mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {features[currentFeature].description}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Button className="bg-primary text-white hover:bg-dark transition-colors duration-200">
                    Pelajari Lebih Lanjut
                  </Button>
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <Image
                  src={features[currentFeature].image || "/placeholder.svg"}
                  alt={features[currentFeature].title}
                  width={700}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFeature(index)}
              className={`w-3 h-3 rounded-full mx-1 transition-colors duration-200 ${index === currentFeature ? "bg-primary" : "bg-gray-300"
                }`}
              aria-label={`Lihat fitur ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

