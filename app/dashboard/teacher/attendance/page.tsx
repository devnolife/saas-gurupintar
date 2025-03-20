"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Clock, Download, Filter, Search, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"

// Sample student data
const students = [
  {
    id: 1,
    name: "Ahmad Rizki",
    avatar: "/placeholder.svg",
    grade: "10A",
    attendance: { status: "present", time: "07:45 AM" },
  },
  {
    id: 2,
    name: "Budi Santoso",
    avatar: "/placeholder.svg",
    grade: "10A",
    attendance: { status: "present", time: "07:50 AM" },
  },
  {
    id: 3,
    name: "Citra Dewi",
    avatar: "/placeholder.svg",
    grade: "10A",
    attendance: { status: "late", time: "08:15 AM" },
  },
  {
    id: 4,
    name: "Dian Purnama",
    avatar: "/placeholder.svg",
    grade: "10A",
    attendance: { status: "absent", time: "" },
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    avatar: "/placeholder.svg",
    grade: "10A",
    attendance: { status: "present", time: "07:48 AM" },
  },
  {
    id: 6,
    name: "Fitri Handayani",
    avatar: "/placeholder.svg",
    grade: "10A",
    attendance: { status: "present", time: "07:52 AM" },
  },
  {
    id: 7,
    name: "Gunawan Wibowo",
    avatar: "/placeholder.svg",
    grade: "10A",
    attendance: { status: "excused", time: "" },
  },
  {
    id: 8,
    name: "Hana Permata",
    avatar: "/placeholder.svg",
    grade: "10A",
    attendance: { status: "present", time: "07:55 AM" },
  },
]

// Sample class data
const classes = [
  { id: "10A", name: "Class 10A" },
  { id: "10B", name: "Class 10B" },
  { id: "11A", name: "Class 11A" },
  { id: "11B", name: "Class 11B" },
  { id: "12A", name: "Class 12A" },
  { id: "12B", name: "Class 12B" },
]

export default function AttendancePage() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState("10A")
  const [searchQuery, setSearchQuery] = useState("")
  const [studentList, setStudentList] = useState(students)
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAttendanceChange = (studentId: number, status: string) => {
    setStudentList((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            attendance: {
              ...student.attendance,
              status,
              time: status === "present" || status === "late" ? format(new Date(), "hh:mm a") : "",
            },
          }
        }
        return student
      }),
    )
  }

  const handleSaveAttendance = () => {
    // In a real app, this would save to a database
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${format(date, "MMMM d, yyyy")} has been recorded.`,
    })
  }

  const filteredStudents = studentList.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const attendanceStats = {
    total: studentList.length,
    present: studentList.filter((s) => s.attendance.status === "present").length,
    late: studentList.filter((s) => s.attendance.status === "late").length,
    absent: studentList.filter((s) => s.attendance.status === "absent").length,
    excused: studentList.filter((s) => s.attendance.status === "excused").length,
  }

  if (!isClient) {
    return null // Prevent rendering until client-side
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Attendance Management
          </h1>
          <p className="text-muted-foreground mt-1">Record and track student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            onClick={handleSaveAttendance}
          >
            <Check className="h-4 w-4" />
            Save Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3 animate-in slide-in-from-left duration-300 delay-100">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Daily Attendance</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {format(date, "MMMM d, yyyy")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardDescription>
                Showing attendance for {format(date, "MMMM d, yyyy")} - Class {selectedClass}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-5">Student</div>
                  <div className="col-span-3 text-center">Status</div>
                  <div className="col-span-2 text-center">Time</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="grid grid-cols-12 items-center p-3">
                      <div className="col-span-5 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-muted-foreground">ID: {student.id}</div>
                        </div>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <Badge
                          className={cn(
                            "capitalize",
                            student.attendance.status === "present" && "bg-green-500",
                            student.attendance.status === "late" && "bg-amber-500",
                            student.attendance.status === "absent" && "bg-red-500",
                            student.attendance.status === "excused" && "bg-blue-500",
                          )}
                        >
                          {student.attendance.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-center text-sm">{student.attendance.time || "-"}</div>
                      <div className="col-span-2 flex justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-7 w-7",
                            student.attendance.status === "present" && "text-green-500 bg-green-50",
                          )}
                          onClick={() => handleAttendanceChange(student.id, "present")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-7 w-7",
                            student.attendance.status === "late" && "text-amber-500 bg-amber-50",
                          )}
                          onClick={() => handleAttendanceChange(student.id, "late")}
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn("h-7 w-7", student.attendance.status === "absent" && "text-red-500 bg-red-50")}
                          onClick={() => handleAttendanceChange(student.id, "absent")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredStudents.length} of {students.length} students
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-1 animate-in slide-in-from-right duration-300 delay-200">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Attendance Summary</CardTitle>
              <CardDescription>Class {selectedClass}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Present</span>
                    <span className="font-medium">{attendanceStats.present}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${(attendanceStats.present / attendanceStats.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Late</span>
                    <span className="font-medium">{attendanceStats.late}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${(attendanceStats.late / attendanceStats.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Absent</span>
                    <span className="font-medium">{attendanceStats.absent}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{ width: `${(attendanceStats.absent / attendanceStats.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Excused</span>
                    <span className="font-medium">{attendanceStats.excused}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${(attendanceStats.excused / attendanceStats.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-xs">
                View Monthly Report
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

