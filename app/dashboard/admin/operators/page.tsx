"use client"

import { useEffect, useState } from "react"
import { useOperatorsStore } from "@/lib/store/useOperatorsStore"
import { OperatorsTable } from "@/components/dashboard/operators/operators-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OperatorsPage() {
  const { operators, fetchOperators, loading } = useOperatorsStore()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchOperators()
  }, [fetchOperators])

  // Ensure operators is always an array
  const safeOperators = Array.isArray(operators) ? operators : []

  const filteredOperators = safeOperators.filter(
    (operator) =>
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.region.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeOperators = filteredOperators.filter((op) => op.status === "active")
  const pendingOperators = filteredOperators.filter((op) => op.status === "pending")
  const suspendedOperators = filteredOperators.filter((op) => op.status === "suspended")

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Operators</h1>
        </div>
        <div className="space-y-4">
          <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
          <div className="h-64 w-full bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Operators</h1>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search operators..."
              className="w-full sm:w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Operator
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Operators ({filteredOperators.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeOperators.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingOperators.length})</TabsTrigger>
          <TabsTrigger value="suspended">Suspended ({suspendedOperators.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Operators</CardTitle>
              <CardDescription>Manage all operators in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <OperatorsTable operators={filteredOperators} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Operators</CardTitle>
              <CardDescription>Operators with active accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <OperatorsTable operators={activeOperators} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pending Operators</CardTitle>
              <CardDescription>Operators awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <OperatorsTable operators={pendingOperators} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suspended" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Suspended Operators</CardTitle>
              <CardDescription>Operators with suspended accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <OperatorsTable operators={suspendedOperators} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

