"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for teachers
const teachers = [
  {
    id: 1,
    name: "Budi Santoso",
    subject: "Matematika",
    class: "7A, 8B, 9C",
    status: "Aktif",
    documentsCreated: 45,
    lastActive: "2023-07-10",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    subject: "Bahasa Indonesia",
    class: "7B, 8A",
    status: "Aktif",
    documentsCreated: 32,
    lastActive: "2023-07-09",
  },
  {
    id: 3,
    name: "Ahmad Hidayat",
    subject: "IPA",
    class: "9A, 9B",
    status: "Aktif",
    documentsCreated: 28,
    lastActive: "2023-07-08",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    subject: "IPS",
    class: "7C, 8C",
    status: "Cuti",
    documentsCreated: 15,
    lastActive: "2023-06-30",
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    subject: "Bahasa Inggris",
    class: "7A, 8A, 9A",
    status: "Aktif",
    documentsCreated: 37,
    lastActive: "2023-07-07",
  },
]

export default function HeadmasterTeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">Daftar Guru</h1>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari guru..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Guru
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Statistik Guru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary">Total Guru</h3>
              <p className="text-3xl font-bold">{teachers.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-700">Guru Aktif</h3>
              <p className="text-3xl font-bold">{teachers.filter((t) => t.status === "Aktif").length}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-700">Guru Cuti</h3>
              <p className="text-3xl font-bold">{teachers.filter((t) => t.status === "Cuti").length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Daftar Guru</CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari guru..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 w-full sm:w-[250px] rounded-full"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 rounded-full">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button> */}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dokumen Dibuat</TableHead>
                <TableHead>Terakhir Aktif</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.class}</TableCell>
                  <TableCell>
                    <Badge variant={teacher.status === "Aktif" ? "default" : "secondary"}>{teacher.status}</Badge>
                  </TableCell>
                  <TableCell>{teacher.documentsCreated}</TableCell>
                  <TableCell>{teacher.lastActive}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/headmaster/teachers/${teacher.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Detail
                      </Link>
                    </Button>
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

