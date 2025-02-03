"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Fitur", href: "/fitur" },
  { name: "Harga", href: "/harga" },
  { name: "Testimoni", href: "/testimoni" },
  { name: "Hubungi Kami", href: "/kontak" },
]

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleJoinNow = () => {
    router.push("/auth/register")
  }

  const handleLogin = () => {
    router.push("/auth/login")
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h4 className="text-2xl font-bold text-primary">Guru Pintar</h4>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${pathname === item.href ? "text-primary bg-light" : "text-dark hover:text-primary hover:bg-light"
                  }`}
              >
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleLogin}
              className="text-dark hover:text-primary hover:bg-light transition-colors duration-200"
            >
              Masuk
            </Button>
            <Button
              onClick={handleJoinNow}
              className="bg-primary text-white hover:bg-dark transition-colors duration-200 rounded-2xl px-6 py-3"
            >
              Bergabung Sekarang
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark hover:text-primary hover:bg-light transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${pathname === item.href ? "text-primary bg-light" : "text-dark hover:text-primary hover:bg-light"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="px-5 py-4 space-y-4">
              <Button onClick={handleLogin} variant="outline" className="w-full">
                Masuk
              </Button>
              <Button onClick={handleJoinNow} className="w-full bg-primary text-white hover:bg-dark rounded-2xl px-6 py-3">
                Bergabung Sekarang
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
