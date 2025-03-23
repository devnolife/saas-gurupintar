"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FAKE_RPP_DATA } from "@/app/data/fakeRPPData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Clock, FileText, Download, Eye, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LessonPlanHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSubject, setFilterSubject] = useState("all")
  const [filterGrade, setFilterGrade] = useState("all")

  const filteredRPPs = FAKE_RPP_DATA.filter((rpp) => {
    const matchesSearch =
      rpp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rpp.subject.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSubject = filterSubject === "all" || rpp.subject === filterSubject
    const matchesGrade = filterGrade === "all" || rpp.grade === filterGrade

    return matchesSearch && matchesSubject && matchesGrade
  })

  const subjects = Array.from(new Set(FAKE_RPP_DATA.map((rpp) => rpp.subject)))
  const grades = Array.from(new Set(FAKE_RPP_DATA.map((rpp) => rpp.grade)))

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Lesson Plan History
          </h1>
          <p className="text-muted-foreground mt-1">Browse and manage your saved lesson plans</p>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Saved Lesson Plans
          </CardTitle>
          <CardDescription>View and manage your previously created lesson plans</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Plans</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 flex-1">
              <Search className="text-muted-foreground h-4 w-4 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Search lesson plans..."
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

              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Grade</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRPPs.length > 0 ? (
              filteredRPPs.map((rpp, index) => (
                <Card key={index} className="overflow-hidden border-muted hover:border-primary/20 transition-all">
                  <CardHeader className="p-4 pb-2 bg-muted/30">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base font-medium line-clamp-1">{rpp.title}</CardTitle>
                      <Badge variant="outline" className="ml-2 flex-shrink-0">
                        {rpp.grade}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <FileText className="h-3 w-3" />
                      {rpp.subject}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-3">
                    <div className="mb-3">
                      <div className="text-sm font-medium mb-1">Initial Competency:</div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{rpp.kompetensiAwal}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">Duration: {rpp.duration}</div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No lesson plans found matching your criteria
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

