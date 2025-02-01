"use client"

import { motion } from "framer-motion"
import { UserPlus, FileEdit, Share } from "lucide-react"

const steps = [
  {
    icon: <UserPlus className="w-12 h-12 text-blue-600" />,
    title: "Daftar Gratis",
    description: "Buat akun Anda dalam hitungan detik.",
  },
  {
    icon: <FileEdit className="w-12 h-12 text-blue-600" />,
    title: "Buat RPP atau Silabus Anda",
    description: "Gunakan editor intuitif kami untuk merancang rencana pembelajaran Anda.",
  },
  {
    icon: <Share className="w-12 h-12 text-blue-600" />,
    title: "Bagikan atau Unduh",
    description: "Kolaborasi dengan rekan atau simpan pekerjaan Anda untuk digunakan nanti.",
  },
]

export default function HowItWorks() {
  return (
    <section className="w-full bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Cara Kerja</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {step.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

