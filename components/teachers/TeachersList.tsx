"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Edit, Trash, FileText, Mail, Phone, School, BookOpen, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getTeacherRemainingDocumentQuota } from "@/lib/accountQuotaManager"

// Mock data for teachers
const mockTeachers = [
  {
    id: "teacher1",
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    phone: "+62 812 3456 7890",
    position: "Mathematics Teacher",
    subjects: ["Mathematics", "Physics"],
    school: "SMA Negeri 1 Jakarta",
    schoolType: "SMA",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    documentCount: 32,
    lastActive: "2023-05-15T10:30:00Z",
  },
  {
    id: "teacher2",
    name: "Siti Rahayu",
    email: "siti.rahayu@example.com",
    phone: "+62 813 9876 5432",
    position: "Biology Teacher",
    subjects: ["Biology", "Chemistry"],
    school: "SMA Negeri 2 Jakarta",
    schoolType: "SMA",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    documentCount: 15,
    lastActive: "2023-05-14T14:45:00Z",
  },
  {
    id: "teacher3",
    name: "Ahmad Hidayat",
    email: "ahmad.hidayat@example.com",
    phone: "+62 857 1234 5678",
    position: "History Teacher",
    subjects: ["History", "Civics"],
    school: "SMP Negeri 5 Bandung",
    schoolType: "SMP",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    documentCount: 8,
    lastActive: "2023-04-30T09:15:00Z",
  },
  {
    id: "teacher4",
    name: "Dewi Lestari",
    email: "dewi.lestari@example.com",
    phone: "+62 878 8765 4321",
    position: "English Teacher",
    subjects: ["English"],
    school: "SMA Negeri 3 Surabaya",
    schoolType: "SMA",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    documentCount: 0,
    lastActive: "2023-05-16T08:00:00Z",
  },
  {
    id: "teacher5",
    name: "Rudi Hartono",
    email: "rudi.hartono@example.com",
    phone: "+62 819 8765 1234",
    position: "Physical Education Teacher",
    subjects: ["Physical Education"],
    school: "SMK Negeri 1 Yogyakarta",
    schoolType: "SMK",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    documentCount: 5,
    lastActive: "2023-05-12T11:20:00Z",
  },
]

export function TeachersList() {
  const [teachers, setTeachers] = useState(mockTeachers)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-gray-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "pending":
        return <Badge variant="warning">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleDeleteTeacher = (teacherId) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== teacherId))
  }

  return (
    <div className="grid gap-6">
      {teachers.map((teacher) => {
        const remainingQuota = getTeacherRemainingDocumentQuota(teacher.id)
        const hasLowQuota = remainingQuota < 5

        return (
          <Card key={teacher.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={teacher.avatar} alt={teacher.name} />
                    <AvatarFallback>
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">
                      <Link href={`/dashboard/operator/teachers/${teacher.id}`} className="hover:underline">
                        {teacher.name}
                      </Link>
                      <span className="ml-3 inline-block">{getStatusBadge(teacher.status)}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <School className="h-4 w-4 mr-1" />
                      {teacher.school} ({teacher.schoolType})
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/operator/teachers/${teacher.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/operator/teachers/${teacher.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/operator/teachers/${teacher.id}/documents`}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Documents
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteTeacher(teacher.id)} className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{teacher.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{teacher.phone}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{teacher.subjects.join(", ")}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Position:</span>
                    <span>{teacher.position}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Documents Generated:</span>
                    <span>{teacher.documentCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Remaining Quota:</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center">
                            <span className={hasLowQuota ? "text-red-500 font-medium" : ""}>{remainingQuota}</span>
                            {hasLowQuota && <AlertCircle className="ml-1 h-4 w-4 text-red-500" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {hasLowQuota
                            ? "Low document quota! Consider adding more."
                            : "Document generation quota remaining"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Last Active:</span>
                    <span>{formatDate(teacher.lastActive)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

