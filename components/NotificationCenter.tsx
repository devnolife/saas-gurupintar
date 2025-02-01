import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: number
  title: string
  message: string
  timestamp: string
}

interface NotificationCenterProps {
  notifications: Notification[]
}

export default function NotificationCenter({ notifications }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="h-64">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <h4 className="font-semibold">{notification.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.timestamp}</p>
                  </div>
                ))
              ) : (
                <p className="p-4 text-center text-gray-500 dark:text-gray-400">No new notifications</p>
              )}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

