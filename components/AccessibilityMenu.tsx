import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface AccessibilityMenuProps {
  isOpen: boolean
  onClose: () => void
  onFontSizeChange: (size: number) => void
  onContrastChange: (highContrast: boolean) => void
  onMotionChange: (reduceMotion: boolean) => void
}

export default function AccessibilityMenu({
  isOpen,
  onClose,
  onFontSizeChange,
  onContrastChange,
  onMotionChange,
}: AccessibilityMenuProps) {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0]
    setFontSize(newSize)
    onFontSizeChange(newSize)
  }

  const handleContrastChange = (checked: boolean) => {
    setHighContrast(checked)
    onContrastChange(checked)
  }

  const handleMotionChange = (checked: boolean) => {
    setReduceMotion(checked)
    onMotionChange(checked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-20 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Accessibility Settings</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
          <Slider id="font-size" min={12} max={24} step={1} value={[fontSize]} onValueChange={handleFontSizeChange} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="high-contrast">High Contrast</Label>
          <Switch id="high-contrast" checked={highContrast} onCheckedChange={handleContrastChange} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="reduce-motion">Reduce Motion</Label>
          <Switch id="reduce-motion" checked={reduceMotion} onCheckedChange={handleMotionChange} />
        </div>
      </div>
    </motion.div>
  )
}

