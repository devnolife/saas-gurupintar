"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Bu Rina",
    institution: "SMA 1 Surabaya",
    quote: "Guru Pintar telah membuat perencanaan pembelajaran menjadi sangat mudah! Sangat direkomendasikan.",
    image: "/placeholder.svg",
    rating: 5,
  },
  {
    name: "Pak Budi",
    institution: "SMP 3 Jakarta",
    quote: "Alat ini telah merevolusi cara saya mempersiapkan kelas. Ini adalah game changer!",
    image: "/placeholder.svg",
    rating: 5,
  },
  {
    name: "Ibu Siti",
    institution: "SD 5 Bandung",
    quote: "Fitur kolaborasinya luar biasa. Saya suka betapa mudahnya berbagi ide dengan rekan-rekan saya.",
    image: "/placeholder.svg",
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 10000) // Auto-advance every 10 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" ref={ref} className="w-full bg-soft-gradient py-16 md:py-24 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-light/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
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
            <span className="text-sm font-medium">Testimoni</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Apa Kata <span className="text-gradient">Pengguna Kami</span>
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="md:w-1/3 mb-8 md:mb-0 relative"
              >
                <div className="w-32 h-32 mx-auto relative">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    fill
                    className="rounded-full object-cover border-4 border-primary"
                  />
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-900 rounded-full p-1 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    <div className="bg-primary rounded-full p-1">
                      <Quote className="h-4 w-4 text-white" />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-4 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonials[currentTestimonial].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </motion.div>
              </motion.div>

              <div className="md:w-2/3 md:pl-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative"
                >
                  <Quote className="absolute -top-6 -left-6 h-12 w-12 text-primary opacity-20 transform -rotate-12" />
                  <p className="text-2xl md:text-3xl italic mb-6 text-foreground leading-relaxed">
                    &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-right"
                >
                  <p className="font-semibold text-foreground text-xl">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gradient-primary">{testimonials[currentTestimonial].institution}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute left-0 right-0 bottom-0 md:bottom-auto md:top-1/2 flex justify-between transform md:-translate-y-1/2 px-4 md:-mx-12">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="bg-white dark:bg-gray-900 hover:bg-muted/80 transition-colors duration-200 rounded-full"
              aria-label="Testimonial sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="bg-white dark:bg-gray-900 hover:bg-muted/80 transition-colors duration-200 rounded-full"
              aria-label="Testimonial selanjutnya"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full mx-1 transition-colors duration-200 ${
                index === currentTestimonial ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
              }`}
              aria-label={`Lihat testimonial ${index + 1}`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Star className="h-4 w-4 fill-primary" />
            <span>4.9/5 dari 1000+ ulasan</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

