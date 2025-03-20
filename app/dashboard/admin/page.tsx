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
import {
  School,
  Users,
  FileText,
  MoreVertical,
  Search,
  Download,
  CreditCard,
  TrendingUp,
  Activity,
  Mail,
  Trash2,
  Edit,
} from "lucide-react"
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
    <div className="space-y-8 w-full p-6 min-h-[calc(100vh-10rem)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Dashboard Admin
          </h1>
          <p className="text-muted-foreground">Selamat datang kembali, lihat statistik dan aktivitas terbaru</p>
        </div>
        <Button className="gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity">
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
        <Card className="lg:col-span-2 border-none shadow-md bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
          <Tabs defaultValue="users">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Analisis Aktivitas</CardTitle>
              <TabsList className="bg-muted/50 rounded-full p-1">
                <TabsTrigger
                  value="users"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Pengguna
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Dokumen
                </TabsTrigger>
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

        <Card className="border-none shadow-md bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Kalender Aktivitas</CardTitle>
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
                  <div className="flex-1 rounded-xl border p-3 hover:border-primary/20 hover:bg-primary/5 transition-colors duration-300 cursor-pointer">
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

      <Card className="border-none shadow-md bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-xl font-bold">Aktivitas Terbaru</CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari aktivitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 w-full sm:w-[200px] rounded-full border-muted bg-muted/50"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 rounded-full w-full sm:w-auto">
              <Activity className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Aksi</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id} className="hover:bg-muted/30 group">
                    <TableCell className="font-medium">{activity.user}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] rounded-xl">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-lg cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Lihat detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg cursor-pointer">
                            <Mail className="mr-2 h-4 w-4" />
                            Kirim notifikasi
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive rounded-lg cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus log
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-md bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Statistik Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Guru</div>
                  <div className="text-sm text-muted-foreground">82 / 100</div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Operator</div>
                  <div className="text-sm text-muted-foreground">24 / 30</div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-secondary-light rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Admin</div>
                  <div className="text-sm text-muted-foreground">5 / 10</div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Tindakan Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary/80 to-primary hover:opacity-90 transition-opacity">
                <Users className="h-6 w-6" />
                <span>Tambah Pengguna</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-secondary/80 to-secondary hover:opacity-90 transition-opacity">
                <School className="h-6 w-6" />
                <span>Tambah Sekolah</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-accent/80 to-accent hover:opacity-90 transition-opacity">
                <FileText className="h-6 w-6" />
                <span>Buat Laporan</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary/80 to-primary hover:opacity-90 transition-opacity">
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

