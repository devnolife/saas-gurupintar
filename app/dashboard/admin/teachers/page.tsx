"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real application, this would come from an API
const initialTeachers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", subject: "Mathematics", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", subject: "Science", status: "Pending Payment" },
  { id: 3, name: "Carol Williams", email: "carol@example.com", subject: "English", status: "Active" },
]

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [teachers, setTeachers] = useState(initialTeachers)

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddTeacher = () => {
    // This would typically open a modal or navigate to a new teacher form
    console.log("Add teacher")
  }

  const handleActivateTeacher = (id: number) => {
    setTeachers(teachers.map((teacher) => (teacher.id === id ? { ...teacher, status: "Active" } : teacher)))
  }

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-3xl font-bold mb-8">Manage Teachers</h1>
      <Card className="shadow-sm border-none h-full">
        <CardHeader>
          <CardTitle>Teacher List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Search className="text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Button onClick={handleAddTeacher}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>
                    <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>{teacher.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {teacher.status === "Pending Payment" ? (
                      <Button variant="outline" size="sm" onClick={() => handleActivateTeacher(teacher.id)}>
                        Activate
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    )}
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

