"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Apakah Guru Pintar gratis untuk digunakan?",
    answer:
      "Ya, Guru Pintar menawarkan tingkat gratis dengan fitur dasar. Kami juga memiliki paket premium untuk fitur lanjutan dan kemampuan kolaborasi yang lebih besar.",
  },
  {
    question: "Bisakah saya berkolaborasi dengan guru lain?",
    answer:
      "Guru Pintar dirancang dengan kolaborasi sebagai fokus utama. Anda dapat dengan mudah berbagi rencana pembelajaran Anda dan bekerja sama dengan rekan secara real-time.",
  },
  {
    question: "Seberapa aman data saya?",
    answer:
      "Kami sangat serius dalam hal keamanan data. Semua data Anda dienkripsi dan disimpan dengan aman. Kami mematuhi standar perlindungan data internasional untuk memastikan informasi Anda aman.",
  },
  {
    question: "Apakah ada dukungan pelanggan yang tersedia?",
    answer:
      "Ya, kami menyediakan dukungan pelanggan 24/7 melalui chat langsung dan email. Tim dukungan kami siap membantu Anda dengan pertanyaan atau masalah apa pun yang mungkin Anda hadapi.",
  },
  {
    question: "Bagaimana cara memulai dengan Guru Pintar?",
    answer:
      "Memulai dengan Guru Pintar sangat mudah! Cukup daftar untuk akun gratis, pilih template atau mulai dari awal, dan mulai buat rencana pembelajaran Anda. Kami juga menyediakan tutorial dan panduan untuk membantu Anda memulai.",
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="w-full bg-gradient-to-b from-white to-light py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-very-dark mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pertanyaan yang Sering <span className="text-primary">Diajukan</span>
        </motion.h2>
        <motion.p
          className="text-center text-dark mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Temukan jawaban untuk pertanyaan umum tentang Guru Pintar. Jika Anda tidak menemukan apa yang Anda cari,
          jangan ragu untuk menghubungi kami.
        </motion.p>
        <motion.div
          className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <motion.button
                className="flex justify-between items-center w-full text-left font-semibold p-6"
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-very-dark pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ${openIndex === index ? "text-primary" : "text-dark"}`}
                >
                  {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-dark">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

