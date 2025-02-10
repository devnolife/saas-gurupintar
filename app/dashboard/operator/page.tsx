"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, BookOpen, FileText, Search } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Teacher {
  id: number
  name: string
  subject: string
  classCount: number
}

const mockTeachers: Teacher[] = [
  { id: 1, name: "Budi Santoso", subject: "Matematika", classCount: 5 },
  { id: 2, name: "Siti Rahayu", subject: "Bahasa Indonesia", classCount: 4 },
  { id: 3, name: "Ahmad Hidayat", subject: "Fisika", classCount: 3 },
  { id: 4, name: "Dewi Lestari", subject: "Biologi", classCount: 4 },
  { id: 5, name: "Eko Prasetyo", subject: "Kimia", classCount: 3 },
]

export default function OperatorDashboardPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setTeachers(mockTeachers)
  }, [])

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalTeachers = teachers.length
  const totalClasses = teachers.reduce((sum, teacher) => sum + teacher.classCount, 0)
  const totalSubjects = new Set(teachers.map((teacher) => teacher.subject)).size

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Operator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClasses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mata Pelajaran</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubjects}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Daftar Guru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari guru atau mata pelajaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableCaption>Daftar guru terdaftar</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Guru</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Jumlah Kelas</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.classCount}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Guru Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teacherName">Nama Guru</Label>
                <Input id="teacherName" placeholder="Masukkan nama guru" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Mata Pelajaran</Label>
                <Input id="subject" placeholder="Masukkan mata pelajaran" />
              </div>
            </div>
            <Button type="submit">Tambah Guru</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

