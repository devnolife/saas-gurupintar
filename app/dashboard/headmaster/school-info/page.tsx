"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Award,
  Clock,
  Edit,
  Download,
  Share2,
  Printer,
  FileText,
  Image,
  Library,
  Utensils,
  Dumbbell,
  Microscope,
  Music,
  Laptop,
} from "lucide-react"

// Mock data for school information
const schoolData = {
  basic: {
    name: "SMA Negeri 1 Teladan",
    address: "Jl. Pendidikan No. 123, Jakarta Pusat",
    phone: "(021) 5551234",
    email: "info@sman1teladan.sch.id",
    website: "www.sman1teladan.sch.id",
    established: "1975",
    accreditation: "A",
    principal: "Dr. Hadi Wijaya, M.Pd.",
    operationalHours: "Senin-Jumat, 07:00 - 15:30",
  },
  statistics: {
    students: 1250,
    teachers: 78,
    staff: 25,
    classes: 36,
    classrooms: 40,
    laboratories: 5,
    libraries: 1,
    sportsFacilities: 3,
    graduationRate: 98.5,
    universityAcceptanceRate: 92.3,
    nationalExamAverage: 85.7,
  },
  facilities: [
    { name: "Perpustakaan Digital", icon: <Library className="h-5 w-5" />, condition: "Sangat Baik" },
    { name: "Laboratorium Sains", icon: <Microscope className="h-5 w-5" />, condition: "Baik" },
    { name: "Laboratorium Komputer", icon: <Laptop className="h-5 w-5" />, condition: "Sangat Baik" },
    { name: "Ruang Musik", icon: <Music className="h-5 w-5" />, condition: "Baik" },
    { name: "Kantin", icon: <Utensils className="h-5 w-5" />, condition: "Baik" },
    { name: "Lapangan Olahraga", icon: <Dumbbell className="h-5 w-5" />, condition: "Perlu Perbaikan" },
  ],
  achievements: [
    { year: 2023, title: "Juara 1 Olimpiade Sains Nasional Bidang Fisika", level: "Nasional" },
    { year: 2023, title: "Juara 2 Kompetisi Robotik Tingkat Provinsi", level: "Provinsi" },
    { year: 2022, title: "Sekolah Adiwiyata Tingkat Nasional", level: "Nasional" },
    { year: 2022, title: "Juara 1 Lomba Debat Bahasa Inggris", level: "Provinsi" },
    { year: 2021, title: "Juara 3 Festival Seni Pelajar Nasional", level: "Nasional" },
  ],
  about: `
    SMA Negeri 1 Teladan didirikan pada tahun 1975 dan telah menjadi salah satu sekolah unggulan di Jakarta. 
    Dengan visi "Mewujudkan Generasi Unggul, Berkarakter, dan Berwawasan Global", sekolah ini berkomitmen untuk 
    memberikan pendidikan berkualitas tinggi yang mempersiapkan siswa untuk masa depan yang sukses.
    
    Sekolah ini telah meraih berbagai prestasi di tingkat kota, provinsi, dan nasional dalam bidang akademik 
    maupun non-akademik. Dengan fasilitas modern dan tenaga pengajar yang berkualitas, SMA Negeri 1 Teladan 
    terus berupaya meningkatkan kualitas pendidikan dan mengembangkan potensi siswa secara optimal.
    
    Program unggulan sekolah meliputi kelas akselerasi, program pertukaran pelajar internasional, dan 
    ekstrakurikuler yang beragam untuk mengembangkan bakat dan minat siswa.
  `,
}

export default function SchoolInfoPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Informasi Sekolah</h1>
          <p className="text-muted-foreground">Kelola dan lihat informasi lengkap tentang sekolah Anda</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Cetak</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Unduh PDF</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Bagikan</span>
          </Button>
          <Button size="sm" className="h-9 gap-1">
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Edit Informasi</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="facilities">Fasilitas</TabsTrigger>
          <TabsTrigger value="achievements">Prestasi</TabsTrigger>
          <TabsTrigger value="about">Tentang Sekolah</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Informasi Dasar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nama Sekolah</p>
                      <p className="font-medium">{schoolData.basic.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Alamat</p>
                      <p className="font-medium">{schoolData.basic.address}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telepon</p>
                        <p className="font-medium">{schoolData.basic.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{schoolData.basic.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <p className="font-medium">{schoolData.basic.website}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tahun Berdiri</p>
                        <p className="font-medium">{schoolData.basic.established}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Akreditasi</p>
                        <p className="font-medium">{schoolData.basic.accreditation}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Jam Operasional</p>
                        <p className="font-medium">{schoolData.basic.operationalHours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Statistik Sekolah
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary/5 p-4 rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{schoolData.statistics.students}</h3>
                    <p className="text-sm text-muted-foreground">Siswa</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{schoolData.statistics.teachers}</h3>
                    <p className="text-sm text-muted-foreground">Guru</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{schoolData.statistics.classes}</h3>
                    <p className="text-sm text-muted-foreground">Kelas</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Tingkat Kelulusan</span>
                      <span className="text-sm font-medium">{schoolData.statistics.graduationRate}%</span>
                    </div>
                    <Progress value={schoolData.statistics.graduationRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Tingkat Penerimaan Universitas</span>
                      <span className="text-sm font-medium">{schoolData.statistics.universityAcceptanceRate}%</span>
                    </div>
                    <Progress value={schoolData.statistics.universityAcceptanceRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Rata-rata Ujian Nasional</span>
                      <span className="text-sm font-medium">{schoolData.statistics.nationalExamAverage}%</span>
                    </div>
                    <Progress value={schoolData.statistics.nationalExamAverage} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                Galeri Sekolah
              </CardTitle>
              <CardDescription>Foto-foto terbaru dari lingkungan dan kegiatan sekolah</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-video rounded-lg bg-muted overflow-hidden">
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                Lihat Semua Foto
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Fasilitas Sekolah
              </CardTitle>
              <CardDescription>Daftar lengkap fasilitas yang tersedia di sekolah</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schoolData.facilities.map((facility, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-lg">{facility.icon}</div>
                        {facility.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Kondisi:</p>
                        <Badge
                          variant={
                            facility.condition === "Sangat Baik"
                              ? "default"
                              : facility.condition === "Baik"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {facility.condition}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                <Edit className="h-4 w-4 mr-2" />
                Perbarui Kondisi Fasilitas
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Prestasi Sekolah
              </CardTitle>
              <CardDescription>Daftar prestasi yang telah diraih oleh sekolah</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schoolData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border/50">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{achievement.year}</Badge>
                          <Badge>{achievement.level}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Lihat Semua Prestasi
              </Button>
              <Button size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Tambah Prestasi
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Tentang Sekolah
              </CardTitle>
              <CardDescription>Sejarah dan informasi lengkap tentang sekolah</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {schoolData.about.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                <Edit className="h-4 w-4 mr-2" />
                Edit Informasi
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

