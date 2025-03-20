"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, FileText, BookOpen, ListChecks, Calendar, Clock, BarChart, Eye, Edit } from "lucide-react"
import Link from "next/link"

// Mock data for curriculum
const curriculumOverview = {
  currentTerm: "Ganjil 2023/2024",
  completionRate: 68,
  nextAssessment: "10 November 2023",
  pendingApprovals: 4,
  subjects: 12,
  documents: 42,
}

const subjects = [
  {
    id: 1,
    name: "Matematika",
    grade: "7, 8, 9",
    completionRate: 75,
    teachers: 3,
    lastUpdated: "2023-10-15",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Bahasa Indonesia",
    grade: "7, 8, 9",
    completionRate: 82,
    teachers: 4,
    lastUpdated: "2023-10-12",
    status: "Aktif",
  },
  {
    id: 3,
    name: "IPA",
    grade: "7, 8, 9",
    completionRate: 65,
    teachers: 3,
    lastUpdated: "2023-10-08",
    status: "Perlu Revisi",
  },
  {
    id: 4,
    name: "IPS",
    grade: "7, 8, 9",
    completionRate: 70,
    teachers: 2,
    lastUpdated: "2023-10-10",
    status: "Aktif",
  },
  {
    id: 5,
    name: "Bahasa Inggris",
    grade: "7, 8, 9",
    completionRate: 78,
    teachers: 3,
    lastUpdated: "2023-10-14",
    status: "Aktif",
  },
  {
    id: 6,
    name: "Pendidikan Agama",
    grade: "7, 8, 9",
    completionRate: 60,
    teachers: 2,
    lastUpdated: "2023-10-05",
    status: "Perlu Revisi",
  },
]

const pendingApprovals = [
  {
    id: 1,
    title: "Silabus Matematika Kelas 8",
    teacher: "Budi Santoso",
    submittedDate: "2023-10-14",
    type: "Silabus",
  },
  {
    id: 2,
    title: "RPP IPA Kelas 7 - Ekosistem",
    teacher: "Siti Rahayu",
    submittedDate: "2023-10-13",
    type: "RPP",
  },
  {
    id: 3,
    title: "Program Semester IPS Kelas 9",
    teacher: "Ahmad Hidayat",
    submittedDate: "2023-10-12",
    type: "Prosem",
  },
  {
    id: 4,
    title: "RPP Bahasa Inggris Kelas 8 - Past Tense",
    teacher: "Dewi Lestari",
    submittedDate: "2023-10-11",
    type: "RPP",
  },
]

export default function HeadmasterCurriculumPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">Manajemen Kurikulum</h1>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Dokumen Kurikulum
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Unduh Laporan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
          <TabsTrigger value="subjects">Mata Pelajaran</TabsTrigger>
          <TabsTrigger value="approvals">Persetujuan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Semester Saat Ini</CardTitle>
                <CardDescription>Tahun ajaran berjalan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-xl font-semibold">{curriculumOverview.currentTerm}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Penilaian berikutnya: {curriculumOverview.nextAssessment}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Progres Kurikulum</CardTitle>
                <CardDescription>Tingkat penyelesaian saat ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="h-5 w-5 text-primary" />
                  <span className="text-xl font-semibold">{curriculumOverview.completionRate}%</span>
                </div>
                <Progress value={curriculumOverview.completionRate} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Menunggu Persetujuan</CardTitle>
                <CardDescription>Dokumen yang perlu ditinjau</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-xl font-semibold">{curriculumOverview.pendingApprovals} Dokumen</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Klik tab Persetujuan untuk melihat</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Kurikulum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Total Mata Pelajaran</span>
                    <span>{curriculumOverview.subjects}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Total Dokumen</span>
                    <span>{curriculumOverview.documents}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Silabus Lengkap</span>
                    <span>10/12</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">RPP Lengkap</span>
                    <span>32/48</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Status Implementasi</span>
                    <Badge className="bg-amber-500">Sedang Berlangsung</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kemajuan Kurikulum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-muted rounded-md">
                  <div className="text-center">
                    <BarChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Grafik kemajuan kurikulum akan ditampilkan di sini
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium">Kelas 7</p>
                    <p className="text-xl font-bold text-green-600">72%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Kelas 8</p>
                    <p className="text-xl font-bold text-amber-600">65%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Kelas 9</p>
                    <p className="text-xl font-bold text-blue-600">70%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mata Pelajaran</CardTitle>
              <CardDescription>Daftar mata pelajaran dalam kurikulum</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => (
                  <Card key={subject.id} className="overflow-hidden border border-border/50">
                    <div className={`h-2 ${subject.status === "Aktif" ? "bg-green-500" : "bg-amber-500"}`} />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {subject.name}
                        <Badge variant={subject.status === "Aktif" ? "default" : "secondary"}>{subject.status}</Badge>
                      </CardTitle>
                      <CardDescription>Kelas {subject.grade}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progres</span>
                          <span className="font-medium">{subject.completionRate}%</span>
                        </div>
                        <Progress value={subject.completionRate} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Guru Pengajar:</span>
                        <span>{subject.teachers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Terakhir Diperbarui:</span>
                        <span>{subject.lastUpdated}</span>
                      </div>
                      <div className="pt-2 flex gap-2">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/dashboard/headmaster/curriculum/subjects/${subject.id}`}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Detail
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dokumen Menunggu Persetujuan</CardTitle>
              <CardDescription>Dokumen yang memerlukan persetujuan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {item.type === "RPP" ? (
                            <FileText className="h-5 w-5 text-blue-500" />
                          ) : item.type === "Silabus" ? (
                            <BookOpen className="h-5 w-5 text-green-500" />
                          ) : (
                            <Calendar className="h-5 w-5 text-purple-500" />
                          )}
                          <h3 className="text-base font-medium truncate">{item.title}</h3>
                        </div>
                        <div className="mt-1 grid grid-cols-2 text-sm text-muted-foreground">
                          <span>Guru: {item.teacher}</span>
                          <span>Tanggal: {item.submittedDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Badge variant="outline">{item.type}</Badge>
                        <Button size="sm" variant="outline">
                          Tolak
                        </Button>
                        <Button size="sm">Setujui</Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {pendingApprovals.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Tidak ada dokumen yang menunggu persetujuan</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

