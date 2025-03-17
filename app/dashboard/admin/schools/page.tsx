"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Search } from "lucide-react"

interface School {
  id: number
  name: string
  address: string
  principalName: string
  studentCount: number
}

const mockSchools: School[] = [
  {
    id: 1,
    name: "SMA Negeri 1 Jakarta",
    address: "Jl. Budi Utomo No.7, Jakarta Pusat",
    principalName: "Dr. Siti Aminah",
    studentCount: 1200,
  },
  {
    id: 2,
    name: "SMA Negeri 2 Surabaya",
    address: "Jl. Wijaya Kusuma No.48, Surabaya",
    principalName: "Drs. Budi Santoso",
    studentCount: 1000,
  },
  {
    id: 3,
    name: "SMA Negeri 3 Bandung",
    address: "Jl. Belitung No.8, Bandung",
    principalName: "Prof. Ahmad Hidayat",
    studentCount: 950,
  },
]

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>(mockSchools)
  const [searchTerm, setSearchTerm] = useState("")
  const [newSchool, setNewSchool] = useState({ name: "", address: "", principalName: "", studentCount: 0 })

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.principalName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...schools.map((s) => s.id)) + 1
    const school: School = {
      ...newSchool,
      id: newId,
    }
    setSchools([...schools, school])
    setNewSchool({ name: "", address: "", principalName: "", studentCount: 0 })
  }

  const handleDeleteSchool = (id: number) => {
    setSchools(schools.filter((school) => school.id !== id))
  }

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-3xl font-bold mb-8">Manajemen Sekolah</h1>

      <Card className="mb-8 shadow-sm border-none">
        <CardHeader>
          <CardTitle>Tambah Sekolah Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSchool} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Sekolah</Label>
                <Input
                  id="name"
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                  placeholder="Masukkan nama sekolah"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  value={newSchool.address}
                  onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })}
                  placeholder="Masukkan alamat sekolah"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="principalName">Nama Kepala Sekolah</Label>
                <Input
                  id="principalName"
                  value={newSchool.principalName}
                  onChange={(e) => setNewSchool({ ...newSchool, principalName: e.target.value })}
                  placeholder="Masukkan nama kepala sekolah"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentCount">Jumlah Siswa</Label>
                <Input
                  id="studentCount"
                  type="number"
                  value={newSchool.studentCount}
                  onChange={(e) => setNewSchool({ ...newSchool, studentCount: Number.parseInt(e.target.value) })}
                  placeholder="Masukkan jumlah siswa"
                  required
                />
              </div>
            </div>
            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Sekolah
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle>Daftar Sekolah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari sekolah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableCaption>Daftar sekolah terdaftar</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Sekolah</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Kepala Sekolah</TableHead>
                <TableHead>Jumlah Siswa</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>{school.name}</TableCell>
                  <TableCell>{school.address}</TableCell>
                  <TableCell>{school.principalName}</TableCell>
                  <TableCell>{school.studentCount}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteSchool(school.id)}>
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

