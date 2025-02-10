"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Search } from "lucide-react"

interface Lesson {
  id: number
  subject: string
  theme: string
  grade: string
  lastUpdated: string
}

const mockLessons: Lesson[] = [
  { id: 1, subject: "Matematika", theme: "Penjumlahan dan Pengurangan", grade: "1", lastUpdated: "2023-06-01" },
  { id: 2, subject: "Bahasa Indonesia", theme: "Membaca Permulaan", grade: "1", lastUpdated: "2023-06-02" },
  { id: 3, subject: "IPA", theme: "Mengenal Hewan", grade: "2", lastUpdated: "2023-06-03" },
  { id: 4, subject: "IPS", theme: "Keluargaku", grade: "1", lastUpdated: "2023-06-04" },
  { id: 5, subject: "Matematika", theme: "Perkalian Dasar", grade: "3", lastUpdated: "2023-06-05" },
]

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons)
  const [searchTerm, setSearchTerm] = useState("")
  const [newLesson, setNewLesson] = useState({ subject: "", theme: "", grade: "" })

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...lessons.map((l) => l.id)) + 1
    const lesson: Lesson = {
      ...newLesson,
      id: newId,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setLessons([...lessons, lesson])
    setNewLesson({ subject: "", theme: "", grade: "" })
  }

  const handleDeleteLesson = (id: number) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Rencana Pembelajaran</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tambah Rencana Pembelajaran Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddLesson} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Mata Pelajaran</Label>
                <Input
                  id="subject"
                  value={newLesson.subject}
                  onChange={(e) => setNewLesson({ ...newLesson, subject: e.target.value })}
                  placeholder="Masukkan nama mata pelajaran"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Input
                  id="theme"
                  value={newLesson.theme}
                  onChange={(e) => setNewLesson({ ...newLesson, theme: e.target.value })}
                  placeholder="Masukkan tema pembelajaran"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Kelas</Label>
                <Select
                  value={newLesson.grade}
                  onValueChange={(value) => setNewLesson({ ...newLesson, grade: value })}
                  required
                >
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((gradeNum) => (
                      <SelectItem key={gradeNum} value={gradeNum.toString()}>
                        Kelas {gradeNum}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Rencana Pembelajaran
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Rencana Pembelajaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari rencana pembelajaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableCaption>Daftar rencana pembelajaran yang telah dibuat</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Tema</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Terakhir Diperbarui</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell>{lesson.subject}</TableCell>
                  <TableCell>{lesson.theme}</TableCell>
                  <TableCell>{lesson.grade}</TableCell>
                  <TableCell>{lesson.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteLesson(lesson.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
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

