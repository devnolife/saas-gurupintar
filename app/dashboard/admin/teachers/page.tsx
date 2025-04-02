"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Eye,
  Edit,
  Save,
  UserPlus,
  Filter,
  MoreHorizontal,
  Download,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  X,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  School,
  Calendar,
  Users,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

// Mock data - in a real application, this would come from an API
const initialTeachers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Mathematics",
    status: "Active",
    school: "SMA Negeri 1 Jakarta",
    lastActive: "2 hours ago",
    students: 42,
    completedLessons: 156,
    joinDate: "Jan 15, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "123-456-7890",
    address: "123 Main St",
    bio: "A dedicated math teacher with 10 years of experience.",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    subject: "Science",
    status: "Pending Payment",
    school: "SMA Negeri 3 Bandung",
    lastActive: "5 days ago",
    students: 28,
    completedLessons: 89,
    joinDate: "Mar 22, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "987-654-3210",
    address: "456 Oak Ave",
    bio: "Passionate about science and making it accessible to all students.",
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol@example.com",
    subject: "English",
    status: "Active",
    school: "SMA Santo Aloysius",
    lastActive: "Just now",
    students: 35,
    completedLessons: 210,
    joinDate: "Nov 5, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "555-123-4567",
    address: "789 Pine Ln",
    bio: "An enthusiastic English teacher who loves literature and writing.",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david@example.com",
    subject: "History",
    status: "Inactive",
    school: "SMA Negeri 2 Surabaya",
    lastActive: "2 weeks ago",
    students: 18,
    completedLessons: 45,
    joinDate: "Apr 10, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "111-222-3333",
    address: "101 Elm Rd",
    bio: "A history buff dedicated to bringing the past to life for students.",
  },
  {
    id: 5,
    name: "Eva Chen",
    email: "eva@example.com",
    subject: "Physics",
    status: "Active",
    school: "SMA Negeri 1 Yogyakarta",
    lastActive: "3 hours ago",
    students: 31,
    completedLessons: 178,
    joinDate: "Feb 8, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "444-555-6666",
    address: "222 Maple Dr",
    bio: "A physics enthusiast who believes in hands-on learning.",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@example.com",
    subject: "Chemistry",
    status: "Pending Approval",
    school: "SMA Negeri 5 Jakarta",
    lastActive: "1 day ago",
    students: 0,
    completedLessons: 0,
    joinDate: "Jun 30, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "777-888-9999",
    address: "333 Birch Ct",
    bio: "A chemistry expert focused on making science fun and engaging.",
  },
]

const teacherFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  school: z.string().min(1, { message: "School is required." }),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
})

const getStatusBadge = (status) => {
  switch (status) {
    case "Active":
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Active
        </Badge>
      )
    case "Pending Payment":
      return (
        <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending Payment
        </Badge>
      )
    case "Pending Approval":
      return (
        <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending Approval
        </Badge>
      )
    case "Inactive":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Inactive
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

// Teacher Details Component
function TeacherDetails({ teacher }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24">
            <AvatarImage src={teacher.avatar} alt={teacher.name} />
            <AvatarFallback className="text-2xl">
              {teacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-1 flex-1">
          <h3 className="text-2xl font-bold">{teacher.name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{teacher.subject} Teacher</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <School className="h-4 w-4" />
            <span>{teacher.school}</span>
          </div>
          <div className="mt-2">{getStatusBadge(teacher.status)}</div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Contact Information</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{teacher.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{teacher.phone || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{teacher.address || "Not provided"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Account Information</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined: {teacher.joinDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Last active: {teacher.lastActive}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Students: {teacher.students}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Statistics</h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{teacher.students}</div>
              <p className="text-xs text-muted-foreground">Active Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{teacher.completedLessons}</div>
              <p className="text-xs text-muted-foreground">Completed Lessons</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{Math.round(teacher.completedLessons / (teacher.students || 1))}</div>
              <p className="text-xs text-muted-foreground">Avg. Lessons per Student</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Biography</h4>
        <p className="text-sm text-muted-foreground">{teacher.bio || "No biography provided."}</p>
      </div>
    </div>
  )
}

// Teacher Edit Form Component
function TeacherEditForm({ teacher, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
      school: teacher.school,
      phone: teacher.phone || "",
      address: teacher.address || "",
      bio: teacher.bio || "",
    },
  })

  function handleSubmit(data) {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter teacher biography..." className="min-h-[120px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" })
  const [teachers, setTeachers] = useState(initialTeachers)
  const router = useRouter()

  // Get unique subjects for filter
  const subjects = Array.from(new Set(teachers.map((teacher) => teacher.subject)))

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...teachers]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.school.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((teacher) => teacher.status === statusFilter)
    }

    // Apply subject filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((teacher) => teacher.subject === roleFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setTeachers(filtered)
  }, [teachers, searchTerm, statusFilter, roleFilter, sortConfig])

  const handleAddTeacher = () => {
    // This would typically submit the form data to an API
  }

  const handleActivateTeacher = (id) => {
    setTeachers(teachers.map((teacher) => (teacher.id === id ? { ...teacher, status: "Active" } : teacher)))
  }

  const handleRefresh = () => {
    // Simulate API refresh
  }

  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setRoleFilter("all")
    setSortConfig({ key: "name", direction: "ascending" })
  }

  // Function to open teacher details
  const openTeacherDetails = (teacher) => {
    setSelectedTeacher(teacher)
    setIsDetailsOpen(true)
    setIsEditMode(false)
  }

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  // Function to handle teacher update
  const handleUpdateTeacher = (data) => {
    // In a real app, you would call an API here
    setTeachers(teachers.map((t) => (t.id === selectedTeacher.id ? { ...t, ...data } : t)))
    setIsEditMode(false)
    // Update the selected teacher with new data
    setSelectedTeacher({ ...selectedTeacher, ...data })
  }

  // Function to close the details dialog
  const closeDetails = () => {
    setIsDetailsOpen(false)
    setSelectedTeacher(null)
    setIsEditMode(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">Manage teacher accounts and monitor their activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push("/dashboard/admin/teachers/create")} className="w-full md:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
          <Button onClick={handleRefresh} variant="outline" size="icon" className="hidden md:flex">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex w-full md:w-96 items-center space-x-2">
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
                type="search"
                leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            
            <div className="flex flex-1 flex-col md:flex-row gap-4 justify-end">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span>Subject</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending Payment">Pending Payment</SelectItem>
                  <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="h-10 px-4 py-2" onClick={resetFilters}>
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>

              <Button variant="outline" className="h-10 px-4 py-2 md:hidden" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Teachers</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleRefresh}>
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4" />
                </Button>

                <Dialog open={addTeacherOpen} onOpenChange={setAddTeacherOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Teacher
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Add New Teacher</DialogTitle>
                      <DialogDescription>Enter the details of the new teacher account.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Name
                        </label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right">
                          Email
                        </label>
                        <Input id="email" type="email" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="subject" className="text-right">
                          Subject
                        </label>
                        <Input id="subject" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="school" className="text-right">
                          School
                        </label>
                        <Input id="school" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddTeacherOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddTeacher}>Add Teacher</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {showFilters && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <label htmlFor="search" className="text-sm font-medium">
                        Search
                      </label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          type="text"
                          placeholder="Search by name, email, school..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-[180px] space-y-2">
                      <label htmlFor="status-filter" className="text-sm font-medium">
                        Status
                      </label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger id="status-filter">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Pending Payment">Pending Payment</SelectItem>
                          <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full md:w-[180px] space-y-2">
                      <label htmlFor="subject-filter" className="text-sm font-medium">
                        Subject
                      </label>
                      <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger id="subject-filter">
                          <SelectValue placeholder="Filter by subject" />
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
                    </div>

                    <Button variant="outline" onClick={resetFilters} className="flex gap-2">
                      <X className="h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <TabsContent value="all" className="m-0">
              <Card className="shadow-sm border-none">
                <CardContent className="p-0">
                  <div className="relative overflow-x-auto rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">
                            <div className="flex items-center cursor-pointer" onClick={() => requestSort("name")}>
                              Teacher
                              {sortConfig.key === "name" &&
                                (sortConfig.direction === "ascending" ? (
                                  <ChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="ml-1 h-4 w-4" />
                                ))}
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center cursor-pointer" onClick={() => requestSort("subject")}>
                              Subject
                              {sortConfig.key === "subject" &&
                                (sortConfig.direction === "ascending" ? (
                                  <ChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="ml-1 h-4 w-4" />
                                ))}
                            </div>
                          </TableHead>
                          <TableHead className="hidden md:table-cell">School</TableHead>
                          <TableHead className="hidden lg:table-cell">
                            <div className="flex items-center cursor-pointer" onClick={() => requestSort("students")}>
                              Students
                              {sortConfig.key === "students" &&
                                (sortConfig.direction === "ascending" ? (
                                  <ChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="ml-1 h-4 w-4" />
                                ))}
                            </div>
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          Array(5)
                            .fill(0)
                            .map((_, index) => (
                              <TableRow key={`skeleton-${index}`} className="animate-pulse">
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                                    <div className="space-y-1">
                                      <div className="h-4 w-24 bg-muted rounded"></div>
                                      <div className="h-3 w-32 bg-muted rounded"></div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="h-4 w-20 bg-muted rounded"></div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="h-4 w-32 bg-muted rounded"></div>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                  <div className="h-4 w-8 bg-muted rounded"></div>
                                </TableCell>
                                <TableCell>
                                  <div className="h-6 w-20 bg-muted rounded-full"></div>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                  <div className="h-4 w-16 bg-muted rounded"></div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="h-8 w-8 bg-muted rounded ml-auto"></div>
                                </TableCell>
                              </TableRow>
                            ))
                        ) : teachers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No teachers found matching your filters
                            </TableCell>
                          </TableRow>
                        ) : (
                          teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={teacher.avatar} alt={teacher.name} />
                                    <AvatarFallback>
                                      {teacher.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{teacher.name}</div>
                                    <div className="text-sm text-muted-foreground">{teacher.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{teacher.subject}</TableCell>
                              <TableCell className="hidden md:table-cell">{teacher.school}</TableCell>
                              <TableCell className="hidden lg:table-cell">{teacher.students}</TableCell>
                              <TableCell>{getStatusBadge(teacher.status)}</TableCell>
                              <TableCell className="hidden lg:table-cell">{teacher.lastActive}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => openTeacherDetails(teacher)}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        openTeacherDetails(teacher)
                                        setTimeout(() => setIsEditMode(true), 100)
                                      }}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {teacher.status === "Pending Payment" || teacher.status === "Pending Approval" ? (
                                      <DropdownMenuItem onClick={() => handleActivateTeacher(teacher.id)}>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Activate account
                                      </DropdownMenuItem>
                                    ) : null}
                                    {teacher.status === "Active" ? (
                                      <DropdownMenuItem className="text-destructive">
                                        <AlertCircle className="mr-2 h-4 w-4" />
                                        Suspend account
                                      </DropdownMenuItem>
                                    ) : null}
                                    {teacher.status === "Inactive" ? (
                                      <DropdownMenuItem>
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Reactivate account
                                      </DropdownMenuItem>
                                    ) : null}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="m-0">
              <Card className="shadow-sm border-none">
                <CardContent className="p-0">
                  {/* Similar table structure as above, but filtered for active teachers */}
                  <div className="p-8 text-center text-muted-foreground">
                    Active teachers view - Same table structure with pre-filtered data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="m-0">
              <Card className="shadow-sm border-none">
                <CardContent className="p-0">
                  {/* Similar table structure as above, but filtered for pending teachers */}
                  <div className="p-8 text-center text-muted-foreground">
                    Pending teachers view - Same table structure with pre-filtered data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inactive" className="m-0">
              <Card className="shadow-sm border-none">
                <CardContent className="p-0">
                  {/* Similar table structure as above, but filtered for inactive teachers */}
                  <div className="p-8 text-center text-muted-foreground">
                    Inactive teachers view - Same table structure with pre-filtered data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Teacher Details Dialog */}
          <Dialog
            open={isDetailsOpen}
            onOpenChange={(open) => {
              if (!open) closeDetails()
              else setIsDetailsOpen(true)
            }}
          >
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              {selectedTeacher && (
                <>
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-xl">{isEditMode ? "Edit Teacher" : "Teacher Details"}</DialogTitle>
                      <div className="flex gap-2">
                        {!isEditMode ? (
                          <Button variant="outline" size="sm" onClick={toggleEditMode}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => setIsEditMode(false)}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                    <DialogDescription>
                      {isEditMode ? "Update the teacher's information below." : `Viewing details for ${selectedTeacher.name}`}
                    </DialogDescription>
                  </DialogHeader>

                  {isEditMode ? (
                    // Edit Form
                    <TeacherEditForm teacher={selectedTeacher} onSubmit={handleUpdateTeacher} />
                  ) : (
                    // View Details
                    <TeacherDetails teacher={selectedTeacher} />
                  )}
                </>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}

