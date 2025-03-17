"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Star,
  Lightbulb,
  Compass,
  Layers,
  Cpu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Enhanced features with more engaging content and visual elements
const features = [
  {
    title: "AI-Powered Editor",
    description: "Buat RPP dalam hitungan menit dengan bantuan AI yang memahami kebutuhan kurikulum terkini.",
    image: "/placeholder.svg",
    benefits: ["Smart templates", "Auto-generate content", "Grammar & style check", "Curriculum alignment"],
    color: "primary",
    icon: Cpu,
    tag: "SMART TECH",
    demo: {
      before: "3 jam menulis manual",
      after: "10 menit dengan AI",
    },
  },
  {
    title: "Kolaborasi Real-time",
    description: "Edit bersama rekan guru secara real-time. Lihat perubahan langsung, tanpa delay atau conflict.",
    image: "/placeholder.svg",
    benefits: ["Multi-user editing", "Comment & feedback", "Version history", "Permission controls"],
    color: "secondary",
    icon: Layers,
    tag: "TEAM WORK",
    demo: {
      before: "Email bolak-balik",
      after: "Semua di satu platform",
    },
  },
  {
    title: "Resource Hub",
    description: "Akses ribuan template, media, dan resource pembelajaran yang siap pakai dan customizable.",
    image: "/placeholder.svg",
    benefits: ["1000+ templates", "Media library", "Searchable database", "Community contributions"],
    color: "accent",
    icon: Compass,
    tag: "CONTENT RICH",
    demo: {
      before: "Cari resource berjam-jam",
      after: "Semua tersedia dalam klik",
    },
  },
  {
    title: "Analytics Dashboard",
    description: "Visualisasi data pembelajaran yang membantu kamu track progress dan identify areas for improvement.",
    image: "/placeholder.svg",
    benefits: ["Visual reports", "Progress tracking", "Performance insights", "Export capabilities"],
    color: "primary",
    icon: Lightbulb,
    tag: "INSIGHTS",
    demo: {
      before: "Guessing what works",
      after: "Data-driven decisions",
    },
  },
  {
    title: "Mobile Experience",
    description: "Akses semua fitur dari smartphone atau tablet. Bekerja di mana saja, kapan saja.",
    image: "/placeholder.svg",
    benefits: ["Responsive design", "Offline capabilities", "Cloud sync", "Touch optimized"],
    color: "secondary",
    icon: Star,
    tag: "FLEXIBILITY",
    demo: {
      before: "Terikat di laptop",
      after: "Bekerja dari mana saja",
    },
  },
]

export default function Features() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right, 0 for initial
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoverState, setHoverState] = useState({ isHovering: false, index: null })

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

  const nextFeature = () => {
    setDirection(1)
    setCurrentFeature((prev) => (prev + 1) % features.length)
  }

  const prevFeature = () => {
    setDirection(-1)
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
  }

  // Auto-advance carousel with reset on manual navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1)
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 8000)

    return () => clearTimeout(timer)
  }, [currentFeature])

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: (direction) => ({
      x: direction >= 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: (direction) => ({
      x: direction >= 0 ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
  }

  return (
    <section id="features" ref={ref} className="w-full py-24 overflow-hidden relative">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        ></div>
        <div className="absolute inset-0 noise-bg"></div>
      </div>

      <div className="container mx-auto px-4">
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
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Supercharged Features</span>
          </motion.div>

          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Tools <span className="text-gradient">Keren</span> Untuk Guru Keren
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Tingkatkan teaching game kamu dengan fitur-fitur yang didesain khusus untuk bikin proses mengajar jadi lebih
            efisien, kreatif, dan impactful.
          </p>
        </motion.div>

        {/* Feature showcase with 3D perspective */}
        <div className="relative mx-auto max-w-6xl perspective-1000">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentFeature}
              custom={direction}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid gap-8 lg:grid-cols-2 items-center"
            >
              {/* Feature content */}
              <motion.div variants={itemVariants} className="order-2 lg:order-1">
                <div className="space-y-6">
                  {/* Feature tag */}
                  <Badge
                    className={`px-3 py-1 bg-${features[currentFeature].color}/10 text-${features[currentFeature].color} border-0 text-xs font-semibold tracking-wider`}
                  >
                    {features[currentFeature].tag}
                  </Badge>

                  {/* Feature title with icon */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${features[currentFeature].color}/10`}>
                      {(() => {
                        const FeatureIcon = features[currentFeature].icon
                        return <FeatureIcon className={`h-6 w-6 text-${features[currentFeature].color}`} />
                      })()}
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">{features[currentFeature].title}</h3>
                  </div>

                  {/* Feature description */}
                  <p className="text-lg text-muted-foreground">{features[currentFeature].description}</p>

                  {/* Before/After comparison */}
                  <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="bg-muted/30 dark:bg-gray-800/30 rounded-xl p-4 backdrop-blur-sm">
                      <div className="text-sm text-muted-foreground mb-1">BEFORE</div>
                      <div className="font-medium">{features[currentFeature].demo.before}</div>
                    </div>
                    <div className={`bg-${features[currentFeature].color}/10 rounded-xl p-4 backdrop-blur-sm`}>
                      <div className={`text-sm text-${features[currentFeature].color} mb-1`}>AFTER</div>
                      <div className="font-medium">{features[currentFeature].demo.after}</div>
                    </div>
                  </div>

                  {/* Feature benefits */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Benefits
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {features[currentFeature].benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className={`h-5 w-5 flex-shrink-0 text-${features[currentFeature].color}`} />
                          <span className="text-sm">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Button
                      className={`rounded-full bg-gradient-${features[currentFeature].color} relative overflow-hidden group mt-4`}
                    >
                      <span className="relative z-10 flex items-center">
                        Explore Feature
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Feature image with 3D effect */}
              <motion.div variants={itemVariants} className="order-1 lg:order-2 perspective-1000">
                <div
                  className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden transform-style-3d"
                  style={{
                    transform: `rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${features[currentFeature].color}/20 via-transparent to-${features[currentFeature].color}/10 rounded-3xl`}
                  ></div>

                  {/* Main image */}
                  <div
                    className="relative h-full w-full p-6 transform-style-3d"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <div className="h-full w-full rounded-2xl overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl border border-white/20 dark:border-gray-800/20">
                      <Image
                        src={features[currentFeature].image || "/placeholder.svg"}
                        alt={features[currentFeature].title}
                        fill
                        className="object-cover p-4"
                      />
                    </div>
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    className={`absolute top-4 right-4 p-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-800/20 transform-style-3d`}
                    style={{ transform: "translateZ(40px)" }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap className={`h-6 w-6 text-${features[currentFeature].color}`} />
                  </motion.div>

                  <motion.div
                    className={`absolute bottom-4 left-4 p-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-800/20 transform-style-3d`}
                    style={{ transform: "translateZ(40px)" }}
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <Star className={`h-6 w-6 text-${features[currentFeature].color}`} />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="absolute left-0 right-0 bottom-0 md:bottom-auto md:top-1/2 flex justify-between transform md:-translate-y-1/2 px-4 md:-mx-12 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevFeature}
              className="h-10 w-10 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-800/20 hover:scale-110 transition-transform"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextFeature}
              className="h-10 w-10 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-800/20 hover:scale-110 transition-transform"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Feature indicators */}
        <div className="mt-12 flex justify-center gap-3">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentFeature ? 1 : -1)
                setCurrentFeature(index)
              }}
              className={`relative h-2.5 transition-all duration-300 ${
                index === currentFeature ? "w-10 bg-primary" : "w-2.5 bg-primary/20"
              } rounded-full hover:scale-110`}
              aria-label={`Go to feature ${index + 1}`}
            >
              {index === currentFeature && (
                <motion.div
                  className="absolute inset-0 bg-primary/50 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Feature quick navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentFeature ? 1 : -1)
                setCurrentFeature(index)
              }}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2",
                index === currentFeature
                  ? `bg-${feature.color}/10 text-${feature.color} font-medium`
                  : "bg-white/50 dark:bg-gray-900/50 hover:bg-white/80 dark:hover:bg-gray-900/80",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoverState({ isHovering: true, index })}
              onMouseLeave={() => setHoverState({ isHovering: false, index: null })}
            >
              {(() => {
                const FeatureIcon = feature.icon
                return (
                  <FeatureIcon
                    className={`h-4 w-4 ${index === currentFeature ? `text-${feature.color}` : "text-muted-foreground"}`}
                  />
                )
              })()}
              <span className={`${index === currentFeature ? "" : "text-muted-foreground"} text-sm`}>
                {feature.title.split(" ")[0]}
              </span>

              {/* Show tooltip on hover */}
              {hoverState.isHovering && hoverState.index === index && index !== currentFeature && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2 text-xs whitespace-nowrap z-20"
                >
                  {feature.title}
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

