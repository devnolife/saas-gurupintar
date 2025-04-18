"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Search, Download } from "lucide-react"
import { getSchoolSubscription, getQuotaUsage } from "@/lib/accountQuotaManager"

// Mock data for schools
const schools = [
  { id: "school1", name: "Springfield Elementary" },
  { id: "school2", name: "Riverdale High" },
  { id: "school3", name: "Sunnydale Middle School" },
  { id: "school4", name: "Hogwarts School" },
  { id: "school5", name: "Xavier's School for Gifted Youngsters" },
]

export default function TeacherAccountAnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSchools = schools.filter((school) => school.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const calculateTeacherAccountStats = (schoolId: string) => {
    const subscription = getSchoolSubscription(schoolId)
    const usage = getQuotaUsage(schoolId)

    if (!subscription || !usage) {
      return { total: 0, used: 0, available: 0, percentageUsed: 0 }
    }

    const total = subscription.maxTeachers
    const used = usage.teachers
    const available = total - used
    const percentageUsed = (used / total) * 100

    return { total, used, available, percentageUsed }
  }

  const totalTeacherAccounts = filteredSchools.reduce(
    (sum, school) => sum + calculateTeacherAccountStats(school.id).total,
    0,
  )
  const totalUsedAccounts = filteredSchools.reduce(
    (sum, school) => sum + calculateTeacherAccountStats(school.id).used,
    0,
  )

  const handleExportData = () => {
    // Implement export functionality here
    console.log("Exporting data...")
  }

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Teacher Account Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-md border-none rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Total Teacher Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalTeacherAccounts}</div>
            <p className="text-sm text-muted-foreground">Across all schools</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-none rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Used Teacher Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalUsedAccounts}</div>
            <p className="text-sm text-muted-foreground">
              {((totalUsedAccounts / totalTeacherAccounts) * 100).toFixed(2)}% of total accounts
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md border-none rounded-2xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-bold">School-wise Teacher Account Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search schools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-full"
              />
            </div>
            <Button
              onClick={handleExportData}
              className="rounded-full bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>School Name</TableHead>
                  <TableHead>Total Accounts</TableHead>
                  <TableHead>Used Accounts</TableHead>
                  <TableHead>Available Accounts</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.map((school) => {
                  const stats = calculateTeacherAccountStats(school.id)
                  return (
                    <TableRow key={school.id}>
                      <TableCell className="font-medium">{school.name}</TableCell>
                      <TableCell>{stats.total}</TableCell>
                      <TableCell>{stats.used}</TableCell>
                      <TableCell>{stats.available}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress
                            value={stats.percentageUsed}
                            className="w-full mr-2 h-3 rounded-full bg-muted overflow-hidden"
                          />
                          <span>{stats.percentageUsed.toFixed(2)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

