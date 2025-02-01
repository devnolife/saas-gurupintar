"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

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
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="w-full bg-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Pertanyaan yang Sering Diajukan
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                className="flex justify-between items-center w-full text-left font-semibold p-4 bg-gray-50 rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white rounded-b-lg"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

