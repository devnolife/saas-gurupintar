import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HelpCenterProps {
  onClose: () => void
}

export default function HelpCenter({ onClose }: HelpCenterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Help Center</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4">
            <X className="h-6 w-6" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>How do I create a new RPP?</li>
                <li>Can I collaborate with other teachers?</li>
                <li>How do I view my analytics?</li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Getting Started with Guru Pintar</li>
                <li>Creating Your First RPP</li>
                <li>Understanding Your Analytics Dashboard</li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
              <p>
                Need more help? Contact our support team at{" "}
                <a href="mailto:support@gurupintar.com" className="text-blue-600 hover:underline">
                  support@gurupintar.com
                </a>
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

