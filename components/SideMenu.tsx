import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50"
    >
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4">
          <X className="h-6 w-6" />
        </Button>
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <nav className="space-y-2">
          {["Dashboard", "My RPPs", "My Silabus", "Collaborations", "Settings"].map((item) => (
            <Button key={item} variant="ghost" className="w-full justify-start">
              {item}
            </Button>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}

