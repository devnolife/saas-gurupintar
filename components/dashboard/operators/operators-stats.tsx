"use client"

import { useOperatorsStore } from "@/lib/store/useOperatorsStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, School, Package, Activity } from "lucide-react"

export function OperatorsStats() {
  const { operators } = useOperatorsStore()

  // Calculate stats
  const totalOperators = operators.length
  const activeOperators = operators.filter((op) => op.status === "Active").length

  // Calculate total schools managed by all operators
  const totalSchools = operators.reduce((sum, op) => sum + op.schools, 0)

  // Calculate total packages across all operators
  const totalPackages = operators.reduce((sum, op) => sum + op.packages.length, 0)

  // Calculate total active users across all operators
  const totalUsers = operators.reduce((sum, op) => sum + op.activeUsers, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Operators</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOperators}</div>
          <p className="text-xs text-muted-foreground">{activeOperators} active</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Schools Managed</CardTitle>
          <School className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSchools.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {(totalSchools / Math.max(totalOperators, 1)).toFixed(1)} avg per operator
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPackages}</div>
          <p className="text-xs text-muted-foreground">
            {(totalPackages / Math.max(totalOperators, 1)).toFixed(1)} avg per operator
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Across all operators</p>
        </CardContent>
      </Card>
    </div>
  )
}

