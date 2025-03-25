"use client"

import { useState } from "react"
import { BarChart, LineChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for revenue chart
const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 25000 },
  { month: "Jun", revenue: 28000 },
  { month: "Jul", revenue: 32000 },
  { month: "Aug", revenue: 35000 },
  { month: "Sep", revenue: 38000 },
  { month: "Oct", revenue: 42000 },
  { month: "Nov", revenue: 45000 },
  { month: "Dec", revenue: 48000 },
]

// Mock data for package popularity
const packagePopularityData = [
  { name: "Basic (Elementary)", count: 450 },
  { name: "Standard (Elementary)", count: 850 },
  { name: "Premium (Elementary)", count: 350 },
  { name: "Basic (Middle)", count: 300 },
  { name: "Standard (Middle)", count: 750 },
  { name: "Premium (Middle)", count: 250 },
  { name: "Basic (High)", count: 200 },
  { name: "Standard (High)", count: 650 },
  { name: "Premium (High)", count: 150 },
]

// Mock data for add-on popularity
const addonPopularityData = [
  { name: "Attendance Tracking", count: 1200 },
  { name: "Advanced Gradebook", count: 950 },
  { name: "Parent Communication", count: 1500 },
  { name: "Assessment Builder", count: 850 },
  { name: "Curriculum Mapping", count: 650 },
]

// Mock data for subscription periods
const subscriptionPeriodData = [
  { name: "Monthly", count: 1200 },
  { name: "Quarterly", count: 450 },
  { name: "Semi-Annual", count: 350 },
  { name: "Annual", count: 850 },
  { name: "Biennial", count: 150 },
]

export function PricingAnalytics() {
  const [timeRange, setTimeRange] = useState("year")
  const [chartType, setChartType] = useState("revenue")

  const getMaxValue = (data, key) => {
    return Math.max(...data.map((item) => item[key])) * 1.1
  }

  const renderBarChart = (data, nameKey, valueKey, maxValue) => {
    return (
      <div className="w-full h-80 mt-4">
        <div className="flex justify-between items-end h-64 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-primary w-12 rounded-t-sm"
                style={{
                  height: `${(item[valueKey] / maxValue) * 100}%`,
                  minHeight: "4px",
                }}
              ></div>
              <div className="text-xs mt-2 text-center w-16 truncate" title={item[nameKey]}>
                {item[nameKey]}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderLineChart = (data, xKey, yKey, maxValue) => {
    const points = data
      .map((item, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - (item[yKey] / maxValue) * 100
        return `${x},${y}`
      })
      .join(" ")

    return (
      <div className="w-full h-80 mt-4">
        <svg className="w-full h-64" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline points={points} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - (item[yKey] / maxValue) * 100
            return <circle key={index} cx={x} cy={y} r="1.5" fill="hsl(var(--primary))" />
          })}
        </svg>
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <div key={index} className="text-xs text-center">
              {index % 2 === 0 ? item[xKey] : ""}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Pricing Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={chartType} onValueChange={setChartType}>
        <TabsList className="mb-4">
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Revenue</span>
          </TabsTrigger>
          <TabsTrigger value="packages" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Package Popularity</span>
          </TabsTrigger>
          <TabsTrigger value="addons" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Add-on Popularity</span>
          </TabsTrigger>
          <TabsTrigger value="periods" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Subscription Periods</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
              <CardDescription>Track revenue trends over the selected time period</CardDescription>
            </CardHeader>
            <CardContent>
              {renderLineChart(revenueData, "month", "revenue", getMaxValue(revenueData, "revenue"))}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                  <div className="text-2xl font-bold">$361,500</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Average Monthly</div>
                  <div className="text-2xl font-bold">$30,125</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                  <div className="text-2xl font-bold text-green-600">+12.4%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Projected Annual</div>
                  <div className="text-2xl font-bold">$420,000</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages">
          <Card>
            <CardHeader>
              <CardTitle>Package Popularity</CardTitle>
              <CardDescription>Compare the popularity of different pricing packages</CardDescription>
            </CardHeader>
            <CardContent>
              {renderBarChart(packagePopularityData, "name", "count", getMaxValue(packagePopularityData, "count"))}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Most Popular</div>
                  <div className="text-xl font-bold">Standard (Elementary)</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Total Subscriptions</div>
                  <div className="text-2xl font-bold">3,950</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Standard Tier %</div>
                  <div className="text-2xl font-bold">56.9%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Elementary School %</div>
                  <div className="text-2xl font-bold">41.8%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addons">
          <Card>
            <CardHeader>
              <CardTitle>Add-on Module Popularity</CardTitle>
              <CardDescription>Compare the popularity of different add-on modules</CardDescription>
            </CardHeader>
            <CardContent>
              {renderBarChart(addonPopularityData, "name", "count", getMaxValue(addonPopularityData, "count"))}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Most Popular</div>
                  <div className="text-xl font-bold">Parent Communication</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Total Add-ons</div>
                  <div className="text-2xl font-bold">5,150</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Attach Rate</div>
                  <div className="text-2xl font-bold">78.3%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Add-on Revenue</div>
                  <div className="text-2xl font-bold">$127,500</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="periods">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Period Distribution</CardTitle>
              <CardDescription>Compare the popularity of different subscription periods</CardDescription>
            </CardHeader>
            <CardContent>
              {renderBarChart(subscriptionPeriodData, "name", "count", getMaxValue(subscriptionPeriodData, "count"))}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Most Popular</div>
                  <div className="text-xl font-bold">Monthly</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Annual+ %</div>
                  <div className="text-2xl font-bold">33.3%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Avg. Subscription</div>
                  <div className="text-2xl font-bold">7.2 months</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Renewal Rate</div>
                  <div className="text-2xl font-bold">76.5%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

