"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Search, Sparkles, Plus, Minus, ArrowRight, MessageCircle, ThumbsUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// FAQ categories with emoji
const categories = [
  { id: "all", name: "Semua", emoji: "✨" },
  { id: "account", name: "Akun", emoji: "👤" },
  { id: "features", name: "Fitur", emoji: "🛠️" },
  { id: "pricing", name: "Harga", emoji: "💰" },
  { id: "security", name: "Keamanan", emoji: "🔒" },
]

// Enhanced FAQ items with categories, popularity, and emoji
const faqs = [
  {
    id: 1,
    question: "Apakah Guru Pintar gratis untuk digunakan?",
    answer:
      "Yup! Guru Pintar punya versi gratis dengan fitur dasar yang keren. Untuk fitur yang lebih advanced, kamu bisa upgrade ke paket premium kapan aja. No pressure!",
    category: "pricing",
    popular: true,
    emoji: "🆓",
  },
  {
    id: 2,
    question: "Bisakah saya berkolaborasi dengan guru lain?",
    answer:
      "Kolaborasi adalah salah satu fitur andalan kami. Kamu bisa share rencana pembelajaran dan kerja bareng dengan rekan secara real-time. Teamwork makes the dream work!",
    category: "features",
    popular: true,
    emoji: "👥",
  },
  {
    id: 3,
    question: "Seberapa aman data saya?",
    answer:
      "Keamanan data adalah prioritas utama kami. Semua data dienkripsi dan disimpan dengan standar keamanan tertinggi. Kami mematuhi regulasi perlindungan data internasional, jadi data kamu 100% aman.",
    category: "security",
    popular: false,
    emoji: "🔐",
  },
  {
    id: 4,
    question: "Apakah ada dukungan pelanggan yang tersedia?",
    answer:
      "For sure! Tim support kami siap 24/7 via live chat dan email. Kamu juga bisa akses knowledge base kami yang lengkap. We got your back!",
    category: "account",
    popular: false,
    emoji: "🎧",
  },
  {
    id: 5,
    question: "Bagaimana cara memulai dengan Guru Pintar?",
    answer:
      "Super simple! Daftar akun gratis, pilih template atau mulai dari awal, dan langsung buat rencana pembelajaran. Ada tutorial dan panduan lengkap untuk bantu kamu memulai. Easy peasy!",
    category: "account",
    popular: true,
    emoji: "🚀",
  },
  {
    id: 6,
    question: "Apakah Guru Pintar kompatibel dengan kurikulum terbaru?",
    answer:
      "Tentu! Kami selalu update platform sesuai kurikulum terbaru. Guru Pintar mendukung Kurikulum Merdeka dan kurikulum internasional. Stay fresh, stay updated!",
    category: "features",
    popular: false,
    emoji: "📚",
  },
  {
    id: 7,
    question: "Bisakah saya mengakses Guru Pintar di perangkat mobile?",
    answer:
      "Definitely! Guru Pintar fully responsive dan bisa diakses dari smartphone, tablet, atau laptop. Buat RPP kapan aja, di mana aja!",
    category: "features",
    popular: true,
    emoji: "📱",
  },
  {
    id: 8,
    question: "Bagaimana cara upgrade atau downgrade paket?",
    answer:
      "Gampang banget! Masuk ke pengaturan akun, pilih 'Kelola Paket', dan pilih paket yang kamu mau. Perubahan langsung berlaku dan kamu bisa switch kapan aja.",
    category: "pricing",
    popular: false,
    emoji: "⬆️",
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [likedFaqs, setLikedFaqs] = useState<number[]>([])
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null)

  // Filter FAQs based on search term and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = activeCategory === "all" || faq.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Toggle FAQ open/closed state
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Handle liking an FAQ
  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedFaqs((prev) => (prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]))
  }

  // Reset search when category changes
  useEffect(() => {
    setSearchTerm("")
  }, [activeCategory])

  return (
    <section id="faq" ref={ref} className="w-full py-24 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
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
            <span className="text-sm font-medium">FAQ</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Got <span className="text-gradient">Questions</span>?
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-lg"
          >
            Temukan jawaban untuk pertanyaan yang sering diajukan. Masih bingung? Chat dengan kami!
          </motion.p>
        </motion.div>

        {/* Search and filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <div className="relative mb-4 md:mb-6">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5" />
            <Input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 md:pl-12 py-5 md:py-6 text-base md:text-lg rounded-xl md:rounded-2xl border-primary/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm focus-visible:ring-primary/30"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-6 md:mb-8">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className={cn(
                  "flex items-center gap-1 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300 text-xs md:text-sm",
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 shadow-sm",
                )}
                whileHover={{ scale: activeCategory === category.id ? 1.05 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.emoji}</span>
                <span>{category.name}</span>
                {category.id === "all" && filteredFaqs.length > 0 && (
                  <Badge className="ml-1 bg-white/20 text-white text-xs">{filteredFaqs.length}</Badge>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Popular questions badge */}
        {activeCategory === "all" && !searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm bg-secondary/10 border-secondary/20 text-secondary flex items-center gap-2"
            >
              <Filter className="h-3.5 w-3.5" />
              <span>Pertanyaan Populer</span>
            </Badge>
          </motion.div>
        )}

        {/* FAQ accordion */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto space-y-4"
        >
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl"
            >
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Tidak menemukan jawaban?</h3>
              <p className="text-muted-foreground mb-6">Coba kata kunci lain atau tanyakan langsung ke kami</p>
              <Button className="rounded-full bg-gradient-primary">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat dengan Kami
              </Button>
            </motion.div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    },
                  },
                }}
                className={cn("relative overflow-hidden group", hoveredFaq === faq.id && "scale-[1.01]")}
                onMouseEnter={() => setHoveredFaq(faq.id)}
                onMouseLeave={() => setHoveredFaq(null)}
              >
                <motion.div
                  className={cn(
                    "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-sm border border-primary/10 overflow-hidden transition-all duration-300",
                    openIndex === index ? "shadow-lg" : "",
                    hoveredFaq === faq.id && "shadow-md",
                  )}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.button
                    className="flex justify-between items-center w-full text-left font-semibold p-4 md:p-6"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex items-center gap-2 md:gap-3 pr-8">
                      <span className="text-xl md:text-2xl">{faq.emoji}</span>
                      <span className="text-sm md:text-base text-foreground">{faq.question}</span>
                      {faq.popular && activeCategory === "all" && !searchTerm && (
                        <Badge className="ml-2 bg-secondary/10 text-secondary border-0 text-xs">Popular</Badge>
                      )}
                    </div>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 45 : 0,
                        backgroundColor: openIndex === index ? "rgba(var(--primary), 0.1)" : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 p-1.5 md:p-2 rounded-full ${openIndex === index ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {openIndex === index ? (
                        <Minus className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        <Plus className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 md:px-6 pb-4 md:pb-6"
                      >
                        <div className="pl-8 md:pl-10 border-l-2 border-primary/20">
                          <p className="text-sm md:text-base text-muted-foreground mb-4">{faq.answer}</p>
                          <div className="flex justify-between items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary/80 hover:bg-primary/5 gap-2 text-xs md:text-sm"
                            >
                              <span>Baca selengkapnya</span>
                              <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "gap-2 text-xs md:text-sm",
                                likedFaqs.includes(faq.id)
                                  ? "text-secondary hover:text-secondary/80 hover:bg-secondary/5"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                              )}
                              onClick={(e) => handleLike(faq.id, e)}
                            >
                              <ThumbsUp className="h-3 w-3 md:h-3.5 md:w-3.5" />
                              <span>Membantu</span>
                              {likedFaqs.includes(faq.id) && (
                                <Badge className="bg-secondary/20 text-secondary">✓</Badge>
                              )}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Decorative elements */}
                {hoveredFaq === faq.id && (
                  <>
                    <motion.div
                      className="absolute -z-10 top-0 right-0 w-24 h-24 bg-primary/5 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute -z-10 bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </>
                )}
              </motion.div>
            ))
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">Masih punya pertanyaan?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="rounded-full bg-gradient-primary relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat dengan Kami
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>

            <Button
              variant="outline"
              className="rounded-full border-primary/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
            >
              Lihat Knowledge Base
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

