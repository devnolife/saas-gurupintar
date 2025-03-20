"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Download,
  FileText,
  Filter,
  Printer,
  Search,
  BarChart3,
  CalendarRange,
  Users,
  FileCheck,
  Calendar,
  FileUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
} from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for reports
const academicReports = [
  {
    id: 1,
    title: "Laporan Nilai Ujian Semester Ganjil",
    type: "grades",
    period: "Semester Ganjil 2023/2024",
    submissionDate: "2023-12-28",
    status: "completed",
    submittedBy: "Bagian Kurikulum",
    classes: ["Semua Kelas"],
    downloadUrl: "#",
  },
  {
    id: 2,
    title: "Laporan Absensi Siswa",
    type: "attendance",
    period: "Oktober 2023",
    submissionDate: "2023-11-05",
    status: "completed",
    submittedBy: "Bagian Kesiswaan",
    classes: ["Semua Kelas"],
    downloadUrl: "#",
  },
  {
    id: 3,
    title: "Laporan Performa Guru",
    type: "performance",
    period: "Semester Ganjil 2023/2024",
    submissionDate: "2023-12-30",
    status: "completed",
    submittedBy: "Wakil Kepala Sekolah",
    classes: ["Semua Kelas"],
    downloadUrl: "#",
  },
  {
    id: 4,
    title: "Laporan Aktivitas Ekstrakurikuler",
    type: "extracurricular",
    period: "September-November 2023",
    submissionDate: "2023-12-10",
    status: "pending",
    submittedBy: "Koordinator Ekstrakurikuler",
    classes: ["Semua Kelas"],
    downloadUrl: "#",
  },
]

const adminReports = [
  {
    id: 1,
    title: "Laporan Keuangan Sekolah",
    type: "finance",
    period: "Q4 2023",
    submissionDate: "2023-12-15",
    status: "completed",
    submittedBy: "Bagian Keuangan",
    downloadUrl: "#",
  },
  {
    id: 2,
    title: "Laporan Inventaris Sarana Prasarana",
    type: "inventory",
    period: "Semester Ganjil 2023/2024",
    submissionDate: "2023-12-20",
    status: "completed",
    submittedBy: "Bagian Sarana Prasarana",
    downloadUrl: "#",
  },
  {
    id: 3,
    title: "Laporan Penerimaan Siswa Baru",
    type: "admission",
    period: "Tahun Ajaran 2023/2024",
    submissionDate: "2023-08-15",
    status: "completed",
    submittedBy: "Panitia PSB",
    downloadUrl: "#",
  },
  {
    id: 4,
    title: "Laporan Pemeliharaan Gedung",
    type: "maintenance",
    period: "Semester Ganjil 2023/2024",
    submissionDate: "2023-12-25",
    status: "pending",
    submittedBy: "Bagian Sarana Prasarana",
    downloadUrl: "#",
  },
  {
    id: 5,
    title: "Laporan Kegiatan Tahunan",
    type: "activities",
    period: "Tahun 2023",
    submissionDate: "2024-01-15",
    status: "pending",
    submittedBy: "Wakil Kepala Sekolah",
    downloadUrl: "#",
  },
]

// Schedules for reports
const reportSchedule = [
  {
    id: 1,
    title: "Laporan Nilai Ujian Tengah Semester",
    dueDate: "2024-03-30",
    assignedTo: "Bagian Kurikulum",
    status: "upcoming",
    type: "grades",
  },
  {
    id: 2,
    title: "Laporan Absensi Siswa Bulanan",
    dueDate: "2024-01-05",
    assignedTo: "Bagian Kesiswaan",
    status: "upcoming",
    type: "attendance",
  },
  {
    id: 3,
    title: "Laporan Keuangan Q1",
    dueDate: "2024-04-15",
    assignedTo: "Bagian Keuangan",
    status: "upcoming",
    type: "finance",
  },
  {
    id: 4,
    title: "Laporan Performa Guru Semester Genap",
    dueDate: "2024-06-25",
    assignedTo: "Wakil Kepala Sekolah",
    status: "upcoming",
    type: "performance",
  },
  {
    id: 5,
    title: "Laporan Pelaksanaan Program Sekolah",
    dueDate: "2024-06-30",
    assignedTo: "Kepala Sekolah",
    status: "upcoming",
    type: "program",
  },
]

export default function HeadmasterReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter function for reports
  const filterReports = (reports: any[]) => {
    return reports.filter((report) => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPeriod = filterPeriod === "all" || report.period.includes(filterPeriod)
      const matchesStatus = filterStatus === "all" || report.status === filterStatus

      return matchesSearch && matchesPeriod && matchesStatus
    })
  }

  const filteredAcademicReports = filterReports(academicReports)
  const filteredAdminReports = filterReports(adminReports)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">Laporan</h1>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <Button variant="outline">
            <FileUp className="h-4 w-4 mr-2" />
            Unggah Laporan
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Laporan
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Jadwal Pelaporan</CardTitle>
          <CardDescription>Jadwal pengumpulan laporan mendatang</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul Laporan</TableHead>
                  <TableHead>Tenggat Waktu</TableHead>
                  <TableHead>Penanggung Jawab</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Jenis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportSchedule.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{schedule.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {schedule.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>{schedule.assignedTo}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        {schedule.status === "upcoming" ? "Mendatang" : "Tenggat Hari Ini"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {schedule.type === "grades"
                          ? "Nilai"
                          : schedule.type === "attendance"
                            ? "Absensi"
                            : schedule.type === "finance"
                              ? "Keuangan"
                              : schedule.type === "performance"
                                ? "Performa"
                                : "Program"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari laporan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Periode</SelectItem>
                <SelectItem value="2023/2024">2023/2024</SelectItem>
                <SelectItem value="Ganjil">Semester Ganjil</SelectItem>
                <SelectItem value="Genap">Semester Genap</SelectItem>
                <SelectItem value="2023">Tahun 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="pending">Tertunda</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="academic" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="academic">Laporan Akademik</TabsTrigger>
          <TabsTrigger value="administrative">Laporan Administratif</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Akademik</CardTitle>
              <CardDescription>Laporan terkait kegiatan belajar mengajar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul Laporan</TableHead>
                      <TableHead>Periode</TableHead>
                      <TableHead>Tanggal Pengumpulan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pengumpul</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAcademicReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {report.type === "grades" ? (
                              <FileText className="h-4 w-4 text-blue-500" />
                            ) : report.type === "attendance" ? (
                              <Users className="h-4 w-4 text-green-500" />
                            ) : report.type === "performance" ? (
                              <BarChart3 className="h-4 w-4 text-purple-500" />
                            ) : (
                              <CalendarRange className="h-4 w-4 text-amber-500" />
                            )}
                            <span className="font-medium">{report.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{format(new Date(report.submissionDate), "dd MMM yyyy")}</TableCell>
                        <TableCell>
                          {report.status === "completed" ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 flex w-fit items-center"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Selesai
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200 flex w-fit items-center"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Tertunda
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{report.submittedBy}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Lihat</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Print</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {filteredAcademicReports.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          <div className="flex flex-col items-center">
                            <FileCheck className="h-10 w-10 text-muted-foreground opacity-40 mb-3" />
                            <p className="text-muted-foreground">Tidak ada laporan yang ditemukan</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="administrative" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Administratif</CardTitle>
              <CardDescription>Laporan terkait administrasi dan manajemen sekolah</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul Laporan</TableHead>
                      <TableHead>Periode</TableHead>
                      <TableHead>Tanggal Pengumpulan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pengumpul</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdminReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {report.type === "finance" ? (
                              <FileText className="h-4 w-4 text-green-500" />
                            ) : report.type === "inventory" ? (
                              <FileText className="h-4 w-4 text-blue-500" />
                            ) : report.type === "admission" ? (
                              <Users className="h-4 w-4 text-purple-500" />
                            ) : report.type === "maintenance" ? (
                              <AlertCircle className="h-4 w-4 text-amber-500" />
                            ) : (
                              <CalendarRange className="h-4 w-4 text-primary" />
                            )}
                            <span className="font-medium">{report.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{format(new Date(report.submissionDate), "dd MMM yyyy")}</TableCell>
                        <TableCell>
                          {report.status === "completed" ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 flex w-fit items-center"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Selesai
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200 flex w-fit items-center"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Tertunda
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{report.submittedBy}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Lihat</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Print</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {filteredAdminReports.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          <div className="flex flex-col items-center">
                            <FileCheck className="h-10 w-10 text-muted-foreground opacity-40 mb-3" />
                            <p className="text-muted-foreground">Tidak ada laporan yang ditemukan</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

