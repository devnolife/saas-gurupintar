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
    <section id="features" className="w-full bg-gradient-to-b from-white to-light py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-very-dark mb-12">
          Fitur <span className="text-primary">Unggulan</span>
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="md:w-1/2 p-8">
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
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-0 right-0 bottom-0 md:bottom-auto md:top-1/2 flex justify-between transform md:-translate-y-1/2 px-4 md:-mx-12">
            <Button
              onClick={prevFeature}
              variant="outline"
              size="icon"
              className="bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
              aria-label="Fitur sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </Button>
            <Button
              onClick={nextFeature}
              variant="outline"
              size="icon"
              className="bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
              aria-label="Fitur selanjutnya"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFeature(index)}
              className={`w-3 h-3 rounded-full mx-1 transition-colors duration-200 ${
                index === currentFeature ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Lihat fitur ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

