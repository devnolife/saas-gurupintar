"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles, Star, Zap, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

// Floating element component for visual interest
const FloatingElement = ({
  size,
  color,
  delay,
  duration,
  className,
  shape = "circle",
}: {
  size: number
  color: string
  delay: number
  duration: number
  className: string
  shape?: "circle" | "square" | "triangle" | "donut"
}) => {
  const getShapeClass = () => {
    switch (shape) {
      case "square":
        return "rounded-lg"
      case "triangle":
        return "clip-path-triangle"
      case "donut":
        return "ring-8 ring-inset"
      default:
        return "rounded-full"
    }
  }

  return (
    <motion.div
      className={`absolute ${getShapeClass()} mix-blend-multiply filter blur-xl opacity-60 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.2, 0.9, 1.1, 1],
        opacity: [0, 0.5, 0.3, 0.6, 0.4],
        y: [0, -15, 10, -20, 0],
        x: [0, 10, -15, 5, 0],
      }}
      transition={{
        delay,
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )
}

// Animated badge component
const AnimatedBadge = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 py-1.5 border border-primary/20 shadow-sm"
  >
    {children}
  </motion.div>
)

// Benefit item with animation
const BenefitItem = ({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex items-center gap-3"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
    <span className="text-sm font-medium">{text}</span>
  </motion.div>
)

export default function GradientLanding() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effects based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  // Track scroll position to enhance gradient effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Benefits data with icons
  const benefits = [
    { icon: <Zap className="h-4 w-4 text-primary" />, text: "Hemat waktu hingga 70%" },
    { icon: <Star className="h-4 w-4 text-secondary" />, text: "Kolaborasi real-time" },
    { icon: <Lightbulb className="h-4 w-4 text-accent" />, text: "Template siap pakai" },
    { icon: <CheckCircle2 className="h-4 w-4 text-primary" />, text: "Sesuai kurikulum terbaru" },
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Gradient Background with enhanced effects */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient that transitions from primary to white */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-white dark:from-primary/20 dark:via-primary/10 dark:to-gray-950"></div>

        {/* Radial gradient overlay for added depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>

        {/* Animated floating elements */}
        <FloatingElement
          size={300}
          color="rgba(45, 170, 158, 0.15)"
          delay={0}
          duration={15}
          className="top-20 left-1/4"
          shape="circle"
        />
        <FloatingElement
          size={250}
          color="rgba(255, 125, 84, 0.12)"
          delay={2}
          duration={18}
          className="bottom-40 right-1/4"
          shape="square"
        />
        <FloatingElement
          size={200}
          color="rgba(157, 141, 241, 0.1)"
          delay={1}
          duration={12}
          className="top-1/3 right-1/3"
          shape="donut"
        />
        <FloatingElement
          size={180}
          color="rgba(45, 170, 158, 0.08)"
          delay={3}
          duration={20}
          className="bottom-1/4 left-1/5"
          shape="triangle"
        />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-bg opacity-[0.03]"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column - Content */}
          <motion.div style={{ opacity }} className="flex flex-col justify-center">
            <AnimatedBadge delay={0.2}>
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Revolusi Pembelajaran Modern
              </span>
            </AnimatedBadge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <AnimatePresence>
                {isInView && (
                  <>
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                      className="block"
                    >
                      Tingkatkan
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                      className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
                    >
                      Kualitas Pembelajaran
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6, type: "spring" }}
                      className="block mt-2"
                    >
                      Dengan Guru Pintar
                    </motion.span>
                  </>
                )}
              </AnimatePresence>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mb-8 text-xl text-muted-foreground"
            >
              Platform perencanaan pembelajaran yang membantu guru menciptakan pengalaman belajar yang luar biasa dengan
              mudah dan efisien.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden group shadow-lg shadow-primary/20"
              >
                <span className="relative z-10 flex items-center font-medium">
                  Mulai Gratis
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 1 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-primary/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:bg-white hover:border-primary dark:hover:bg-gray-800 transition-all duration-300"
              >
                Pelajari Lebih Lanjut
              </Button>
            </motion.div>

            {/* Quick benefits with staggered animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {benefits.map((benefit, i) => (
                <BenefitItem key={i} icon={benefit.icon} text={benefit.text} delay={1.3 + i * 0.1} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Image with enhanced styling */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-6 shadow-2xl border border-primary/10 transform hover:scale-[1.02] transition-transform duration-500">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl"></div>

              {/* Decorative dots pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <div className="dots-pattern"></div>
              </div>

              <Image
                src="/placeholder.svg"
                alt="Dashboard Preview"
                width={600}
                height={400}
                className="rounded-2xl relative z-10 shadow-md"
              />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-secondary/5 rounded-tr-3xl"></div>

              {/* Floating cards with enhanced styling */}
              <motion.div
                className="absolute -left-12 top-1/4 rounded-xl border border-primary/20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 shadow-xl"
                initial={{ opacity: 0, x: -20, rotate: -5 }}
                animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <p className="text-sm font-medium text-muted-foreground">Total Guru</p>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                  1,234
                </p>
              </motion.div>

              <motion.div
                className="absolute -right-12 bottom-1/4 rounded-xl border border-primary/20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 shadow-xl"
                initial={{ opacity: 0, x: 20, rotate: 5 }}
                animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <p className="text-sm font-medium text-muted-foreground">RPP Dibuat</p>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
                  10,567
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>


      {/* Add CSS for custom patterns and effects */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(45, 170, 158, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(45, 170, 158, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .dots-pattern {
          background-image: radial-gradient(rgba(45, 170, 158, 0.4) 1px, transparent 1px);
          background-size: 10px 10px;
          width: 100%;
          height: 100%;
        }
        
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  )
}

