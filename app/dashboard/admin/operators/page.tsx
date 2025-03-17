"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, UserPlus } from "lucide-react"

const operators = [
  { id: 1, name: "John Doe", email: "john@example.com", school: "School A" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", school: "School B" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", school: "School C" },
]

export default function OperatorsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOperators = operators.filter(
    (operator) =>
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.school.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-3xl font-bold mb-8">Manage Operators</h1>
      <Card className="shadow-sm border-none h-full">
        <CardHeader>
          <CardTitle>Operator List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Search className="text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search operators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Operator
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOperators.map((operator) => (
                <TableRow key={operator.id}>
                  <TableCell>{operator.name}</TableCell>
                  <TableCell>{operator.email}</TableCell>
                  <TableCell>{operator.school}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

