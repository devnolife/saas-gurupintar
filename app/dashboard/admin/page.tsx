"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { School, Users, FileText, MoreVertical, Search, ArrowUpRight, Download } from "lucide-react"

// Mock data for charts
const userActivityData = [
  { month: "Jan", teachers: 65, students: 400, admins: 20 },
  { month: "Feb", teachers: 70, students: 420, admins: 22 },
  { month: "Mar", teachers: 75, students: 450, admins: 23 },
  { month: "Apr", teachers: 72, students: 445, admins: 24 },
  { month: "May", teachers: 78, students: 460, admins: 25 },
  { month: "Jun", teachers: 82, students: 480, admins: 26 },
]

const documentData = [
  { month: "Jan", lesson_plans: 120, reports: 30, assessments: 80 },
  { month: "Feb", lesson_plans: 140, reports: 35, assessments: 90 },
  { month: "Mar", lesson_plans: 160, reports: 40, assessments: 100 },
  { month: "Apr", lesson_plans: 150, reports: 38, assessments: 95 },
  { month: "May", lesson_plans: 170, reports: 42, assessments: 110 },
  { month: "Jun", lesson_plans: 180, reports: 45, assessments: 120 },
]

// Mock data for recent activities
const recentActivities = [
  { id: 1, user: "John Doe", action: "Created a new lesson plan", timestamp: "2023-07-10 09:30" },
  { id: 2, user: "Jane Smith", action: "Generated monthly report", timestamp: "2023-07-09 14:45" },
  { id: 3, user: "Mike Johnson", action: "Added new student records", timestamp: "2023-07-08 11:20" },
  { id: 4, user: "Sarah Williams", action: "Updated school information", timestamp: "2023-07-07 16:15" },
  { id: 5, user: "David Brown", action: "Submitted assessment results", timestamp: "2023-07-06 10:05" },
]

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredActivities = recentActivities.filter(
    (activity) =>
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <p className="text-muted-foreground">Selamat datang kembali, lihat statistik dan aktivitas terbaru</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Unduh Laporan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">2,834</div>
                <p className="text-xs text-muted-foreground">+89 dari bulan lalu</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={70} className="mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sekolah</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">482</div>
                <p className="text-xs text-muted-foreground">+12 dari bulan lalu</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={60} className="mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dokumen</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">+1,234 dari bulan lalu</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={85} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="teachers" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="students" stroke="#82ca9d" />
                <Line type="monotone" dataKey="admins" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dokumen yang Dibuat</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={documentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lesson_plans" fill="#8884d8" />
                <Bar dataKey="reports" fill="#82ca9d" />
                <Bar dataKey="assessments" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari aktivitas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem>Lihat detail</DropdownMenuItem>
                        <DropdownMenuItem>Kirim notifikasi</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Hapus log</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

