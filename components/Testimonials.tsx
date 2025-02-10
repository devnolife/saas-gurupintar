"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Bu Rina",
    institution: "SMA 1 Surabaya",
    quote: "Guru Pintar telah membuat perencanaan pembelajaran menjadi sangat mudah! Sangat direkomendasikan.",
    image: "/placeholder.svg",
  },
  {
    name: "Pak Budi",
    institution: "SMP 3 Jakarta",
    quote: "Alat ini telah merevolusi cara saya mempersiapkan kelas. Ini adalah game changer!",
    image: "/placeholder.svg",
  },
  {
    name: "Ibu Siti",
    institution: "SD 5 Bandung",
    quote: "Fitur kolaborasinya luar biasa. Saya suka betapa mudahnya berbagi ide dengan rekan-rekan saya.",
    image: "/placeholder.svg",
  },
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 10000) // Auto-advance every 10 seconds
    return () => clearInterval(interval)
  }, [nextTestimonial]) // Added nextTestimonial to dependencies

  return (
    <section id="testimonials" className="w-full bg-gradient-to-b from-white to-light py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-very-dark mb-12">
          Apa Kata <span className="text-primary">Pengguna Kami</span>
        </h2>
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="md:w-1/3 mb-8 md:mb-0 relative"
              >
                <div className="w-48 h-48 mx-auto relative">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    fill
                    className="rounded-full object-cover border-4 border-primary"
                  />
                </div>
                <svg
                  className="absolute top-0 -left-4 w-32 h-32 fill-primary opacity-10 transform -rotate-12"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </motion.div>
              <div className="md:w-2/3 md:pl-12">
                <motion.p
                  className="text-2xl md:text-3xl italic mb-6 text-dark leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-right"
                >
                  <p className="font-semibold text-very-dark text-xl">{testimonials[currentTestimonial].name}</p>
                  <p className="text-primary">{testimonials[currentTestimonial].institution}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-0 right-0 bottom-0 md:bottom-auto md:top-1/2 flex justify-between transform md:-translate-y-1/2 px-4 md:-mx-12">
            <Button
              onClick={prevTestimonial}
              variant="ghost"
              size="icon"
              className="bg-white/50 hover:bg-white/80 transition-colors duration-200 rounded-full"
              aria-label="Testimonial sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="ghost"
              size="icon"
              className="bg-white/50 hover:bg-white/80 transition-colors duration-200 rounded-full"
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
                index === currentTestimonial ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Lihat testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

