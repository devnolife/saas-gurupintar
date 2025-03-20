"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MobileActionButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-4 z-50 md:hidden"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 right-0 flex flex-col gap-2"
              >
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-white dark:bg-gray-900 shadow-lg border border-primary/20"
                  onClick={scrollToTop}
                >
                  <ArrowUp className="h-5 w-5 text-primary" />
                </Button>
                <Button size="icon" className="h-12 w-12 rounded-full bg-gradient-primary shadow-lg">
                  <MessageCircle className="h-5 w-5 text-white" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-gradient-primary shadow-lg"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isExpanded ? "close" : "menu"}
                initial={{ rotate: isExpanded ? -90 : 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: isExpanded ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isExpanded ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

