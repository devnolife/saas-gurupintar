"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Mail, FileText, CreditCard } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BillingSettings() {
  const [activeTab, setActiveTab] = useState("billing-cycles")

  // Billing Cycles state
  const [prorationEnabled, setProrationEnabled] = useState(true)
  const [gracePeriod, setGracePeriod] = useState("7")
  const [billingCycle, setBillingCycle] = useState("first-of-month")

  // Notifications state
  const [invoiceEmailEnabled, setInvoiceEmailEnabled] = useState(true)
  const [paymentReminderEnabled, setPaymentReminderEnabled] = useState(true)
  const [paymentFailureEnabled, setPaymentFailureEnabled] = useState(true)
  const [subscriptionChangeEnabled, setSubscriptionChangeEnabled] = useState(true)

  // Dunning state
  const [dunningEnabled, setDunningEnabled] = useState(true)
  const [retryAttempts, setRetryAttempts] = useState("3")
  const [retryInterval, setRetryInterval] = useState("3")
  const [dunningEmailTemplate, setDunningEmailTemplate] = useState(
    "Dear {{customer}},\n\nWe were unable to process your payment for {{amount}} on {{date}}. We will attempt to charge your card again in {{retry_days}} days.\n\nPlease update your payment information to avoid service interruption.\n\nThank you,\nThe Team",
  )

  // Dummy data for dunning email template
  const customer = "John Doe"
  const amount = "$100.00"
  const date = "2024-10-27"
  const retry_days = "3"

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Billing Settings</h2>

      <Tabs defaultValue="billing-cycles" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="billing-cycles">Billing Cycles</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="dunning">Dunning Management</TabsTrigger>
        </TabsList>

        <TabsContent value="billing-cycles">
          <Card>
            <CardHeader>
              <CardTitle>Billing Cycle Settings</CardTitle>
              <CardDescription>Configure how and when customers are billed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="billing-cycle">Default Billing Cycle</Label>
                  <Select value={billingCycle} onValueChange={setBillingCycle}>
                    <SelectTrigger id="billing-cycle">
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anniversary">Anniversary (based on signup date)</SelectItem>
                      <SelectItem value="first-of-month">First of the month</SelectItem>
                      <SelectItem value="custom">Custom date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="proration" checked={prorationEnabled} onCheckedChange={setProrationEnabled} />
                  <Label htmlFor="proration">Enable proration for plan changes</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grace-period">Payment Grace Period (days)</Label>
                  <Input
                    id="grace-period"
                    type="number"
                    min="0"
                    value={gracePeriod}
                    onChange={(e) => setGracePeriod(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of days to wait before suspending service after a failed payment
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger id="cancellation-policy">
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (prorated refund)</SelectItem>
                      <SelectItem value="end-of-period">End of billing period</SelectItem>
                      <SelectItem value="no-refund">Immediate (no refund)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Changes to billing cycles will only affect new subscriptions. Existing subscriptions will maintain
                    their current billing cycle.
                  </AlertDescription>
                </Alert>

                <Button>Save Billing Cycle Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure billing-related notifications for customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>

                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="invoice-email">Invoice Emails</Label>
                      <p className="text-sm text-muted-foreground">Send invoice emails when payments are processed</p>
                    </div>
                    <Switch id="invoice-email" checked={invoiceEmailEnabled} onCheckedChange={setInvoiceEmailEnabled} />
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-reminder">Payment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Send reminders before payment is due</p>
                    </div>
                    <Switch
                      id="payment-reminder"
                      checked={paymentReminderEnabled}
                      onCheckedChange={setPaymentReminderEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-failure">Payment Failure Notifications</Label>
                      <p className="text-sm text-muted-foreground">Notify customers when payments fail</p>
                    </div>
                    <Switch
                      id="payment-failure"
                      checked={paymentFailureEnabled}
                      onCheckedChange={setPaymentFailureEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="subscription-change">Subscription Change Notifications</Label>
                      <p className="text-sm text-muted-foreground">Notify customers when their subscription changes</p>
                    </div>
                    <Switch
                      id="subscription-change"
                      checked={subscriptionChangeEnabled}
                      onCheckedChange={setSubscriptionChangeEnabled}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-email">Sender Email Address</Label>
                  <Input id="sender-email" type="email" placeholder="billing@yourcompany.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-name">Sender Name</Label>
                  <Input id="sender-name" placeholder="Your Company Billing" />
                </div>

                <div className="flex items-center space-x-2">
                  <Button className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" /> Test Email
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" /> Edit Email Templates
                  </Button>
                </div>

                <Button>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dunning">
          <Card>
            <CardHeader>
              <CardTitle>Dunning Management</CardTitle>
              <CardDescription>Configure how to handle failed payments and recovery attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dunning-enabled">Enable Dunning Management</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically retry failed payments and notify customers
                    </p>
                  </div>
                  <Switch id="dunning-enabled" checked={dunningEnabled} onCheckedChange={setDunningEnabled} />
                </div>

                {dunningEnabled && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="retry-attempts">Retry Attempts</Label>
                        <Input
                          id="retry-attempts"
                          type="number"
                          min="1"
                          max="10"
                          value={retryAttempts}
                          onChange={(e) => setRetryAttempts(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Number of times to retry failed payments</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="retry-interval">Retry Interval (days)</Label>
                        <Input
                          id="retry-interval"
                          type="number"
                          min="1"
                          value={retryInterval}
                          onChange={(e) => setRetryInterval(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Days between retry attempts</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dunning-email">Dunning Email Template</Label>
                      <Textarea
                        id="dunning-email"
                        rows={8}
                        value={dunningEmailTemplate}
                        onChange={(e) => setDunningEmailTemplate(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Use {{ customer }}, {{ amount }}, {{ date }}, and {{ retry_days }} as placeholders
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Actions After Failed Attempts</Label>
                      <Select defaultValue="downgrade">
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cancel">Cancel subscription</SelectItem>
                          <SelectItem value="downgrade">Downgrade to free plan</SelectItem>
                          <SelectItem value="suspend">Suspend account</SelectItem>
                          <SelectItem value="none">Take no action</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Alert>
                      <CreditCard className="h-4 w-4" />
                      <AlertTitle>Smart Retries</AlertTitle>
                      <AlertDescription>
                        Our system uses smart retry logic to attempt charges at times when they're most likely to
                        succeed, based on card type and previous payment patterns.
                      </AlertDescription>
                    </Alert>
                  </>
                )}

                <Button>Save Dunning Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

