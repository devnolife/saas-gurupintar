"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, Sparkles, Zap, CheckCircle2 } from "lucide-react"

export default function Hero() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Terima kasih!",
      description: "Kami akan mengirimkan informasi lebih lanjut ke email Anda.",
    })
    setEmail("")
  }

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white dark:bg-gray-950 pt-28 pb-16 md:pt-40 md:pb-24"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 noise-bg"></div>
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div style={{ y, opacity }} className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Revolusi Perencanaan Pembelajaran</span>
            </motion.div>

            <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-7xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="block"
              >
                Sederhanakan
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="block text-gradient mt-2"
              >
                Perencanaan
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="block mt-2"
              >
                Pembelajaran Anda
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8 text-xl text-muted-foreground"
            >
              Hemat waktu, berkolaborasi dengan mudah, dan tingkatkan kualitas pendidikan dengan Guru Pintar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 flex-grow bg-background text-base rounded-full shadow-sm pl-12"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 shadow-sm rounded-full bg-gradient-primary relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Mulai Sekarang
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
              </form>
            </motion.div>

            {/* Quick benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              {[
                "Hemat waktu hingga 70%",
                "Kolaborasi real-time",
                "Template siap pakai",
                "Sesuai kurikulum terbaru",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* Trusted by section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-12"
            >
              <p className="mb-4 text-sm text-muted-foreground">Dipercaya oleh sekolah terkemuka:</p>
              <div className="flex flex-wrap items-center gap-6 grayscale opacity-70">
                <Image src="/placeholder.svg" alt="Logo 1" width={100} height={40} className="h-8 w-auto" />
                <Image src="/placeholder.svg" alt="Logo 2" width={100} height={40} className="h-8 w-auto" />
                <Image src="/placeholder.svg" alt="Logo 3" width={100} height={40} className="h-8 w-auto" />
                <Image src="/placeholder.svg" alt="Logo 4" width={100} height={40} className="h-8 w-auto" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main image with parallax effect */}
            <motion.div
              style={{
                x: mousePosition.x * -20,
                y: mousePosition.y * -20,
              }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5 dark:from-primary/10 dark:via-gray-900 dark:to-secondary/10 p-4 shadow-xl border border-muted"
            >
              <motion.div
                style={{
                  x: mousePosition.x * 10,
                  y: mousePosition.y * 10,
                }}
              >
                <Image src="/placeholder.svg" alt="Dashboard Preview" width={600} height={400} className="rounded-lg" />
              </motion.div>

              {/* Floating stats cards */}
              <motion.div
                className="absolute -left-12 top-1/4 rounded-xl border bg-white dark:bg-gray-900 p-4 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                  x: mousePosition.x * 30 - 20,
                  y: mousePosition.y * 20,
                }}
              >
                <p className="text-sm font-medium text-muted-foreground">Total Guru</p>
                <p className="text-2xl font-bold text-gradient-primary">1,234</p>
              </motion.div>

              <motion.div
                className="absolute -right-12 bottom-1/4 rounded-xl border bg-white dark:bg-gray-900 p-4 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{
                  x: mousePosition.x * 30 + 20,
                  y: mousePosition.y * 20,
                }}
              >
                <p className="text-sm font-medium text-muted-foreground">RPP Dibuat</p>
                <p className="text-2xl font-bold text-gradient-secondary">10,567</p>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-20 h-20 bg-secondary/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Mobile image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 relative lg:hidden"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5 dark:from-primary/10 dark:via-gray-900 dark:to-secondary/10 p-3 shadow-xl border border-muted">
              <Image src="/placeholder.svg" alt="Dashboard Preview" width={600} height={400} className="rounded-lg" />

              {/* Floating stats cards for mobile */}
              <motion.div
                className="absolute -left-4 top-1/4 rounded-xl border bg-white dark:bg-gray-900 p-3 shadow-lg scale-75"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="text-xs font-medium text-muted-foreground">Total Guru</p>
                <p className="text-xl font-bold text-gradient-primary">1,234</p>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-1/4 rounded-xl border bg-white dark:bg-gray-900 p-3 shadow-lg scale-75"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <p className="text-xs font-medium text-muted-foreground">RPP Dibuat</p>
                <p className="text-xl font-bold text-gradient-secondary">10,567</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

