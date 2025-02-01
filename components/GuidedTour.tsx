import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const tourSteps = [
  { target: "header", content: "This is where you can edit your document title and access navigation." },
  { target: "toolbar", content: "Use these tools to format your text and insert various elements." },
  { target: "editor", content: "This is your main editing area. Start typing your content here." },
  { target: "sidebar", content: "Access your document outline and quick help here." },
  { target: "footer", content: "Save, preview, or export your document using these buttons." },
]

export function GuidedTour() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, tourSteps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  if (currentStep >= tourSteps.length) return null

  const { target, content } = tourSteps[currentStep]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-sm"
    >
      <p className="mb-4">{content}</p>
      <div className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button onClick={nextStep}>{currentStep === tourSteps.length - 1 ? "Finish" : "Next"}</Button>
      </div>
    </motion.div>
  )
}

