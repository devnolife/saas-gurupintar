"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Fitur", href: "/#features" },
  { name: "Cara Kerja", href: "/#how-it-works" },
  { name: "Manfaat", href: "/#benefits" },
  { name: "Testimoni", href: "/#testimonials" },
  { name: "Harga", href: "/#pricing" },
  { name: "FAQ", href: "/#faq" },
]

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (href: string) => {
    setIsOpen(false)
    if (href.startsWith("/#")) {
      const element = document.querySelector(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-blur shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
                <div className="bg-primary rounded-lg p-1.5">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gradient">Guru Pintar</h4>
              </motion.div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleNavigation(item.href)}
                className="relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                  {item.name}
                </motion.span>
                {pathname === item.href && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
              >
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full bg-gradient-primary hover:bg-primary/90 relative overflow-hidden group">
                <span className="relative z-10">Daftar</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: isOpen ? -90 : 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: isOpen ? 90 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
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
            className="md:hidden bg-blur border-t border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="px-5 py-4 space-y-4">
              <ThemeToggle />
              <Link
                href="/login"
                className="block w-full text-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border border-primary text-primary hover:bg-primary/10"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="block w-full text-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                Daftar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

