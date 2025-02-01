"use client"

import { useState } from "react"
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

  return (
    <section id="testimonials" className="w-full bg-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Apa Kata Pengguna Kami</h2>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                alt={testimonials[currentTestimonial].name}
                width={100}
                height={100}
                className="rounded-full mb-4"
              />
              <p className="text-xl italic mb-4">&ldquo;{testimonials[currentTestimonial].quote}&rdquo;</p>
              <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
              <p className="text-gray-600">{testimonials[currentTestimonial].institution}</p>
            </motion.div>
          </AnimatePresence>
          <Button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            aria-label="Testimonial sebelumnya"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Button>
          <Button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            aria-label="Testimonial selanjutnya"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
      </div>
    </section>
  )
}

