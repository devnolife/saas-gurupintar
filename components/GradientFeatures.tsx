"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Sparkles, Zap, Flame, Rocket, Gamepad2, Smartphone, Lightbulb, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Enhanced features with Gen Z appeal
const features = [
  {
    title: "AI Magic ✨",
    description: "Create fire content in seconds with our AI that actually gets what you need.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-violet-500 to-fuchsia-500",
    darkColor: "from-violet-600 to-fuchsia-600",
    icon: Sparkles,
    tag: "SMART AF",
    stats: "70% faster",
    benefits: ["No more all-nighters", "Actually looks good", "Zero effort needed"],
    emoji: "🤖",
  },
  {
    title: "Squad Goals 👯",
    description: "Collab in real-time with your crew. See changes instantly, no cap.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-blue-500 to-cyan-400",
    darkColor: "from-blue-600 to-cyan-500",
    icon: Gamepad2,
    tag: "TEAM VIBES",
    stats: "10+ people",
    benefits: ["Real-time edits", "Comment threads", "Share instantly"],
    emoji: "🤝",
  },
  {
    title: "Content Goldmine 💎",
    description: "Thousands of templates and resources that don't look like they're from 2010.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-amber-500 to-orange-500",
    darkColor: "from-amber-600 to-orange-600",
    icon: Flame,
    tag: "ENDLESS INSPO",
    stats: "1000+ templates",
    benefits: ["Fresh designs", "Drag & drop", "Customizable AF"],
    emoji: "📚",
  },
  {
    title: "Data Drip 📊",
    description: "Analytics that actually make sense and help you level up your teaching game.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-green-500 to-emerald-500",
    darkColor: "from-green-600 to-emerald-600",
    icon: Rocket,
    tag: "LEVEL UP",
    stats: "5+ insights",
    benefits: ["Visual reports", "Track progress", "Spot trends"],
    emoji: "📈",
  },
  {
    title: "Mobile Moves 📱",
    description: "Full access on your phone. Create lesson plans while waiting for your coffee.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-pink-500 to-rose-500",
    darkColor: "from-pink-600 to-rose-600",
    icon: Smartphone,
    tag: "ON THE GO",
    stats: "Any device",
    benefits: ["Works offline", "Cloud sync", "Touch friendly"],
    emoji: "🏃‍♂️",
  },
]

export default function GradientFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [activeFeature, setActiveFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-rotate features
  useEffect(() => {
    if (hovered) return

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [hovered])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-primary/5 to-white dark:from-gray-950 dark:via-primary/10 dark:to-gray-950"></div>

        {/* Animated blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-multiply filter blur-3xl opacity-50"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            translateX: mousePosition.x * -20,
            translateY: mousePosition.y * -20,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 mix-blend-multiply filter blur-3xl opacity-50"
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            translateX: mousePosition.x * 20,
            translateY: mousePosition.y * 20,
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-bg opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4"
          >
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Features That Slap</span>
          </motion.div>

          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Tools That Make Teaching <span className="text-gradient">Actually Fun</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Level up your teaching game with features designed to make your life easier and your lessons more engaging.
          </p>
        </motion.div>

        {/* Feature tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveFeature(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300",
                activeFeature === index
                  ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20 scale-105"
                  : "bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 shadow-sm",
              )}
              whileHover={{ scale: activeFeature === index ? 1.05 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="text-lg">{features[index].emoji}</span>
              <span>{features[index].title.split(" ")[0]}</span>
            </motion.button>
          ))}
        </div>

        {/* Main feature display */}
        <div className="relative mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 lg:grid-cols-2 items-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Feature content */}
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  {/* Feature tag */}
                  <Badge className="px-3 py-1.5 text-xs font-bold tracking-wider bg-gradient-to-r from-primary/20 to-secondary/20 border-0">
                    {features[activeFeature].tag}
                  </Badge>

                  {/* Feature title */}
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${features[activeFeature].color} text-white`}>
                      {(() => {
                        const FeatureIcon = features[activeFeature].icon
                        return <FeatureIcon className="h-6 w-6" />
                      })()}
                    </div>
                    <h3 className="text-3xl font-bold">{features[activeFeature].title}</h3>
                  </div>

                  {/* Feature description */}
                  <p className="text-xl text-muted-foreground">{features[activeFeature].description}</p>

                  {/* Feature stats */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                    <Lightbulb className="h-4 w-4" />
                    <span>{features[activeFeature].stats}</span>
                  </div>

                  {/* Feature benefits */}
                  <div className="space-y-3 mt-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Why It's Awesome
                    </h4>
                    <div className="space-y-3">
                      {features[activeFeature].benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                          className="flex items-center gap-3 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-sm"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8"
                  >
                    <Button
                      className={`rounded-full bg-gradient-to-r ${features[activeFeature].color} text-white relative overflow-hidden group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300`}
                    >
                      <span className="relative z-10 flex items-center">
                        Try It Now
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Feature image with 3D effect */}
              <div className="order-1 lg:order-2">
                <div
                  className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].color} opacity-80 mix-blend-multiply rounded-3xl`}
                  ></div>

                  {/* Main image */}
                  <div className="relative h-full w-full p-6" style={{ transform: "translateZ(20px)" }}>
                    <div className="h-full w-full rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-xl border border-white/20 dark:border-gray-800/20">
                      <Image
                        src={features[activeFeature].image || "/placeholder.svg"}
                        alt={features[activeFeature].title}
                        fill
                        className="object-cover p-4"
                      />
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div
                    className="absolute top-4 right-4 p-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-800/20"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <div className="text-2xl">{features[activeFeature].emoji}</div>
                  </div>

                  <div
                    className="absolute bottom-4 left-4 p-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-800/20"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <Badge className="bg-gradient-to-r from-primary to-primary-light text-white border-0">
                      {features[activeFeature].tag}
                    </Badge>
                  </div>

                  {/* Floating shapes */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm"
                    style={{ transform: "translateZ(30px)" }}
                    animate={{
                      x: [0, 30, 0],
                      y: [0, -30, 0],
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm"
                    style={{ transform: "translateZ(25px)" }}
                    animate={{
                      x: [0, -20, 0],
                      y: [0, 20, 0],
                      scale: [1, 0.8, 1],
                      rotate: [0, -60, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature indicators */}
        <div className="mt-12 flex justify-center gap-3">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`relative h-3 transition-all duration-300 ${
                index === activeFeature ? "w-12 bg-gradient-to-r from-primary to-primary-light" : "w-3 bg-primary/20"
              } rounded-full hover:scale-110`}
              aria-label={`Go to feature ${index + 1}`}
            >
              {index === activeFeature && (
                <motion.div
                  className="absolute inset-0 bg-white/50 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile-friendly feature cards (visible on smaller screens) */}
        <div className="mt-16 md:hidden space-y-6">
          <h3 className="text-xl font-bold text-center mb-6">All Features</h3>

          <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            <div className="flex gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="min-w-[280px] snap-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} text-white h-full`}>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-white/20 text-white border-0">{feature.tag}</Badge>
                      <div className="text-2xl">{feature.emoji}</div>
                    </div>

                    <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                    <p className="text-white/80 mb-4">{feature.description}</p>

                    <Button
                      variant="outline"
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

