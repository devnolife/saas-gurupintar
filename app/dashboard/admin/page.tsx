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
  AreaChart,
  Area,
  ReferenceLine,
  TooltipProps,
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
  UserPlus,
  Clock,
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

// Pre-registered users data
const preRegisteredData = [
  { month: "Jan", teachers: 12, operators: 5, headmasters: 2 },
  { month: "Feb", teachers: 15, operators: 6, headmasters: 3 },
  { month: "Mar", teachers: 22, operators: 8, headmasters: 4 },
  { month: "Apr", teachers: 18, operators: 7, headmasters: 3 },
  { month: "May", teachers: 25, operators: 10, headmasters: 5 },
  { month: "Jun", teachers: 28, operators: 12, headmasters: 6 },
]

// Mock data for recent activities
const recentActivities = [
  { id: 1, user: "John Doe", action: "Created a new lesson plan", timestamp: "2023-07-10 09:30" },
  { id: 2, user: "Jane Smith", action: "Generated monthly report", timestamp: "2023-07-09 14:45" },
  { id: 3, user: "Mike Johnson", action: "Added new student records", timestamp: "2023-07-08 11:20" },
  { id: 4, user: "Sarah Williams", action: "Updated school information", timestamp: "2023-07-07 16:15" },
  { id: 5, user: "David Brown", action: "Submitted assessment results", timestamp: "2023-07-06 10:05" },
]

// Mock data for pre-registered users
const pendingUsersList = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad@school.edu", role: "Teacher", status: "Pending Approval", createdAt: "2023-07-10" },
  { id: 2, name: "Siti Rahmi", email: "siti@school.edu", role: "Operator", status: "Pending Approval", createdAt: "2023-07-09" },
  { id: 3, name: "Budi Santoso", email: "budi@school.edu", role: "Teacher", status: "Pending Approval", createdAt: "2023-07-09" },
  { id: 4, name: "Dewi Lestari", email: "dewi@school.edu", role: "Headmaster", status: "Documentation Required", createdAt: "2023-07-08" },
  { id: 5, name: "Eko Prasetyo", email: "eko@school.edu", role: "Teacher", status: "Pending Approval", createdAt: "2023-07-07" },
]

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 border shadow-lg custom-tooltip bg-background border-border rounded-xl">
        <p className="mb-2 font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="font-medium">{entry.name}: </span>
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredActivities = recentActivities.filter(
    (activity) =>
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full p-6 space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-primary-light bg-clip-text">
            Dashboard Admin
          </h1>
          <p className="text-muted-foreground">Selamat datang kembali, lihat statistik dan aktivitas terbaru</p>
        </div>
        <Button className="gap-2 transition-opacity rounded-full bg-gradient-to-r from-primary to-primary-light hover:opacity-90">
          <Download className="w-4 h-4" /> Unduh Laporan
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Pengguna"
          value="5"
          description="+3 dari bulan lalu"
          icon={Users}
          trend={{ value: 3.2, isPositive: true }}
          colorScheme="primary"
        />
        <DashboardCard
          title="Total Sekolah"
          value="13"
          description="+10 dari bulan lalu"
          icon={School}
          trend={{ value: 2.5, isPositive: true }}
          colorScheme="secondary"
        />
        <DashboardCard
          title="Pre-Registered"
          value="48"
          description="+10 dari minggu lalu"
          icon={UserPlus}
          trend={{ value: 17.4, isPositive: true }}
          colorScheme="accent"
        />
        <DashboardCard
          title="Pendapatan"
          value="Rp 850.000"
          description="Dari total 5 Pengguna"
          icon={CreditCard}
          trend={{ value: 2.3, isPositive: true }}
          colorScheme="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden bg-white border-none shadow-md lg:col-span-2 dark:bg-gray-900 rounded-2xl">
          <Tabs defaultValue="users">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Analisis Aktivitas</CardTitle>
              <TabsList className="p-1 rounded-full bg-muted/50">
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
                <TabsTrigger
                  value="preregistered"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Pre-Registered
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="users" className="mt-0">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={userActivityData}>
                    <defs>
                      <linearGradient id="teachersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="studentsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="adminsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      padding={{ left: 20, right: 20 }}
                    />
                    <YAxis
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{
                        paddingTop: "10px",
                        fontSize: "12px"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="teachers"
                      name="Guru"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#teachersGradient)"
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="students"
                      name="Siswa"
                      stroke="var(--secondary)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#studentsGradient)"
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="admins"
                      name="Admin"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#adminsGradient)"
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="documents" className="mt-0">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={documentData} barGap={8} barSize={20}>
                    <defs>
                      <linearGradient id="lessonPlansGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="reportsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--secondary)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="assessmentsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      padding={{ left: 20, right: 20 }}
                    />
                    <YAxis
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{
                        paddingTop: "10px",
                        fontSize: "12px"
                      }}
                    />
                    <Bar
                      dataKey="lesson_plans"
                      name="RPP"
                      radius={[4, 4, 0, 0]}
                      fill="url(#lessonPlansGradient)"
                      animationDuration={1500}
                    />
                    <Bar
                      dataKey="reports"
                      name="Laporan"
                      radius={[4, 4, 0, 0]}
                      fill="url(#reportsGradient)"
                      animationDuration={1500}
                      animationBegin={300}
                    />
                    <Bar
                      dataKey="assessments"
                      name="Penilaian"
                      radius={[4, 4, 0, 0]}
                      fill="url(#assessmentsGradient)"
                      animationDuration={1500}
                      animationBegin={600}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="preregistered" className="mt-0">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={preRegisteredData}>
                    <defs>
                      <linearGradient id="preregTeachersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="preregOperatorsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="preregHeadmastersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      padding={{ left: 20, right: 20 }}
                    />
                    <YAxis
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{
                        paddingTop: "10px",
                        fontSize: "12px"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="teachers"
                      name="Guru"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#preregTeachersGradient)"
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="operators"
                      name="Operator"
                      stroke="#22c55e"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#preregOperatorsGradient)"
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="headmasters"
                      name="Kepala Sekolah"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#preregHeadmastersGradient)"
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                    />
                    <ReferenceLine
                      y={20}
                      label="Target"
                      stroke="#ef4444"
                      strokeDasharray="3 3"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <Card className="overflow-hidden bg-white border-none shadow-md dark:bg-gray-900 rounded-2xl">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold">Pre-Registered Users</CardTitle>
            <Button variant="outline" size="sm" className="w-auto gap-1 rounded-full h-9">
              <Clock className="w-4 h-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingUsersList.slice(0, 4).map((user) => (
                <div key={user.id} className="flex items-center gap-4 p-3 transition-colors duration-300 border rounded-xl border-muted hover:border-primary/20 hover:bg-primary/5">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-medium rounded-full bg-primary/10 text-primary">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{user.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{user.role}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                    {user.status}
                  </div>
                </div>
              ))}
              <div className="flex justify-center pt-2">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark hover:bg-primary/10">
                  Show all pending users
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden bg-white border-none shadow-md dark:bg-gray-900 rounded-2xl">
        <CardHeader className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <CardTitle className="text-xl font-bold">Aktivitas Terbaru</CardTitle>
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari aktivitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 w-full sm:w-[200px] rounded-full border-muted bg-muted/50"
              />
            </div>
            <Button variant="outline" size="sm" className="w-full rounded-full h-9 sm:w-auto">
              <Activity className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden border rounded-xl">
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
                            className="w-8 h-8 p-0 transition-opacity rounded-full opacity-0 group-hover:opacity-100"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] rounded-xl">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-lg cursor-pointer">
                            <Edit className="w-4 h-4 mr-2" />
                            Lihat detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg cursor-pointer">
                            <Mail className="w-4 h-4 mr-2" />
                            Kirim notifikasi
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="overflow-hidden bg-white border-none shadow-md dark:bg-gray-900 rounded-2xl">
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
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Operator</div>
                  <div className="text-sm text-muted-foreground">24 / 30</div>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary-light"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Admin</div>
                  <div className="text-sm text-muted-foreground">5 / 10</div>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white border-none shadow-md dark:bg-gray-900 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Tindakan Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="flex flex-col items-center justify-center h-auto gap-2 py-4 transition-opacity rounded-xl bg-gradient-to-br from-primary/80 to-primary hover:opacity-90">
                <Users className="w-6 h-6" />
                <span>Tambah Pengguna</span>
              </Button>
              <Button className="flex flex-col items-center justify-center h-auto gap-2 py-4 transition-opacity rounded-xl bg-gradient-to-br from-secondary/80 to-secondary hover:opacity-90">
                <School className="w-6 h-6" />
                <span>Tambah Sekolah</span>
              </Button>
              <Button className="flex flex-col items-center justify-center h-auto gap-2 py-4 transition-opacity rounded-xl bg-gradient-to-br from-accent/80 to-accent hover:opacity-90">
                <FileText className="w-6 h-6" />
                <span>Buat Laporan</span>
              </Button>
              <Button className="flex flex-col items-center justify-center h-auto gap-2 py-4 transition-opacity rounded-xl bg-gradient-to-br from-primary/80 to-primary hover:opacity-90">
                <TrendingUp className="w-6 h-6" />
                <span>Lihat Analitik</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

