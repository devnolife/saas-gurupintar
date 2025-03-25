"use client"

import { useState } from "react"
import type { Operator } from "@/lib/api/mockData/operators"
import { useOperatorsStore } from "@/lib/store/useOperatorsStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface PasswordManagerProps {
  operator: Operator
  onSuccess?: () => void
}

export function PasswordManager({ operator, onSuccess }: PasswordManagerProps) {
  const { resetPassword } = useOperatorsStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [resetResult, setResetResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleResetPassword = async () => {
    setIsLoading(true)
    setResetResult(null)

    try {
      const result = await resetPassword(operator.id)
      setResetResult(result)

      if (result.success) {
        toast({
          title: "Password reset email sent",
          description: "A password reset email has been sent to the operator.",
        })

        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to reset password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setResetResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })

      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const lastPasswordChange = new Date(operator.lastPasswordChange)
  const daysSinceChange = Math.floor((new Date().getTime() - lastPasswordChange.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Password Management</CardTitle>
        <CardDescription>Manage the operator's password settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium">Last Password Change</h3>
              <p className="text-sm text-muted-foreground">
                {format(lastPasswordChange, "PPP")} ({daysSinceChange} days ago)
              </p>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                daysSinceChange > 90
                  ? "bg-red-100 text-red-800"
                  : daysSinceChange > 60
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {daysSinceChange > 90 ? "Change recommended" : daysSinceChange > 60 ? "Good" : "Up to date"}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">
            {operator.settings.twoFactorEnabled
              ? "Enabled - The operator is using two-factor authentication"
              : "Disabled - The operator is not using two-factor authentication"}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Reset Password</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Operator Password</DialogTitle>
              <DialogDescription>
                This will send a password reset email to the operator. They will be able to set a new password using the
                link in the email.
              </DialogDescription>
            </DialogHeader>

            {resetResult ? (
              <div className="flex flex-col items-center justify-center py-4">
                {resetResult.success ? (
                  <>
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <p className="text-center">{resetResult.message}</p>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                    <p className="text-center">{resetResult.message}</p>
                  </>
                )}
              </div>
            ) : (
              <div className="py-4">
                <p className="mb-4">Are you sure you want to reset the password for:</p>
                <div className="bg-muted p-3 rounded-md mb-4">
                  <p className="font-medium">{operator.name}</p>
                  <p className="text-sm text-muted-foreground">{operator.email}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone. The operator will receive an email with instructions to reset their
                  password.
                </p>
              </div>
            )}

            <DialogFooter>
              {!resetResult && (
                <>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleResetPassword} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Reset Password
                  </Button>
                </>
              )}

              {resetResult && <Button onClick={() => setIsDialogOpen(false)}>Close</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

