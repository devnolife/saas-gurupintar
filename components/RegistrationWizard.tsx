"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User, Building, Package, CreditCard } from "lucide-react"

const steps = [
  { icon: User, title: "Personal Info" },
  { icon: Building, title: "School Details" },
  { icon: Package, title: "Package Selection" },
  { icon: CreditCard, title: "Payment" },
]

export function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    schoolName: "",
    teacherCount: "",
    package: "",
    paymentMethod: "credit_card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length - 1) {
      nextStep()
    } else {
      console.log("Registration data:", formData)
      alert("Registration successful! Your account has been created.")
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  required
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacherCount">Number of Teachers</Label>
                <Input
                  id="teacherCount"
                  name="teacherCount"
                  type="number"
                  value={formData.teacherCount}
                  onChange={handleInputChange}
                  required
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="package">Package</Label>
            <Select onValueChange={(value) => handleSelectChange("package", value)}>
              <SelectTrigger className="bg-white/50 backdrop-blur-sm">
                <SelectValue placeholder="Select a package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case 3:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Payment Method</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dana" id="dana" />
                    <Label htmlFor="dana">Dana</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gopay" id="gopay" />
                    <Label htmlFor="gopay">GoPay</Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.paymentMethod === "credit_card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${index <= currentStep ? "text-primary" : "text-gray-400"}`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.3 }}
            >
              <step.icon className="w-8 h-8 mb-2" />
            </motion.div>
            <motion.span
              className="text-sm"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.1, duration: 0.3 }}
            >
              {step.title}
            </motion.span>
          </div>
        ))}
      </div>
      <Card className="bg-white/30 backdrop-blur-md shadow-xl">
        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          variant="outline"
          className="bg-white/50 backdrop-blur-sm"
        >
          Previous
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
          {currentStep === steps.length - 1 ? "Complete Registration" : "Next"}
        </Button>
      </div>
    </form>
  )
}

