import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface OnboardingTutorialProps {
  onClose: () => void
}

const steps = [
  {
    title: "Welcome to Guru Pintar",
    content: "Let's take a quick tour of the main features to help you get started.",
  },
  {
    title: "Creating Your First RPP",
    content:
      "Click on 'Create New RPP' to start building your lesson plan. You can choose from templates or start from scratch.",
  },
  {
    title: "Collaborating with Colleagues",
    content: "Easily share your RPPs with other teachers and collaborate in real-time.",
  },
  {
    title: "Tracking Your Progress",
    content: "View your analytics to see how you're improving and identify areas for growth.",
  },
]

export default function OnboardingTutorial({ onClose }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Onboarding Tutorial</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4">
            <X className="h-6 w-6" />
          </Button>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h3>
              <p>{steps[currentStep].content}</p>
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={prevStep} disabled={currentStep === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
            {currentStep === steps.length - 1 ? "Finish" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

