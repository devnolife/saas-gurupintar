"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, Plus, FileText, Filter, ArrowUpDown, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const lessons = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    grade: "9th",
    date: "2023-06-15",
    status: "Published",
  },
  { id: 2, title: "Cell Biology", subject: "Science", grade: "10th", date: "2023-06-16", status: "Draft" },
  { id: 3, title: "World War II", subject: "History", grade: "11th", date: "2023-06-17", status: "Published" },
  { id: 4, title: "Literary Analysis", subject: "English", grade: "9th", date: "2023-06-18", status: "Published" },
  { id: 5, title: "Chemical Reactions", subject: "Science", grade: "10th", date: "2023-06-19", status: "Draft" },
  { id: 6, title: "Geometry Basics", subject: "Mathematics", grade: "9th", date: "2023-06-20", status: "Published" },
]

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSubject, setFilterSubject] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.grade.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSubject = filterSubject === "all" || lesson.subject === filterSubject
    const matchesStatus = filterStatus === "all" || lesson.status === filterStatus

    return matchesSearch && matchesSubject && matchesStatus
  })

  const subjects = Array.from(new Set(lessons.map((lesson) => lesson.subject)))
  const statuses = Array.from(new Set(lessons.map((lesson) => lesson.status)))

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Lessons
          </h1>
          <p className="text-muted-foreground mt-1">Manage your lesson plans and materials</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Lesson
        </Button>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Lesson Plans
          </CardTitle>
          <CardDescription>Browse and manage your lesson plans</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Lessons</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 flex-1">
              <Search className="text-muted-foreground h-4 w-4 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Subject</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLessons.length > 0 ? (
                  filteredLessons.map((lesson) => (
                    <TableRow key={lesson.id}>
                      <TableCell className="font-medium">{lesson.title}</TableCell>
                      <TableCell>{lesson.subject}</TableCell>
                      <TableCell>{lesson.grade}</TableCell>
                      <TableCell>{lesson.date}</TableCell>
                      <TableCell>
                        <Badge variant={lesson.status === "Published" ? "default" : "secondary"}>{lesson.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <FileText className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No lessons found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

