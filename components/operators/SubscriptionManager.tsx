"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getSubscription, type Subscription } from "@/lib/subscriptionService"
import { CheckCircle } from "lucide-react"

interface SubscriptionManagerProps {
  userId: string
}

export function SubscriptionManager({ userId }: SubscriptionManagerProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get subscription details
    const sub = getSubscription(userId)
    setSubscription(sub)
    setLoading(false)
  }, [userId])

  if (loading) {
    return <div>Loading subscription details...</div>
  }

  const plans = [
    {
      name: "Basic",
      price: "Rp 500.000",
      period: "per month",
      features: ["Basic reports", "Teacher management", "Payment processing"],
      recommended: false,
    },
    {
      name: "Premium",
      price: "Rp 1.200.000",
      period: "per month",
      features: ["Advanced reports", "Analytics dashboard", "Bulk operations", "Priority support"],
      recommended: true,
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Subscription Management</h2>

      {subscription ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>Your active subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
                <p className="text-lg font-semibold">{subscription.plan}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                <p className="text-lg font-semibold">{new Date(subscription.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
                <p className="text-lg font-semibold">{new Date(subscription.endDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Features</h3>
              <ul className="space-y-2">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="mr-2">
              Manage Subscription
            </Button>
            <Button variant="destructive">Cancel Subscription</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mb-8 border-dashed border-2 border-muted">
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
            <CardDescription>You don't have an active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Subscribe to a plan to access premium features like advanced reports and analytics.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Subscribe Now</Button>
          </CardFooter>
        </Card>
      )}

      <h2 className="text-2xl font-bold mb-4">Available Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className={plan.recommended ? "border-primary" : ""}>
            {plan.recommended && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">Recommended</div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> {plan.period}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={plan.recommended ? "default" : "outline"} className="w-full">
                {subscription?.plan === plan.name ? "Current Plan" : "Subscribe"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

