"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  {
    name: "Kemendikbud",
    logo: "/placeholder.svg",
  },
  {
    name: "Universitas Indonesia",
    logo: "/placeholder.svg",
  },
  {
    name: "Universitas Gadjah Mada",
    logo: "/placeholder.svg",
  },
  {
    name: "Institut Teknologi Bandung",
    logo: "/placeholder.svg",
  },
  {
    name: "Universitas Airlangga",
    logo: "/placeholder.svg",
  },
  {
    name: "Institut Teknologi Sepuluh Nopember",
    logo: "/placeholder.svg",
  },
]

export function TrustedBy() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Dipercaya oleh
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {" "}
                & 1000+ Lainnya
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground">
              Bergabung dengan ribuan institusi pendidikan yang telah menggunakan Guru Pintar untuk meningkatkan
              kualitas pembelajaran mereka.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="flex items-center justify-center"
              >
                <div className="relative h-12 w-32 transition-all duration-200 hover:opacity-100 group">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain opacity-50 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute left-0 right-0 top-0 -z-10 h-full w-full overflow-hidden">
            <div className="absolute -left-4 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -right-4 top-3/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

