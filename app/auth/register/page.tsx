'use client'
import type React from "react"
import Image from "next/image"
import { RegistrationWizard } from "@/components/RegistrationWizard"
import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Users, Lightbulb } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
      {/* Left side - Registration Form */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-4 order-2 lg:order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Bergabung dengan Guru Pintar
          </h2>
          <RegistrationWizard />
          <p className="text-center text-sm mt-4">
            Sudah punya akun?{' '}
            <a href="/auth/login" className="text-primary hover:underline">
              Silahkan Login
            </a>
          </p>
        </div>
      </motion.div>

      {/* Right side - Illustration & Description */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 order-1 lg:order-2 bg-gradient-to-br from-primary to-secondary"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <Image
              src="/placeholder.svg"
              alt="Ilustrasi Guru"
              width={350}
              height={250}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
          <motion.h1
            className="text-3xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Tingkatkan Pengajaran Anda
          </motion.h1>
          <motion.p
            className="text-lg mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Gabung platform manajemen pendidikan terkini kami. Cocok untuk pendidik modern yang memahami teknologi.
          </motion.p>
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <FeatureItem icon={GraduationCap} text="Perencanaan Pelajaran Cerdas" />
            <FeatureItem icon={BookOpen} text="Perpustakaan Sumber Belajar" />
            <FeatureItem icon={Users} text="Manajemen Siswa" />
            <FeatureItem icon={Lightbulb} text="Alat Inovatif" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function FeatureItem({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5" />
      <span className="text-sm">{text}</span>
    </div>
  )
}
