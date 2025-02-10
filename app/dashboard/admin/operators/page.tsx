"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Search } from "lucide-react"

interface Operator {
  id: number
  name: string
  email: string
  school: string
  status: "active" | "inactive"
}

const mockOperators: Operator[] = [
  { id: 1, name: "John Doe", email: "john@example.com", school: "SMA Negeri 1 Jakarta", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", school: "SMA Negeri 2 Surabaya", status: "active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", school: "SMA Negeri 3 Bandung", status: "inactive" },
]

export default function OperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>(mockOperators)
  const [searchTerm, setSearchTerm] = useState("")
  const [newOperator, setNewOperator] = useState({ name: "", email: "", school: "" })

  const filteredOperators = operators.filter(
    (operator) =>
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.school.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddOperator = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...operators.map((o) => o.id)) + 1
    const operator: Operator = {
      ...newOperator,
      id: newId,
      status: "active",
    }
    setOperators([...operators, operator])
    setNewOperator({ name: "", email: "", school: "" })
  }

  const handleDeleteOperator = (id: number) => {
    setOperators(operators.filter((operator) => operator.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manajemen Operator</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tambah Operator Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddOperator} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={newOperator.name}
                  onChange={(e) => setNewOperator({ ...newOperator, name: e.target.value })}
                  placeholder="Masukkan nama operator"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newOperator.email}
                  onChange={(e) => setNewOperator({ ...newOperator, email: e.target.value })}
                  placeholder="Masukkan email operator"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">Sekolah</Label>
                <Input
                  id="school"
                  value={newOperator.school}
                  onChange={(e) => setNewOperator({ ...newOperator, school: e.target.value })}
                  placeholder="Masukkan nama sekolah"
                  required
                />
              </div>
            </div>
            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Operator
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Operator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari operator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableCaption>Daftar operator terdaftar</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Sekolah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOperators.map((operator) => (
                <TableRow key={operator.id}>
                  <TableCell>{operator.name}</TableCell>
                  <TableCell>{operator.email}</TableCell>
                  <TableCell>{operator.school}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        operator.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {operator.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteOperator(operator.id)}>
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

