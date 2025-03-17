"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getSchoolSubscription } from "@/lib/accountQuotaManager"
import { toast } from "@/components/ui/use-toast"

interface TeacherPricingPageProps {
  schoolId: string
  teacherId: string
}

export function TeacherPricingPage({ schoolId, teacherId }: TeacherPricingPageProps) {
  const [price, setPrice] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card")
  const router = useRouter()

  useEffect(() => {
    const subscription = getSchoolSubscription(schoolId)
    if (subscription) {
      // In a real scenario, you'd fetch the actual price based on the school's plan
      setPrice(50) // Example price
    }
  }, [schoolId])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate payment processing
    const success = Math.random() > 0.2 // 80% success rate for demonstration
    if (success) {
      toast({
        title: "Payment Successful",
        description: "Your account has been activated. Redirecting to dashboard...",
      })
      // In a real scenario, you'd update the teacher's status to "Active" here
      setTimeout(() => router.push("/dashboard/teacher"), 2000)
    } else {
      toast({
        title: "Payment Failed",
        description: "Please try again or choose a different payment method.",
        variant: "destructive",
      })
    }
  }

  if (price === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Teacher Account Fee</h3>
              <p className="text-3xl font-bold">${price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">One-time payment for account activation</p>
            </div>
            <div className="space-y-4">
              <Label>Select Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                  <Label htmlFor="bank_transfer">Bank Transfer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="e_wallet" id="e_wallet" />
                  <Label htmlFor="e_wallet">E-Wallet</Label>
                </div>
              </RadioGroup>
            </div>
            {paymentMethod === "credit_card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="card_number">Card Number</Label>
                  <Input id="card_number" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                </div>
              </div>
            )}
            <Button type="submit" className="w-full">
              Complete Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

