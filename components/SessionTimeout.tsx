"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"

const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
const WARNING_TIME = 5 * 60 * 1000 // 5 minutes before timeout

export default function SessionTimeout() {
  const [showWarning, setShowWarning] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let warningId: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timeoutId)
      clearTimeout(warningId)

      warningId = setTimeout(() => {
        setShowWarning(true)
      }, SESSION_TIMEOUT - WARNING_TIME)

      timeoutId = setTimeout(() => {
        logout()
      }, SESSION_TIMEOUT)
    }

    resetTimer()

    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("keypress", resetTimer)

    return () => {
      window.removeEventListener("mousemove", resetTimer)
      window.removeEventListener("keypress", resetTimer)
      clearTimeout(timeoutId)
      clearTimeout(warningId)
    }
  }, [logout])

  const handleStayLoggedIn = () => {
    setShowWarning(false)
    // This will trigger the useEffect and reset the timer
  }

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Session Timeout Warning</h2>
            <p className="mb-4">Your session is about to expire. Would you like to stay logged in?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
              <Button onClick={handleStayLoggedIn}>Stay Logged In</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

