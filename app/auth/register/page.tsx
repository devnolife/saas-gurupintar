'use client'

import Image from "next/image"
import { RegistrationWizard } from "@/components/RegistrationWizard"
import { motion } from "framer-motion"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Left side - Registration Form */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 order-2 lg:order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Bergabung dengan Guru Pintar
          </h2>
          <RegistrationWizard />
        </div>
      </motion.div>

      {/* Right side - Illustration */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-12 order-1 lg:order-2 bg-gradient-to-br from-primary to-secondary"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image
              src="/placeholder.svg"
              alt="Registration illustration"
              width={500}
              height={500}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold mt-8 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Memberdayakan Sekolah Anda
          </motion.h1>
          <motion.p
            className="text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Bergabunglah dengan platform manajemen pendidikan mutakhir kami. Sempurna untuk pendidik modern yang melek teknologi.
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
