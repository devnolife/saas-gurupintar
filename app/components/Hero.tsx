"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"


export default function Hero() {
  const {toast} = useToast()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
     toast({
      title: "Terima kasih!",
      description: "Kami akan mengirimkan informasi lebih lanjut ke email Anda.",
     })
    setEmail("")
  }

  return (
    <section className="w-full bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sederhanakan Perencanaan Pembelajaran Anda dengan Guru Pintar
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Hemat waktu, berkolaborasi dengan mudah, dan tingkatkan kualitas pendidikan.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Button type="submit" className="w-full sm:w-auto">
              Coba Gratis Sekarang
            </Button>
          </form>
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/placeholder.svg"
            alt="Guru menggunakan Guru Pintar"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}

