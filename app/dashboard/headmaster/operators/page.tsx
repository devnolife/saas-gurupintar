"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for operators
const operators = [
  {
    id: 1,
    name: "Joko Widodo",
    role: "Admin Operator",
    department: "Kurikulum",
    status: "Aktif",
    teachersManaged: 15,
    lastActive: "2023-07-10",
  },
  {
    id: 2,
    name: "Megawati Soekarno",
    role: "Data Operator",
    department: "Kesiswaan",
    status: "Aktif",
    teachersManaged: 10,
    lastActive: "2023-07-09",
  },
  {
    id: 3,
    name: "Susilo Bambang",
    role: "Admin Operator",
    department: "Sarana Prasarana",
    status: "Cuti",
    teachersManaged: 0,
    lastActive: "2023-06-30",
  },
]

export default function HeadmasterOperatorsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOperators = operators.filter(
    (operator) =>
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">Daftar Operator</h1>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari operator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Operator
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Statistik Operator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary">Total Operator</h3>
              <p className="text-3xl font-bold">{operators.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-700">Operator Aktif</h3>
              <p className="text-3xl font-bold">{operators.filter((o) => o.status === "Aktif").length}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-700">Operator Cuti</h3>
              <p className="text-3xl font-bold">{operators.filter((o) => o.status === "Cuti").length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Daftar Operator</CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari operator..."
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
                <TableHead>Peran</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Guru Dikelola</TableHead>
                <TableHead>Terakhir Aktif</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOperators.map((operator) => (
                <TableRow key={operator.id}>
                  <TableCell className="font-medium">{operator.name}</TableCell>
                  <TableCell>{operator.role}</TableCell>
                  <TableCell>{operator.department}</TableCell>
                  <TableCell>
                    <Badge variant={operator.status === "Aktif" ? "default" : "secondary"}>{operator.status}</Badge>
                  </TableCell>
                  <TableCell>{operator.teachersManaged}</TableCell>
                  <TableCell>{operator.lastActive}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/headmaster/operators/${operator.id}`}>
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

