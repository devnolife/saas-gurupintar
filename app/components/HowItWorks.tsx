"use client"

import { motion } from "framer-motion"
import { UserPlus, FileEdit, Share } from "lucide-react"

const steps = [
  {
    icon: <UserPlus className="w-16 h-16 text-primary" />,
    title: "Daftar Gratis",
    description: "Buat akun Anda dalam hitungan detik.",
  },
  {
    icon: <FileEdit className="w-16 h-16 text-primary" />,
    title: "Buat RPP atau Silabus Anda",
    description: "Gunakan editor intuitif kami untuk merancang rencana pembelajaran Anda.",
  },
  {
    icon: <Share className="w-16 h-16 text-primary" />,
    title: "Bagikan atau Unduh",
    description: "Kolaborasi dengan rekan atau simpan pekerjaan Anda untuk digunakan nanti.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
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

export default function HowItWorks() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-light py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-very-dark mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Cara <span className="text-primary">Kerja</span>
        </motion.h2>
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-12 md:space-y-0 md:space-x-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="flex flex-col items-center text-center max-w-sm" variants={itemVariants}>
              <motion.div
                className="mb-6 p-4 bg-white rounded-full shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {step.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 text-very-dark">{step.title}</h3>
              <p className="text-dark text-lg">{step.description}</p>
              <motion.div
                className="mt-6 h-1 w-20 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

