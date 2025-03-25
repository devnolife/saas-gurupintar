"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  CreditCard,
  DollarSign,
  FileText,
  Gift,
  Globe,
  Package,
  Percent,
  Settings,
  Tag,
  Timer,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { PricingTiers } from "./components/pricing-tiers"
import { AddOns } from "./components/add-ons"
import { SubscriptionPeriods } from "./components/subscription-periods"
import { Promotions } from "./components/promotions"
import { PaymentSettings } from "./components/payment-settings"
import { PricingAnalytics } from "./components/pricing-analytics"
import { FeatureMatrix } from "./components/feature-matrix"
import { UsageLimits } from "./components/usage-limits"
import { BillingSettings } from "./components/billing-settings"

export default function PricingManagement() {
  const [activeTab, setActiveTab] = useState("tiers")
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        heading="Pricing Management"
        description="Configure and manage all pricing-related settings for the platform"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push("/dashboard/admin")}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </div>
        }
      />

      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Stats Cards with improved spacing */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground mt-1">+180 new this month</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Popular Plan</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Premium</div>
              <p className="text-xs text-muted-foreground mt-1">Middle School Tier</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground mt-1">3 ending this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Improved tabs with better spacing */}
        <Card className="shadow-sm border-t-4 border-t-primary">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="bg-muted/30 p-1 rounded-lg">
                <TabsList className="grid grid-cols-3 lg:grid-cols-9 gap-1">
                  <TabsTrigger value="tiers" className="flex items-center gap-2 py-2.5">
                    <Package className="h-4 w-4" />
                    <span className="hidden md:inline">Pricing Tiers</span>
                    <span className="inline md:hidden">Tiers</span>
                  </TabsTrigger>
                  <TabsTrigger value="addons" className="flex items-center gap-2 py-2.5">
                    <FileText className="h-4 w-4" />
                    <span className="hidden md:inline">Add-ons</span>
                    <span className="inline md:hidden">Add-ons</span>
                  </TabsTrigger>
                  <TabsTrigger value="periods" className="flex items-center gap-2 py-2.5">
                    <Timer className="h-4 w-4" />
                    <span className="hidden md:inline">Periods</span>
                    <span className="inline md:hidden">Periods</span>
                  </TabsTrigger>
                  <TabsTrigger value="promotions" className="flex items-center gap-2 py-2.5">
                    <Gift className="h-4 w-4" />
                    <span className="hidden md:inline">Promotions</span>
                    <span className="inline md:hidden">Promos</span>
                  </TabsTrigger>
                  <TabsTrigger value="payments" className="flex items-center gap-2 py-2.5">
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden md:inline">Payments</span>
                    <span className="inline md:hidden">Pay</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2 py-2.5">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden md:inline">Analytics</span>
                    <span className="inline md:hidden">Stats</span>
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex items-center gap-2 py-2.5">
                    <Settings className="h-4 w-4" />
                    <span className="hidden md:inline">Features</span>
                    <span className="inline md:hidden">Features</span>
                  </TabsTrigger>
                  <TabsTrigger value="usage" className="flex items-center gap-2 py-2.5">
                    <Percent className="h-4 w-4" />
                    <span className="hidden md:inline">Usage</span>
                    <span className="inline md:hidden">Usage</span>
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="flex items-center gap-2 py-2.5">
                    <Globe className="h-4 w-4" />
                    <span className="hidden md:inline">Billing</span>
                    <span className="inline md:hidden">Billing</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="mt-6 pt-4 border-t">
                <TabsContent value="tiers" className="space-y-6 mt-0">
                  <PricingTiers />
                </TabsContent>

                <TabsContent value="addons" className="space-y-6 mt-0">
                  <AddOns />
                </TabsContent>

                <TabsContent value="periods" className="space-y-6 mt-0">
                  <SubscriptionPeriods />
                </TabsContent>

                <TabsContent value="promotions" className="space-y-6 mt-0">
                  <Promotions />
                </TabsContent>

                <TabsContent value="payments" className="space-y-6 mt-0">
                  <PaymentSettings />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6 mt-0">
                  <PricingAnalytics />
                </TabsContent>

                <TabsContent value="features" className="space-y-6 mt-0">
                  <FeatureMatrix />
                </TabsContent>

                <TabsContent value="usage" className="space-y-6 mt-0">
                  <UsageLimits />
                </TabsContent>

                <TabsContent value="billing" className="space-y-6 mt-0">
                  <BillingSettings />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

