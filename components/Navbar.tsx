"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useActiveSection } from "@/hooks/use-active-section"
import { scrollToSection } from "@/utils/scroll-to-section"

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
  const activeSection = useActiveSection(navItems.map((item) => item.href))

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
      // Use our custom scroll function
      scrollToSection(href)
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
                <h4 className="text-2xl font-bold text-gradient dark:text-white">Guru Pintar</h4>
              </motion.div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleNavigation(item.href)}
                className="relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-foreground dark:text-gray-200"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative z-10 ${activeSection === item.href ? "text-primary font-semibold" : ""}`}
                >
                  {item.name}
                </motion.span>
                {activeSection === item.href && (
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
                className="rounded-full border-primary text-primary dark:border-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
              >
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full bg-gradient-primary hover:bg-primary/90 relative overflow-hidden group dark:text-white">
                <span className="relative z-10">Daftar</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 text-foreground dark:text-white hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-200 md:hidden"
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

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-border dark:border-gray-800 shadow-lg z-50"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                      activeSection === item.href
                        ? "text-primary bg-primary/10 dark:bg-primary/20"
                        : "text-foreground dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="px-4 py-4 space-y-4 border-t border-border dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground dark:text-gray-400">Tema</span>
                  <ThemeToggle />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    className="block w-full text-center px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 border border-primary text-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 bg-gradient-primary text-primary-foreground dark:text-white hover:opacity-90"
                  >
                    Daftar
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

