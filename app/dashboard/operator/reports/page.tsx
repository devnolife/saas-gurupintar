"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, AlertCircle } from "lucide-react"
import { hasFeatureAccess, getSubscription } from "@/lib/subscriptionService"
import { useRouter } from "next/navigation"
import { ExpenseNotesList } from "@/components/reports/ExpenseNotesList"
import { SchoolActivitiesSummary } from "@/components/reports/SchoolActivitiesSummary"

export default function ReportsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [activeTab, setActiveTab] = useState("expense-notes")

  // In a real app, you would get the operator ID from authentication context
  const operatorId = "operator1" // Default to operator1 for demo

  useEffect(() => {
    // Check if the operator has access to reports feature
    const access = hasFeatureAccess(operatorId, "reports")
    setHasAccess(access)

    if (access) {
      // Get subscription details
      const sub = getSubscription(operatorId)
      setSubscription(sub)
    } else {
      // Redirect to dashboard if no access
      router.push("/dashboard/operator")
    }

    setLoading(false)
  }, [operatorId, router])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!hasAccess) {
    return null // This will not render as we're redirecting in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Manage expense notes and view school activities</p>
        </div>

        {subscription && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Subscription:</span>
            <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
              {subscription.plan} - {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </Badge>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 4,800,000</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Activities</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next: Science Fair 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Expenses</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="expense-notes" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="expense-notes">
            <DollarSign className="h-4 w-4 mr-2" />
            Expense Notes
          </TabsTrigger>
          <TabsTrigger value="school-activities">
            <Calendar className="h-4 w-4 mr-2" />
            School Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expense-notes" className="mt-0">
          <ExpenseNotesList />
        </TabsContent>

        <TabsContent value="school-activities" className="mt-0">
          <SchoolActivitiesSummary />
        </TabsContent>
      </Tabs>
    </div>
  )
}

