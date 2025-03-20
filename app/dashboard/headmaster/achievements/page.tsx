"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Award, Trophy, Medal, Calendar, FileUp, User, School } from "lucide-react"
import Image from "next/image"

// Mock data for achievements
const schoolAchievements = [
  {
    id: 1,
    title: "Juara 1 Lomba Kebersihan Sekolah",
    level: "Kabupaten",
    date: "2023-08-15",
    organizer: "Dinas Pendidikan Kabupaten",
    category: "Sekolah",
    participants: ["Tim Kebersihan Sekolah"],
    coach: "Ahmad Hidayat",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Juara 2 Lomba Sekolah Sehat",
    level: "Provinsi",
    date: "2023-06-22",
    organizer: "Dinas Pendidikan Provinsi",
    category: "Sekolah",
    participants: ["Tim UKS Sekolah"],
    coach: "Dewi Lestari",
    image: "/placeholder.svg",
  },
]

const studentAchievements = [
  {
    id: 1,
    title: "Juara 1 Olimpiade Matematika",
    level: "Nasional",
    date: "2023-09-10",
    organizer: "Kementerian Pendidikan",
    category: "Akademik",
    participants: ["Andi Setiawan"],
    coach: "Budi Santoso",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Juara 2 Lomba Menulis Cerpen",
    level: "Provinsi",
    date: "2023-07-18",
    organizer: "Dinas Pendidikan Provinsi",
    category: "Akademik",
    participants: ["Maya Putri"],
    coach: "Siti Rahayu",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Juara 1 Lomba Catur",
    level: "Kabupaten",
    date: "2023-08-05",
    organizer: "KONI Kabupaten",
    category: "Olahraga",
    participants: ["Dani Pratama"],
    coach: "Eko Prasetyo",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Juara 3 Lomba Karya Ilmiah Remaja",
    level: "Provinsi",
    date: "2023-07-28",
    organizer: "LIPI",
    category: "Akademik",
    participants: ["Lina Kusuma", "Reza Firmansyah"],
    coach: "Ahmad Hidayat",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Juara 1 Lomba Baca Puisi",
    level: "Kabupaten",
    date: "2023-08-12",
    organizer: "Dinas Pendidikan Kabupaten",
    category: "Seni",
    participants: ["Dina Safitri"],
    coach: "Siti Rahayu",
    image: "/placeholder.svg",
  },
]

const teacherAchievements = [
  {
    id: 1,
    title: "Guru Teladan",
    level: "Kabupaten",
    date: "2023-08-20",
    organizer: "Dinas Pendidikan Kabupaten",
    category: "Pendidikan",
    participants: ["Budi Santoso"],
    coach: "-",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Penulis Buku Ajar Terbaik",
    level: "Provinsi",
    date: "2023-05-15",
    organizer: "Dinas Pendidikan Provinsi",
    category: "Literasi",
    participants: ["Siti Rahayu"],
    coach: "-",
    image: "/placeholder.svg",
  },
]

export default function HeadmasterAchievementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter function for achievements based on search and category
  const filterAchievements = (achievements: any[]) => {
    return achievements.filter((achievement) => {
      const matchesSearch =
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.participants.some((p: string) => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
        achievement.coach.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" || achievement.category.toLowerCase() === selectedCategory.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }

  // Filtered achievements
  const filteredStudentAchievements = filterAchievements(studentAchievements)
  const filteredTeacherAchievements = filterAchievements(teacherAchievements)
  const filteredSchoolAchievements = filterAchievements(schoolAchievements)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">Prestasi Sekolah</h1>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Prestasi
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ringkasan Prestasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-primary">Total Prestasi</h3>
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold">
                {studentAchievements.length + teacherAchievements.length + schoolAchievements.length}
              </p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-orange-700">Prestasi Siswa</h3>
                <User className="h-6 w-6 text-orange-700" />
              </div>
              <p className="text-3xl font-bold">{studentAchievements.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-green-700">Prestasi Guru</h3>
                <Award className="h-6 w-6 text-green-700" />
              </div>
              <p className="text-3xl font-bold">{teacherAchievements.length}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-blue-700">Prestasi Sekolah</h3>
                <School className="h-6 w-6 text-blue-700" />
              </div>
              <p className="text-3xl font-bold">{schoolAchievements.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari prestasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            Semua
          </Button>
          <Button
            variant={selectedCategory === "Akademik" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("Akademik")}
          >
            Akademik
          </Button>
          <Button
            variant={selectedCategory === "Olahraga" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("Olahraga")}
          >
            Olahraga
          </Button>
          <Button
            variant={selectedCategory === "Seni" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("Seni")}
          >
            Seni
          </Button>
          <Button
            variant={selectedCategory === "Sekolah" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("Sekolah")}
          >
            Sekolah
          </Button>
          <Button
            variant={selectedCategory === "Pendidikan" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("Pendidikan")}
          >
            Pendidikan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="student" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="student">Prestasi Siswa</TabsTrigger>
          <TabsTrigger value="teacher">Prestasi Guru</TabsTrigger>
          <TabsTrigger value="school">Prestasi Sekolah</TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="space-y-6">
          {filteredStudentAchievements.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Medal className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">Tidak ada prestasi yang ditemukan</p>
                <Button className="mt-4">Tambah Prestasi Siswa</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudentAchievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={achievement.image || "/placeholder.svg"}
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="default">{achievement.level}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {achievement.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Peserta:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {achievement.participants.map((participant, index) => (
                          <Badge key={index} variant="outline">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Pembina:</p>
                        <p className="text-muted-foreground">{achievement.coach}</p>
                      </div>
                      <div>
                        <p className="font-medium">Kategori:</p>
                        <p className="text-muted-foreground">{achievement.category}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 text-sm">
                      <p className="font-medium">Penyelenggara:</p>
                      <p className="text-muted-foreground">{achievement.organizer}</p>
                    </div>
                    <div className="pt-2 flex gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileUp className="h-3.5 w-3.5 mr-1" />
                        Upload Sertifikat
                      </Button>
                      <Button size="sm" className="w-full">
                        Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="teacher" className="space-y-6">
          {filteredTeacherAchievements.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Medal className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">Tidak ada prestasi yang ditemukan</p>
                <Button className="mt-4">Tambah Prestasi Guru</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeacherAchievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={achievement.image || "/placeholder.svg"}
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="default">{achievement.level}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {achievement.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Guru:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {achievement.participants.map((participant, index) => (
                          <Badge key={index} variant="outline">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 text-sm">
                      <p className="font-medium">Kategori:</p>
                      <p className="text-muted-foreground">{achievement.category}</p>
                    </div>
                    <div className="grid grid-cols-1 text-sm">
                      <p className="font-medium">Penyelenggara:</p>
                      <p className="text-muted-foreground">{achievement.organizer}</p>
                    </div>
                    <div className="pt-2 flex gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileUp className="h-3.5 w-3.5 mr-1" />
                        Upload Sertifikat
                      </Button>
                      <Button size="sm" className="w-full">
                        Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="school" className="space-y-6">
          {filteredSchoolAchievements.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Medal className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">Tidak ada prestasi yang ditemukan</p>
                <Button className="mt-4">Tambah Prestasi Sekolah</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSchoolAchievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="aspect-square relative md:h-full">
                      <Image
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <Badge variant="default">{achievement.level}</Badge>
                        </div>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {achievement.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">Tim:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {achievement.participants.map((participant, index) => (
                              <Badge key={index} variant="outline">
                                {participant}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="font-medium">Penanggung Jawab:</p>
                            <p className="text-muted-foreground">{achievement.coach}</p>
                          </div>
                          <div>
                            <p className="font-medium">Kategori:</p>
                            <p className="text-muted-foreground">{achievement.category}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 text-sm">
                          <p className="font-medium">Penyelenggara:</p>
                          <p className="text-muted-foreground">{achievement.organizer}</p>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <FileUp className="h-3.5 w-3.5 mr-1" />
                            Upload Dokumentasi
                          </Button>
                          <Button size="sm" className="w-full">
                            Detail
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

