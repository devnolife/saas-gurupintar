"use client"

import type React from "react"

import { useEffect } from "react"
import { useTeachersStore } from "@/lib/store/useTeachersStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw } from "lucide-react"

export function TeachersListExample() {
  const {
    teachers,
    isLoading,
    error,
    totalTeachers,
    currentPage,
    limit,
    filters,
    fetchTeachers,
    setFilters,
    resetFilters,
  } = useTeachersStore()

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers()
  }, [fetchTeachers])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value })
  }

  // Handle refresh button click
  const handleRefresh = () => {
    fetchTeachers(currentPage, limit)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        )
      case "Inactive":
        return (
          <Badge variant="secondary" className="bg-gray-400">
            Inactive
          </Badge>
        )
      case "Pending Payment":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Pending Payment
          </Badge>
        )
      case "Pending Approval":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Pending Approval
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Teachers List</CardTitle>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search teachers..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={`loading-${index}`}>
                      <TableCell className="animate-pulse bg-gray-200 h-8 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-8 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-8 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-8 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-8 rounded"></TableCell>
                    </TableRow>
                  ))
              ) : teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No teachers found
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.school}</TableCell>
                    <TableCell>{getStatusBadge(teacher.status)}</TableCell>
                    <TableCell>{teacher.lastActive}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{teachers.length}</strong> of <strong>{totalTeachers}</strong> teachers
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchTeachers(currentPage - 1, limit)}
              disabled={currentPage === 1 || isLoading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchTeachers(currentPage + 1, limit)}
              disabled={currentPage * limit >= totalTeachers || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

