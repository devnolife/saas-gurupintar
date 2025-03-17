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
import { School, Users, FileText, MoreVertical, Search, Download, CreditCard, TrendingUp, Activity } from "lucide-react"
import { DashboardCard } from "@/components/DashboardCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <div className="space-y-8 w-full p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <p className="text-muted-foreground">Selamat datang kembali, lihat statistik dan aktivitas terbaru</p>
        </div>
        <Button className="gap-2 rounded-xl">
          <Download className="h-4 w-4" /> Unduh Laporan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Pengguna"
          value="2,834"
          description="+89 dari bulan lalu"
          icon={Users}
          trend={{ value: 3.2, isPositive: true }}
          colorScheme="primary"
        />
        <DashboardCard
          title="Total Sekolah"
          value="482"
          description="+12 dari bulan lalu"
          icon={School}
          trend={{ value: 2.5, isPositive: true }}
          colorScheme="secondary"
        />
        <DashboardCard
          title="Total Dokumen"
          value="12,543"
          description="+1,234 dari bulan lalu"
          icon={FileText}
          trend={{ value: 9.8, isPositive: true }}
          colorScheme="accent"
        />
        <DashboardCard
          title="Pendapatan"
          value="Rp 45.6M"
          description="-2.3% dari bulan lalu"
          icon={CreditCard}
          trend={{ value: 2.3, isPositive: false }}
          colorScheme="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md bg-white dark:bg-gray-900">
          <Tabs defaultValue="users">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Analisis Aktivitas</CardTitle>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="users">Pengguna</TabsTrigger>
                <TabsTrigger value="documents">Dokumen</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="users" className="mt-0">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="teachers"
                      stroke="var(--primary)"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line type="monotone" dataKey="students" stroke="var(--secondary)" strokeWidth={2} />
                    <Line type="monotone" dataKey="admins" stroke="var(--accent)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="documents" className="mt-0">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={documentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="lesson_plans" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="reports" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="assessments" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <Card className="border-none shadow-md bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Kalender Aktivitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-medium text-muted-foreground">
                      {["Sen", "Sel", "Rab", "Kam", "Jum"][i]}
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                      {i + 10}
                    </div>
                  </div>
                  <div className="flex-1 rounded-lg border p-3">
                    <div className="font-medium">
                      {
                        [
                          "Rapat Koordinasi Sekolah",
                          "Pelatihan Guru Baru",
                          "Evaluasi Kurikulum",
                          "Pertemuan dengan Kepala Sekolah",
                          "Pengembangan Sistem",
                        ][i]
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {["09:00 - 10:30", "13:00 - 15:00", "10:00 - 12:00", "14:00 - 15:30", "09:30 - 11:00"][i]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md bg-white dark:bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari aktivitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9 w-[200px] rounded-lg border-muted bg-muted/50"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 rounded-lg">
              <Activity className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
                <TableRow key={activity.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell className="text-right">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-md bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Statistik Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Guru</div>
                  <div className="text-sm text-muted-foreground">82 / 100</div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Operator</div>
                  <div className="text-sm text-muted-foreground">24 / 30</div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Admin</div>
                  <div className="text-sm text-muted-foreground">5 / 10</div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Tindakan Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 rounded-xl">
                <Users className="h-6 w-6" />
                <span>Tambah Pengguna</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 rounded-xl">
                <School className="h-6 w-6" />
                <span>Tambah Sekolah</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 rounded-xl">
                <FileText className="h-6 w-6" />
                <span>Buat Laporan</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 rounded-xl">
                <TrendingUp className="h-6 w-6" />
                <span>Lihat Analitik</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

