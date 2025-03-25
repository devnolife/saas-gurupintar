"use client"

import { useState, Suspense, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TeachersList } from "@/components/teachers/TeachersList"
import { TeachersListSkeleton } from "@/components/teachers/TeachersListSkeleton"
import { AddTeacherForm } from "@/components/teachers/AddTeacherForm"
import { useToast } from "@/hooks/use-toast"
import { getTeacherQuota, getRemainingQuota, useQuota } from "@/lib/accountQuotaManager"
import { PaymentModal } from "@/components/payments/PaymentModal"

// Define interface for teacher form data
interface TeacherFormData {
  fullName: string;
  email: string;
  subject?: string;
  [key: string]: any; // For any additional fields
}

// Define interface for quota plan
interface QuotaPlan {
  id: number;
  name: string;
  count: number;
  price: number;
}

// Pricing plans for account quota
const quotaPlans: QuotaPlan[] = [
  { id: 1, name: "10 Teacher Accounts", count: 10, price: 500000 },
  { id: 2, name: "25 Teacher Accounts", count: 25, price: 1000000 },
  { id: 3, name: "50 Teacher Accounts", count: 50, price: 1800000 },
  { id: 4, name: "100 Teacher Accounts", count: 100, price: 3000000 },
]

export default function TeachersPage() {
  const [isAddTeacherDialogOpen, setIsAddTeacherDialogOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<QuotaPlan | null>(null)
  const { toast } = useToast()

  const schoolId = "school1" // This would typically come from the logged-in user's context
  const maxQuota = getTeacherQuota(schoolId)
  const remainingQuota = getRemainingQuota(schoolId)

  // State to track if quota should be used
  const [quotaUsed, setQuotaUsed] = useState(0)

  // Call useQuota when quotaUsed changes
  useEffect(() => {
    if (quotaUsed > 0) {
      setQuotaUsed(0) // Reset immediately after setting quotaUsed
    }
  }, [quotaUsed])

  useQuota(schoolId, quotaUsed) // Always call the hook

  const handleAddTeacherSubmit = async (data: TeacherFormData) => {
    setIsSubmitting(true)

    try {
      // Check if we have enough quota
      if (remainingQuota <= 0) {
        // Find the smallest plan that provides at least one account
        const recommendedPlan = quotaPlans[0]
        setSelectedPlan(recommendedPlan)
        setIsAddTeacherDialogOpen(false)
        setIsPaymentModalOpen(true)

        toast({
          title: "Quota Exceeded",
          description: "You've reached your teacher account limit. Please purchase additional quota.",
          variant: "destructive",
        })
        return
      }

      // Simulate API call to create teacher
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Use one quota slot
      setQuotaUsed(1)

      toast({
        title: "Teacher Account Created",
        description: `Successfully created account for ${data.fullName}`,
      })

      setIsAddTeacherDialogOpen(false)
    } catch (error) {
      console.error("Error creating teacher:", error)
      toast({
        title: "Error Creating Teacher",
        description: "There was a problem creating the teacher account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessfulPayment = (plan: QuotaPlan) => {
    // In a real app, this would update the quota in the database
    toast({
      title: "Payment Successful",
      description: `Your quota has been increased by ${plan.count} teacher accounts.`,
    })

    setIsPaymentModalOpen(false)
    setIsAddTeacherDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers Management</h1>
          <p className="text-muted-foreground">Manage teacher accounts, quotas, and document generation.</p>
        </div>
        <Dialog open={isAddTeacherDialogOpen} onOpenChange={setIsAddTeacherDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new teacher account.
                {remainingQuota <= 3 && remainingQuota > 0 && (
                  <div className="mt-2 text-amber-500 font-medium">
                    Warning: You only have {remainingQuota} teacher account{remainingQuota !== 1 ? "s" : ""} remaining.
                  </div>
                )}
                {remainingQuota <= 0 && (
                  <div className="mt-2 text-red-500 font-medium">
                    You've reached your teacher account limit. Adding a new teacher will require purchasing additional
                    quota.
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <AddTeacherForm onSubmit={handleAddTeacherSubmit} isSubmitting={isSubmitting} />
          </DialogContent>
        </Dialog>
      </div>

      <Suspense fallback={<TeachersListSkeleton />}>
        <TeachersList />
      </Suspense>

      {/* Payment Modal for quota upgrade */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plans={quotaPlans}
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
        onSuccessfulPayment={handleSuccessfulPayment}
      />
    </div>
  )
}

