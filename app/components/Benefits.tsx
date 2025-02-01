"use client"

import { motion } from "framer-motion"
import { Clock, Users, BookOpen, Edit3 } from "lucide-react"

const benefits = [
  {
    icon: <Clock className="w-12 h-12 text-blue-600" />,
    title: "Hemat Waktu",
    description: "Buat rencana pembelajaran dalam hitungan menit dengan template siap pakai.",
  },
  {
    icon: <Users className="w-12 h-12 text-blue-600" />,
    title: "Kolaborasi Mudah",
    description: "Bekerja sama dengan rekan dan berbagi ide dengan mudah.",
  },
  {
    icon: <BookOpen className="w-12 h-12 text-blue-600" />,
    title: "Tingkatkan Kualitas Pengajaran",
    description: "Akses alat untuk menganalisis dan menyempurnakan strategi pengajaran Anda.",
  },
  {
    icon: <Edit3 className="w-12 h-12 text-blue-600" />,
    title: "Perencanaan Sederhana",
    description: "Editor intuitif yang dirancang khusus untuk pendidik.",
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="w-full bg-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Manfaat Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

