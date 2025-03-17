"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, UserPlus } from "lucide-react"
import { QuotaDisplay } from "@/components/QuotaDisplay"
import { canAddTeacher, addTeacher } from "@/lib/accountQuotaManager"
import { useToast } from "@/components/ui/use-toast"

const teachers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", subject: "Mathematics", classes: 5 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", subject: "Science", classes: 4 },
  { id: 3, name: "Carol Williams", email: "carol@example.com", subject: "English", classes: 6 },
]

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddTeacher = () => {
    const schoolId = "school1" // This would typically come from the logged-in user's context
    if (canAddTeacher(schoolId)) {
      if (addTeacher(schoolId)) {
        toast({
          title: "Teacher Added",
          description: "A new teacher account has been successfully created.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to add teacher. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Quota Exceeded",
        description: "You have reached the maximum number of teacher accounts. Please upgrade your plan.",
        variant: "destructive",
      })
    }
  }

  const handleUpgradeRequest = () => {
    // This would typically open a modal or redirect to an upgrade page
    toast({
      title: "Upgrade Requested",
      description: "An administrator will contact you about upgrading your plan.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Teachers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card>
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
                    <TableHead>Classes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>{teacher.classes}</TableCell>
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
        <div>
          <QuotaDisplay schoolId="school1" onUpgradeRequest={handleUpgradeRequest} />
        </div>
      </div>
    </div>
  )
}

