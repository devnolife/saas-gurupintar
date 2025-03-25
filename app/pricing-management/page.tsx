"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PricingTiers } from "@/components/pricing-management/pricing-tiers"
import { AddOns } from "@/components/pricing-management/add-ons"
import { SubscriptionPeriods } from "@/components/pricing-management/subscription-periods"
import { Promotions } from "@/components/pricing-management/promotions"
import { PaymentSettings } from "@/components/pricing-management/payment-settings"
import { Analytics } from "@/components/pricing-management/analytics"
import { Features } from "@/components/pricing-management/features"
import { UsageLimits } from "@/components/pricing-management/usage-limits"
import { BillingSettings } from "@/components/pricing-management/billing-settings"

export default function PricingManagement() {
  const [activeTab, setActiveTab] = useState("pricing-tiers")

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Pricing Management Dashboard</h1>

      <Tabs defaultValue="pricing-tiers" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-8">
          <TabsTrigger value="pricing-tiers">Pricing Tiers</TabsTrigger>
          <TabsTrigger value="add-ons">Add-ons</TabsTrigger>
          <TabsTrigger value="subscription-periods">Subscription Periods</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="payment-settings">Payment Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="usage-limits">Usage Limits</TabsTrigger>
          <TabsTrigger value="billing-settings">Billing Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing-tiers">
          <PricingTiers />
        </TabsContent>

        <TabsContent value="add-ons">
          <AddOns />
        </TabsContent>

        <TabsContent value="subscription-periods">
          <SubscriptionPeriods />
        </TabsContent>

        <TabsContent value="promotions">
          <Promotions />
        </TabsContent>

        <TabsContent value="payment-settings">
          <PaymentSettings />
        </TabsContent>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>

        <TabsContent value="features">
          <Features />
        </TabsContent>

        <TabsContent value="usage-limits">
          <UsageLimits />
        </TabsContent>

        <TabsContent value="billing-settings">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

