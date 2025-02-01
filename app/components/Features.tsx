"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
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

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <section id="features" className="w-full bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Fitur Unggulan</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center"
            >
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-2xl font-semibold mb-4">{features[currentFeature].title}</h3>
                <p className="text-gray-600 mb-4">{features[currentFeature].description}</p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src={features[currentFeature].image || "/placeholder.svg"}
                  alt={features[currentFeature].title}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </AnimatePresence>
          <Button
            onClick={prevFeature}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            aria-label="Fitur sebelumnya"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Button>
          <Button
            onClick={nextFeature}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            aria-label="Fitur selanjutnya"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
      </div>
    </section>
  )
}

