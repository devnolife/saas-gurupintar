"use client"

import { useState } from "react"
import { Tabs } from "@/components/ui/tabs"

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
  
  const handleGeneralSettingChange = (key, value) => {
    setBillingSettings({
      ...billingSettings,
      general: {
        ...billingSettings.general,
        [key]: value
      }
    })
  }
  
  const handleRenewalSettingChange = (key, value) => {
    setBillingSettings({
      ...billingSettings,
      renewals: {
        ...billingSettings.renewals,
        [key]: value
      }
    })
  }
  
  const handleNotificationSettingChange = (key, value) => {
    setBillingSettings({
      ...billingSettings,
      notifications: {
        ...billingSettings.notifications,
        [key]: value
      }
    })
  }
  
  const toggleCurrency = (currency) => {
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
      
      <Tabs
\

