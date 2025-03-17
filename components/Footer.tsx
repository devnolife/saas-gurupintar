"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = [
  {
    title: "Perusahaan",
    links: [
      { name: "Tentang Kami", href: "/about" },
      { name: "Karir", href: "/careers" },
      { name: "Berita", href: "/news" },
      { name: "Kebijakan Privasi", href: "/privacy" },
    ],
  },
  {
    title: "Produk",
    links: [
      { name: "Fitur", href: "/features" },
      { name: "Harga", href: "/pricing" },
      { name: "FAQ", href: "/faq" },
      { name: "Testimonial", href: "/testimonials" },
    ],
  },
  {
    title: "Sumber Daya",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Panduan", href: "/guides" },
      { name: "Webinar", href: "/webinars" },
      { name: "Bantuan", href: "/help" },
    ],
  },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
]

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-muted py-12 md:py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-light/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute inset-0 noise-bg"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-gradient mb-4 inline-block">
              Guru Pintar
            </Link>
            <p className="text-muted-foreground mb-6">
              Membantu guru menciptakan pengalaman belajar yang luar biasa melalui perencanaan pembelajaran yang efektif
              dan kolaboratif.
            </p>

            <div className="mb-6 bg-muted p-4 rounded-2xl">
              <p className="text-sm font-medium mb-2">Berlangganan newsletter kami</p>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Input
                    type="email"
                    placeholder="Email Anda"
                    className="rounded-full bg-white dark:bg-gray-900 pr-12"
                  />
                  <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 bg-muted w-10 h-10 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.1)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="h-3 w-0 ml-1 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-muted pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-primary" />
              <span>info@gurupintar.com</span>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-2 text-primary" />
              <span>+62 123 456 7890</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-primary" />
              <span>Jl. Pendidikan No. 123, Jakarta, Indonesia</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Guru Pintar. Hak Cipta Dilindungi.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Syarat & Ketentuan
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Kebijakan Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

