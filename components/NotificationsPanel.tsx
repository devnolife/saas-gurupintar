"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-100 rounded">
                <p className="text-sm">New RPP shared with you</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </li>
              <li className="p-2 bg-gray-100 rounded">
                <p className="text-sm">System update scheduled</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

