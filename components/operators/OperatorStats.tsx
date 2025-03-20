"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ArrowUpRight, Users, School, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function OperatorStats({ operators }) {
  const [timeRange, setTimeRange] = useState("month")

  // Mock data for charts
  const activityData = [
    { name: "Mon", active: 4, inactive: 1 },
    { name: "Tue", active: 5, inactive: 0 },
    { name: "Wed", active: 3, inactive: 2 },
    { name: "Thu", active: 4, inactive: 1 },
    { name: "Fri", active: 5, inactive: 0 },
    { name: "Sat", active: 2, inactive: 3 },
    { name: "Sun", active: 3, inactive: 2 },
  ]

  const roleData = [
    { name: "Senior Operators", value: operators.filter((op) => op.role.includes("Senior")).length, color: "#2DAA9E" },
    { name: "Junior Operators", value: operators.filter((op) => op.role.includes("Junior")).length, color: "#FF7D54" },
  ]

  const statusData = [
    { name: "Active", value: operators.filter((op) => op.status === "active").length, color: "#4CAF50" },
    { name: "Inactive", value: operators.filter((op) => op.status === "inactive").length, color: "#FFC107" },
  ]

  const schoolsPerOperator = operators
    .map((op) => ({
      name: op.name,
      schools: op.schools,
    }))
    .sort((a, b) => b.schools - a.schools)
    .slice(0, 5)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Operator Activity</CardTitle>
            <CardDescription>Daily active vs. inactive operators</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={{
              active: {
                label: "Active Operators",
                color: "hsl(var(--chart-1))",
              },
              inactive: {
                label: "Inactive Operators",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="active" stackId="a" fill="var(--color-active)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inactive" stackId="a" fill="var(--color-inactive)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Operator Roles</CardTitle>
          <CardDescription>Distribution by role type</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Operator Status</CardTitle>
          <CardDescription>Active vs. inactive operators</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Top Operators by Schools</CardTitle>
          <CardDescription>Operators managing the most schools</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ChartContainer
            config={{
              schools: {
                label: "Schools Managed",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={schoolsPerOperator} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="schools" fill="var(--color-schools)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Operator Overview</CardTitle>
          <CardDescription>Key metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Operators</p>
                <h3 className="text-2xl font-bold">{operators.length}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">12%</span> from last month
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <School className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Schools Managed</p>
                <h3 className="text-2xl font-bold">{operators.reduce((sum, op) => sum + op.schools, 0)}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">8%</span> from last month
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Today</p>
                <h3 className="text-2xl font-bold">
                  {
                    operators.filter((op) => {
                      const lastActive = new Date(op.lastActive)
                      const today = new Date()
                      return lastActive.toDateString() === today.toDateString()
                    }).length
                  }
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">5%</span> from yesterday
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

