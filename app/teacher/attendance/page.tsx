"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Check, Download, Filter, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { FeatureProtection } from "@/components/FeatureProtection"
import { SelfieAttendance } from "@/components/SelfieAttendance"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
]

// Sample class data
const classes = [
  { id: "10A", name: "Kelas 10A" },
  { id: "10B", name: "Kelas 10B" },
  { id: "11A", name: "Kelas 11A" },
  { id: "11B", name: "Kelas 11B" },
]

export default function AttendancePage() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState("10A")
  const [searchQuery, setSearchQuery] = useState("")
  const [studentList, setStudentList] = useState(students)
  const [isClient, setIsClient] = useState(false)

  // In a real app, get this from auth context
  const teacherId = "teacher4" // Should match the ID in TeacherSidebar

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
      title: "Absensi Tersimpan",
      description: `Absensi untuk ${format(date, "d MMMM yyyy")} telah dicatat.`,
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

  const AttendanceContent = () => {
    if (!isClient) {
      return <div>Loading...</div>
    }

    return (
      <div className="animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              Sistem Absensi
            </h1>
            <p className="text-muted-foreground mt-1">Catat dan lacak kehadiran guru dan siswa</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Ekspor
            </Button>
            <Button
              className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              onClick={handleSaveAttendance}
            >
              <Check className="h-4 w-4" />
              Simpan Absensi
            </Button>
          </div>
        </div>

        <Tabs defaultValue="teacher" className="space-y-4">
          <TabsList>
            <TabsTrigger value="teacher">Absensi Guru</TabsTrigger>
            <TabsTrigger value="student">Absensi Siswa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="teacher">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <SelfieAttendance teacherId={teacherId} />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Statistik Kehadiran</CardTitle>
                    <CardDescription>Performa kehadiran Anda bulan ini</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Hadir Tepat Waktu</span>
                          <span className="font-medium">18 hari</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{ width: "90%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Terlambat</span>
                          <span className="font-medium">2 hari</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-amber-500"
                            style={{ width: "10%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Izin/Sakit</span>
                          <span className="font-medium">0 hari</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: "0%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="student">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Absensi Siswa Harian</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {format(date, "d MMMM yyyy")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                      </PopoverContent>
                    </Popover>

                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Pilih kelas" />
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
                  Menampilkan absensi untuk {format(date, "d MMMM yyyy")} - {classes.find(c => c.id === selectedClass)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari siswa..."
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
                    <div className="col-span-5">Siswa</div>
                    <div className="col-span-3 text-center">Status</div>
                    <div className="col-span-2 text-center">Waktu</div>
                    <div className="col-span-2 text-center">Aksi</div>
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
                            {student.attendance.status === "present" && "Hadir"}
                            {student.attendance.status === "late" && "Terlambat"}
                            {student.attendance.status === "absent" && "Absen"}
                            {student.attendance.status === "excused" && "Izin"}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-center text-sm">
                          {student.attendance.time || "-"}
                        </div>
                        <div className="col-span-2 flex justify-center gap-2">
                          <Select
                            value={student.attendance.status}
                            onValueChange={(value) => handleAttendanceChange(student.id, value)}
                          >
                            <SelectTrigger className="h-8 w-24">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="present">Hadir</SelectItem>
                              <SelectItem value="late">Terlambat</SelectItem>
                              <SelectItem value="absent">Absen</SelectItem>
                              <SelectItem value="excused">Izin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <FeatureProtection feature="attendance" teacherId={teacherId}>
      <AttendanceContent />
    </FeatureProtection>
  );
} 