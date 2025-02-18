"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Terima kasih!",
      description: "Kami akan mengirimkan informasi lebih lanjut ke email Anda.",
    })
  }

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 mb-12 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-very-dark mb-6 leading-tight">
            Sederhanakan <span className="text-primary">Perencanaan</span> Pembelajaran Anda
          </h1>
          <p className="text-xl text-dark mb-8">
            Hemat waktu, berkolaborasi dengan mudah, dan tingkatkan kualitas pendidikan dengan Guru Pintar.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              className="w-full sm:w-auto text-lg py-6 px-8 rounded-full bg-primary hover:bg-dark text-white transition-colors duration-300"
            >
              Coba Gratis Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </motion.div>
        <motion.div
          className="md:w-1/2 relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-24 h-24 bg-light rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <motion.div
            className="relative rounded-2xl shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/placeholder.svg"
              alt="Guru menggunakan Guru Pintar"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

