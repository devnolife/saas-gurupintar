"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, Plus, FileText } from "lucide-react"

const lessons = [
  { id: 1, title: "Introduction to Algebra", subject: "Mathematics", grade: "9th", date: "2023-06-15" },
  { id: 2, title: "Cell Biology", subject: "Science", grade: "10th", date: "2023-06-16" },
  { id: 3, title: "World War II", subject: "History", grade: "11th", date: "2023-06-17" },
]

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Lessons</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lesson Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Search className="text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Lesson
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell>{lesson.title}</TableCell>
                  <TableCell>{lesson.subject}</TableCell>
                  <TableCell>{lesson.grade}</TableCell>
                  <TableCell>{lesson.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View
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

