"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Clock,
  Users,
  BookOpen,
  Sparkles,
  Zap,
  BarChart,
  Lightbulb,
  Award,
  ArrowRight,
  CheckCircle2,
  Rocket,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Enhanced benefits with more Gen Z appeal
const benefits = [
  {
    icon: Clock,
    title: "Hemat Waktu 70%",
    description: "Dari 3 jam jadi cuma 30 menit buat bikin RPP. Lebih banyak me-time!",
    color: "primary",
    stats: "3 jam → 30 menit",
    features: ["Auto-generate content", "Template siap pakai", "Drag & drop builder"],
    emoji: "⏱️",
  },
  {
    icon: Users,
    title: "Kolaborasi Seru",
    description: "Kerja bareng teman guru secara real-time. No more email back-and-forth!",
    color: "secondary",
    stats: "10+ guru bisa collab",
    features: ["Edit bersama real-time", "Comment & feedback", "Version history"],
    emoji: "🤝",
  },
  {
    icon: BookOpen,
    title: "Konten Berkualitas",
    description: "Akses ribuan resource pembelajaran yang up-to-date dan engaging.",
    color: "accent",
    stats: "1000+ resource",
    features: ["Kurikulum terbaru", "Media interaktif", "Assessments tools"],
    emoji: "📚",
  },
  {
    icon: BarChart,
    title: "Analisis Keren",
    description: "Lihat insight pembelajaran dengan visualisasi data yang gampang dimengerti.",
    color: "primary",
    stats: "5+ jenis report",
    features: ["Visual dashboard", "Progress tracking", "Custom reports"],
    emoji: "📊",
  },
  {
    icon: Lightbulb,
    title: "AI Assistant",
    description: "Punya asisten AI yang bantu kamu bikin konten pembelajaran kreatif.",
    color: "secondary",
    stats: "24/7 available",
    features: ["Content suggestions", "Grammar check", "Idea generation"],
    emoji: "🤖",
  },
  {
    icon: Award,
    title: "Sertifikasi Pro",
    description: "Dapatkan sertifikat pengembangan profesi untuk portofolio kamu.",
    color: "accent",
    stats: "CPD points",
    features: ["Recognized certificates", "Skill badges", "Professional portfolio"],
    emoji: "🏆",
  },
]

// Benefit categories for filtering
const categories = [
  { id: "all", name: "Semua", emoji: "✨" },
  { id: "time", name: "Efisiensi", emoji: "⏱️" },
  { id: "collab", name: "Kolaborasi", emoji: "🤝" },
  { id: "content", name: "Konten", emoji: "📚" },
  { id: "tech", name: "Teknologi", emoji: "🚀" },
]

export default function Benefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null)

  // Map benefits to categories for filtering
  const categoryMap = {
    time: [0, 3],
    collab: [1],
    content: [2, 5],
    tech: [3, 4],
  }

  // Filter benefits based on active category
  const filteredBenefits =
    activeCategory === "all"
      ? benefits
      : benefits.filter((_, index) => categoryMap[activeCategory as keyof typeof categoryMap]?.includes(index))

  return (
    <section id="benefits" ref={ref} className="w-full py-24 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 noise-bg"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Why Choose Us</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Level Up</span> Your Teaching Game
          </h2>
          <motion.p
            className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Guru Pintar memberikan tools yang kamu butuhkan untuk jadi guru yang lebih efektif, kreatif, dan impactful!
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300",
                activeCategory === category.id
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 shadow-sm",
              )}
              whileHover={{ scale: activeCategory === category.id ? 1.05 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{category.emoji}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Benefits grid with 3D card effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBenefits.map((benefit, index) => {
            const isHovered = hoveredBenefit === index
            const isSelected = selectedBenefit === index

            return (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 12,
                          delay: index * 0.1,
                        },
                      }
                    : { opacity: 0, y: 50 }
                }
                className="relative"
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
                onClick={() => setSelectedBenefit(isSelected ? null : index)}
              >
                <motion.div
                  className={cn(
                    "h-full bg-white dark:bg-gray-900 rounded-3xl border-0 overflow-hidden relative group transition-all duration-300",
                    isHovered || isSelected ? "shadow-xl" : "shadow-md",
                    isSelected ? "ring-2 ring-primary" : "",
                  )}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isHovered ? "rotateY(5deg) rotateX(5deg)" : "rotateY(0) rotateX(0)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {/* Colorful top border */}
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-${benefit.color}`} />

                  {/* Emoji badge */}
                  <div className="absolute top-4 right-4 text-2xl z-10">{benefit.emoji}</div>

                  <div className="p-8">
                    <div className="relative z-10">
                      {/* Icon with animated background */}
                      <motion.div
                        className={`mb-6 p-3 bg-${benefit.color}/10 rounded-2xl inline-block`}
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.2,
                        }}
                      >
                        <benefit.icon className={`h-8 w-8 text-${benefit.color}`} />
                      </motion.div>

                      {/* Stats badge */}
                      <Badge className={`mb-4 px-3 py-1 bg-${benefit.color}/10 text-${benefit.color} border-0`}>
                        {benefit.stats}
                      </Badge>

                      <h3 className="text-2xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground mb-6">{benefit.description}</p>

                      {/* Feature list */}
                      <AnimatePresence>
                        {(isHovered || isSelected) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2 mb-6"
                          >
                            {benefit.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle2 className={`h-4 w-4 text-${benefit.color}`} />
                                <span className="text-sm">{feature}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Learn more button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`p-0 text-${benefit.color} hover:bg-${benefit.color}/10 group/btn`}
                      >
                        <span>Learn more</span>
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div
                    className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${benefit.color}/5 rounded-full opacity-70`}
                  />
                  <div
                    className={`absolute -top-10 -left-10 w-24 h-24 bg-${benefit.color}/5 rounded-full opacity-70`}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-2 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-gradient-primary text-white font-medium flex items-center gap-2"
            >
              <Rocket className="h-4 w-4" />
              <span>Mulai Gratis</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              <span>Lihat Demo</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              <span>Pricing</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

