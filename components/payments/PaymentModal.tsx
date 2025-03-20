"use client"

import { useState } from "react"
import { Check, CreditCard, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { increaseQuota } from "@/lib/accountQuotaManager"

interface Plan {
  id: number
  name: string
  count: number
  price: number
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plans: Plan[]
  selectedPlan: Plan | null
  onSelectPlan: (plan: Plan) => void
  onSuccessfulPayment: (plan: Plan) => void
}

export function PaymentModal({
  isOpen,
  onClose,
  plans,
  selectedPlan,
  onSelectPlan,
  onSuccessfulPayment,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    if (!selectedPlan) return

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate increasing quota
      increaseQuota("school1", selectedPlan.count)

      // Call the success callback
      onSuccessfulPayment(selectedPlan)
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upgrade Teacher Account Quota</DialogTitle>
          <DialogDescription>Select a plan to increase your teacher account quota.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup
            value={selectedPlan?.id.toString()}
            onValueChange={(value) => {
              const plan = plans.find((p) => p.id.toString() === value)
              if (plan) onSelectPlan(plan)
            }}
          >
            <div className="grid grid-cols-1 gap-4">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all ${selectedPlan?.id === plan.id ? "border-primary" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={plan.id.toString()} id={`plan-${plan.id}`} />
                      <Label htmlFor={`plan-${plan.id}`} className="text-lg font-medium cursor-pointer">
                        {plan.name}
                      </Label>
                    </div>
                    <CardDescription>Add {plan.count} teacher accounts to your quota</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(plan.price)}</div>
                    <div className="text-muted-foreground mt-1">
                      {formatCurrency(Math.round(plan.price / plan.count))} per account
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Instant activation
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={!selectedPlan || isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay {selectedPlan ? formatCurrency(selectedPlan.price) : ""}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

