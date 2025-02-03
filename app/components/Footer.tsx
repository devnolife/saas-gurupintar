"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

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
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com" },
]

export default function Footer() {
  return (
    <footer className="w-full bg-very-dark text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary mb-4 inline-block">
              Guru Pintar
            </Link>
            <p className="text-light mb-4">
              Membantu guru menciptakan pengalaman belajar yang luar biasa melalui perencanaan pembelajaran yang efektif
              dan kolaboratif.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="text-light hover:text-primary transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-4 text-primary">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-light hover:text-primary transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-8 mt-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-light justify-items-center">
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
          <div className="mt-4 text-center text-sm text-light">
            <p>&copy; 2025 Guru Pintar. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
