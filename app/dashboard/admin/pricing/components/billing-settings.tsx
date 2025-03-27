"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// Mock data for billing settings
const initialBillingSettings = {
  general: {
    defaultCurrency: "USD",
    allowedCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
    invoicePrefix: "INV-",
    invoiceFooter: "Thank you for your business!",
    termsAndConditions: "Standard terms and conditions apply.",
    showTaxOnInvoice: true,
    allowPartialPayments: false,
  },
  renewals: {
    sendRenewalReminders: true,
    firstReminderDays: 14,
    secondReminderDays: 7,
    finalReminderDays: 1,
    autoRenewSubscriptions: true,
    renewalEmailTemplate:
      "Your subscription will renew on {{renewal_date}}. Please update your payment information if needed.",
    gracePeriodDays: 7,
  },
  notifications: {
    sendPaymentReceipts: true,
    sendPaymentFailureNotices: true,
    sendSubscriptionActivationNotices: true,
    sendSubscriptionCancellationNotices: true,
    adminEmailForNotifications: "admin@example.com",
    paymentReceiptTemplate: "Thank you for your payment of {{amount}} for {{service}}.",
    paymentFailureTemplate:
      "Your payment of {{amount}} for {{service}} has failed. Please update your payment information.",
  },
}

export function BillingSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [billingSettings, setBillingSettings] = useState(initialBillingSettings)
  
  const handleGeneralSettingChange = (key: string, value: any) => {
    setBillingSettings({
      ...billingSettings,
      general: {
        ...billingSettings.general,
        [key]: value
      }
    })
  }
  
  const handleRenewalSettingChange = (key: string, value: any) => {
    setBillingSettings({
      ...billingSettings,
      renewals: {
        ...billingSettings.renewals,
        [key]: value
      }
    })
  }
  
  const handleNotificationSettingChange = (key: string, value: any) => {
    setBillingSettings({
      ...billingSettings,
      notifications: {
        ...billingSettings.notifications,
        [key]: value
      }
    })
  }
  
  const toggleCurrency = (currency: string) => {
    const currentCurrencies = [...billingSettings.general.allowedCurrencies]
    const currencyIndex = currentCurrencies.indexOf(currency)
    
    if (currencyIndex >= 0) {
      currentCurrencies.splice(currencyIndex, 1)
    } else {
      currentCurrencies.push(currency)
    }
    
    handleGeneralSettingChange('allowedCurrencies', currentCurrencies)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Billing Settings</h2>
      </div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Billing Settings</CardTitle>
              <CardDescription>Configure your general billing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultCurrency">Default Currency</Label>
                <Input 
                  id="defaultCurrency" 
                  value={billingSettings.general.defaultCurrency}
                  onChange={(e) => handleGeneralSettingChange('defaultCurrency', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Allowed Currencies</Label>
                <div className="flex flex-wrap gap-2">
                  {["USD", "EUR", "GBP", "CAD", "AUD"].map((currency) => (
                    <Button 
                      key={currency}
                      variant={billingSettings.general.allowedCurrencies.includes(currency) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCurrency(currency)}
                    >
                      {currency}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                <Input 
                  id="invoicePrefix" 
                  value={billingSettings.general.invoicePrefix}
                  onChange={(e) => handleGeneralSettingChange('invoicePrefix', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invoiceFooter">Invoice Footer</Label>
                <Textarea 
                  id="invoiceFooter" 
                  value={billingSettings.general.invoiceFooter}
                  onChange={(e) => handleGeneralSettingChange('invoiceFooter', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
                <Textarea 
                  id="termsAndConditions" 
                  value={billingSettings.general.termsAndConditions}
                  onChange={(e) => handleGeneralSettingChange('termsAndConditions', e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showTaxOnInvoice">Show Tax on Invoice</Label>
                <Switch 
                  id="showTaxOnInvoice" 
                  checked={billingSettings.general.showTaxOnInvoice}
                  onCheckedChange={(checked) => handleGeneralSettingChange('showTaxOnInvoice', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="allowPartialPayments">Allow Partial Payments</Label>
                <Switch 
                  id="allowPartialPayments" 
                  checked={billingSettings.general.allowPartialPayments}
                  onCheckedChange={(checked) => handleGeneralSettingChange('allowPartialPayments', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="renewals">
          <Card>
            <CardHeader>
              <CardTitle>Renewal Settings</CardTitle>
              <CardDescription>Configure how subscriptions are renewed and managed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sendRenewalReminders">Send Renewal Reminders</Label>
                <Switch 
                  id="sendRenewalReminders" 
                  checked={billingSettings.renewals.sendRenewalReminders}
                  onCheckedChange={(checked) => handleRenewalSettingChange('sendRenewalReminders', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="firstReminderDays">First Reminder (days before)</Label>
                <Input 
                  id="firstReminderDays" 
                  type="number"
                  value={billingSettings.renewals.firstReminderDays}
                  onChange={(e) => handleRenewalSettingChange('firstReminderDays', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondReminderDays">Second Reminder (days before)</Label>
                <Input 
                  id="secondReminderDays" 
                  type="number"
                  value={billingSettings.renewals.secondReminderDays}
                  onChange={(e) => handleRenewalSettingChange('secondReminderDays', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="finalReminderDays">Final Reminder (days before)</Label>
                <Input 
                  id="finalReminderDays" 
                  type="number"
                  value={billingSettings.renewals.finalReminderDays}
                  onChange={(e) => handleRenewalSettingChange('finalReminderDays', parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="autoRenewSubscriptions">Auto-Renew Subscriptions</Label>
                <Switch 
                  id="autoRenewSubscriptions" 
                  checked={billingSettings.renewals.autoRenewSubscriptions}
                  onCheckedChange={(checked) => handleRenewalSettingChange('autoRenewSubscriptions', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="renewalEmailTemplate">Renewal Email Template</Label>
                <Textarea 
                  id="renewalEmailTemplate" 
                  value={billingSettings.renewals.renewalEmailTemplate}
                  onChange={(e) => handleRenewalSettingChange('renewalEmailTemplate', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gracePeriodDays">Grace Period (days)</Label>
                <Input 
                  id="gracePeriodDays" 
                  type="number"
                  value={billingSettings.renewals.gracePeriodDays}
                  onChange={(e) => handleRenewalSettingChange('gracePeriodDays', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email notifications for billing events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sendPaymentReceipts">Send Payment Receipts</Label>
                <Switch 
                  id="sendPaymentReceipts" 
                  checked={billingSettings.notifications.sendPaymentReceipts}
                  onCheckedChange={(checked) => handleNotificationSettingChange('sendPaymentReceipts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sendPaymentFailureNotices">Send Payment Failure Notices</Label>
                <Switch 
                  id="sendPaymentFailureNotices" 
                  checked={billingSettings.notifications.sendPaymentFailureNotices}
                  onCheckedChange={(checked) => handleNotificationSettingChange('sendPaymentFailureNotices', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sendSubscriptionActivationNotices">Send Subscription Activation Notices</Label>
                <Switch 
                  id="sendSubscriptionActivationNotices" 
                  checked={billingSettings.notifications.sendSubscriptionActivationNotices}
                  onCheckedChange={(checked) => handleNotificationSettingChange('sendSubscriptionActivationNotices', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sendSubscriptionCancellationNotices">Send Subscription Cancellation Notices</Label>
                <Switch 
                  id="sendSubscriptionCancellationNotices" 
                  checked={billingSettings.notifications.sendSubscriptionCancellationNotices}
                  onCheckedChange={(checked) => handleNotificationSettingChange('sendSubscriptionCancellationNotices', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminEmailForNotifications">Admin Email for Notifications</Label>
                <Input 
                  id="adminEmailForNotifications" 
                  type="email"
                  value={billingSettings.notifications.adminEmailForNotifications}
                  onChange={(e) => handleNotificationSettingChange('adminEmailForNotifications', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentReceiptTemplate">Payment Receipt Template</Label>
                <Textarea 
                  id="paymentReceiptTemplate" 
                  value={billingSettings.notifications.paymentReceiptTemplate}
                  onChange={(e) => handleNotificationSettingChange('paymentReceiptTemplate', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentFailureTemplate">Payment Failure Template</Label>
                <Textarea 
                  id="paymentFailureTemplate" 
                  value={billingSettings.notifications.paymentFailureTemplate}
                  onChange={(e) => handleNotificationSettingChange('paymentFailureTemplate', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}