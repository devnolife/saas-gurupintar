"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { UserPlus, FileEdit, Share, Sparkles, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: <UserPlus className="w-10 h-10 text-primary" />,
    title: "Daftar Gratis",
    description: "Buat akun Anda dalam hitungan detik. No cap!",
    color: "primary",
    emoji: "🚀",
    features: ["Sign up cepat", "Verifikasi instan", "Zero cost"],
  },
  {
    icon: <FileEdit className="w-10 h-10 text-secondary" />,
    title: "Buat RPP/Silabus",
    description: "Editor super intuitive buat bikin rencana pembelajaran keren.",
    color: "secondary",
    emoji: "✨",
    features: ["Template ready-to-use", "Drag & drop interface", "AI assistant"],
  },
  {
    icon: <Share className="w-10 h-10 text-accent" />,
    title: "Share & Download",
    description: "Kolaborasi dengan rekan atau simpan untuk nanti. Easy peasy!",
    color: "accent",
    emoji: "🔄",
    features: ["Real-time collab", "Multiple formats", "Cloud storage"],
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [hoverStep, setHoverStep] = useState<number | null>(null)

  return (
    <section id="how-it-works" ref={ref} className="w-full py-20 md:py-28 overflow-hidden relative">
      {/* Background elements - more vibrant and dynamic */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
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
            <span className="text-sm font-medium">Cara Kerja</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">3 Steps</span> Simple AF
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Bikin RPP gak perlu ribet. Cukup ikuti 3 langkah simpel ini dan kamu siap mengajar!
          </p>
        </motion.div>

        {/* Mobile version - vertical cards */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={`mobile-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`relative bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg border border-${step.color}/20 overflow-hidden`}
              whileTap={{ scale: 0.98 }}
            >
              {/* Number indicator */}
              <div
                className={`absolute -top-6 -left-6 w-16 h-16 rounded-full bg-${step.color}/10 flex items-center justify-center text-2xl font-bold text-${step.color}`}
              >
                {index + 1}
              </div>

              {/* Emoji accent */}
              <div className="absolute top-4 right-4 text-3xl">{step.emoji}</div>

              <div className="mt-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${step.color}/10 mb-4`}
                >
                  {step.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-2 text-${step.color}`}>{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>

                <div className="space-y-2">
                  {step.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 text-${step.color}`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop version - interactive horizontal layout */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connection line */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <div className="flex justify-between items-start relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={`desktop-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="w-1/3 px-4"
                >
                  <motion.div
                    className={`relative bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg border border-${step.color}/20 h-full overflow-hidden transition-all duration-300`}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    onHoverStart={() => setHoverStep(index)}
                    onHoverEnd={() => setHoverStep(null)}
                    onClick={() => setActiveStep(activeStep === index ? null : index)}
                  >
                    {/* Step number */}
                    <motion.div
                      className={`absolute top-0 left-0 w-12 h-12 rounded-br-2xl bg-${step.color} flex items-center justify-center text-white text-xl font-bold`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {index + 1}
                    </motion.div>

                    {/* Emoji accent */}
                    <div className="absolute top-4 right-4 text-3xl">{step.emoji}</div>

                    <div className="mt-10">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${step.color}/10 mb-4`}
                      >
                        {step.icon}
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 text-${step.color}`}>{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>

                      <AnimatePresence>
                        {(activeStep === index || hoverStep === index) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2 pt-2"
                          >
                            {step.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <CheckCircle className={`h-4 w-4 text-${step.color}`} />
                                <span className="text-sm">{feature}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Decorative corner accent */}
                    <div
                      className={`absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-${step.color}/20 opacity-70`}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="rounded-full bg-gradient-primary relative overflow-hidden group shadow-lg px-8 py-6 text-lg"
          >
            <span className="relative z-10 flex items-center">
              Mulai Sekarang
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Button>

          <p className="mt-6 text-muted-foreground">
            Join <span className="font-bold text-primary">10,000+</span> guru yang sudah pakai Guru Pintar
          </p>
        </motion.div>
      </div>
    </section>
  )
}

