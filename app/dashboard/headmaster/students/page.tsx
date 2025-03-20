"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Plus, Filter } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for students
const students = [
  {
    id: 1,
    name: "Andi Setiawan",
    grade: "9",
    class: "A",
    status: "Aktif",
    attendance: "95%",
    average: "85.7",
    parentName: "Budi Setiawan",
  },
  {
    id: 2,
    name: "Maya Putri",
    grade: "8",
    class: "B",
    status: "Aktif",
    attendance: "98%",
    average: "92.3",
    parentName: "Siti Rahayu",
  },
  {
    id: 3,
    name: "Dani Pratama",
    grade: "7",
    class: "C",
    status: "Aktif",
    attendance: "90%",
    average: "78.5",
    parentName: "Joko Pratama",
  },
  {
    id: 4,
    name: "Lina Kusuma",
    grade: "9",
    class: "A",
    status: "Aktif",
    attendance: "93%",
    average: "88.2",
    parentName: "Dewi Kusuma",
  },
  {
    id: 5,
    name: "Reza Firmansyah",
    grade: "8",
    class: "A",
    status: "Sakit",
    attendance: "87%",
    average: "81.4",
    parentName: "Ahmad Firmansyah",
  },
  {
    id: 6,
    name: "Dina Safitri",
    grade: "7",
    class: "B",
    status: "Aktif",
    attendance: "96%",
    average: "90.8",
    parentName: "Rina Safitri",
  },
  {
    id: 7,
    name: "Bayu Pratama",
    grade: "9",
    class: "B",
    status: "Izin",
    attendance: "91%",
    average: "83.6",
    parentName: "Agus Pratama",
  },
  {
    id: 8,
    name: "Putri Anggraini",
    grade: "7",
    class: "A",
    status: "Aktif",
    attendance: "97%",
    average: "89.4",
    parentName: "Ratna Anggraini",
  },
]

export default function HeadmasterStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGrade, setFilterGrade] = useState("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGrade = filterGrade === "all" || student.grade === filterGrade

    return matchesSearch && matchesGrade
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">Daftar Siswa</h1>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari siswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterGrade("all")}>Semua Kelas</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterGrade("7")}>Kelas 7</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterGrade("8")}>Kelas 8</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterGrade("9")}>Kelas 9</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Siswa
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Statistik Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary">Total Siswa</h3>
              <p className="text-3xl font-bold">{students.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-700">Kehadiran Rata-rata</h3>
              <p className="text-3xl font-bold">94%</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-700">Nilai Rata-rata</h3>
              <p className="text-3xl font-bold">86.2</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-700">Prestasi</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Siswa {filterGrade !== "all" ? `Kelas ${filterGrade}` : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Kehadiran</TableHead>
                <TableHead>Rata-rata Nilai</TableHead>
                <TableHead>Nama Orang Tua</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    {student.grade}-{student.class}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "Aktif"
                          ? "default"
                          : student.status === "Sakit"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.attendance}</TableCell>
                  <TableCell>{student.average}</TableCell>
                  <TableCell>{student.parentName}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/headmaster/students/${student.id}`}>
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

