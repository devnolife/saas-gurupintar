"use client"

import { motion } from "framer-motion"
import { Clock, Users, BookOpen, Edit3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: <Clock className="w-12 h-12 text-primary" />,
    title: "Hemat Waktu",
    description: "Buat rencana pembelajaran dalam hitungan menit dengan template siap pakai.",
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: "Kolaborasi Mudah",
    description: "Bekerja sama dengan rekan dan berbagi ide dengan mudah.",
  },
  {
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    title: "Tingkatkan Kualitas",
    description: "Akses alat untuk menganalisis dan menyempurnakan strategi pengajaran Anda.",
  },
  {
    icon: <Edit3 className="w-12 h-12 text-primary" />,
    title: "Perencanaan Sederhana",
    description: "Editor intuitif yang dirancang khusus untuk pendidik.",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

export default function Benefits() {
  return (
    <section id="benefits" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-very-dark mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Manfaat <span className="text-primary">Utama</span>
        </motion.h2>
        <motion.p
          className="text-center text-dark mb-12 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Guru Pintar menyediakan berbagai fitur yang dirancang untuk memudahkan dan meningkatkan kualitas pengajaran
          Anda.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="mb-4 p-3 bg-light rounded-full">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-very-dark">{benefit.title}</h3>
                  <p className="text-dark">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

