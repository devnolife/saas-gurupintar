"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { School, Users, FileText, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Dummy data for generated documents
const dummyDocuments = [
  { id: 1, guruName: "Budi Santoso", subject: "Matematika", createdAt: "2023-06-01", linkToDocument: "/doc1" },
  { id: 2, guruName: "Siti Rahayu", subject: "Bahasa Indonesia", createdAt: "2023-06-02", linkToDocument: "/doc2" },
  { id: 3, guruName: "Ahmad Hidayat", subject: "IPA", createdAt: "2023-06-03", linkToDocument: "/doc3" },
  { id: 4, guruName: "Dewi Lestari", subject: "IPS", createdAt: "2023-06-04", linkToDocument: "/doc4" },
  { id: 5, guruName: "Eko Prasetyo", subject: "Bahasa Inggris", createdAt: "2023-06-05", linkToDocument: "/doc5" },
]

export default function AdminDashboardPage() {
  const [documents, setDocuments] = useState(dummyDocuments)
  const [searchTerm, setSearchTerm] = useState("")

  // Usage statistics
  const totalGenerated = 100
  const totalQuota = 500
  const remainingQuota = totalQuota - totalGenerated

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.guruName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dokumen Dibuat</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGenerated}</div>
            <Progress value={(totalGenerated / totalQuota) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Sisa kuota: {remainingQuota} dari {totalQuota}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mata Pelajaran</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(documents.map((doc) => doc.subject)).size}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Dokumen yang Telah Dibuat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari berdasarkan nama guru atau mata pelajaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableCaption>Daftar dokumen yang telah dibuat oleh guru</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Guru</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Tanggal Pembuatan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.guruName}</TableCell>
                  <TableCell>{doc.subject}</TableCell>
                  <TableCell>{doc.createdAt}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Lihat Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Detail Dokumen</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p>
                            <strong>Nama Guru:</strong> {doc.guruName}
                          </p>
                          <p>
                            <strong>Mata Pelajaran:</strong> {doc.subject}
                          </p>
                          <p>
                            <strong>Tanggal Pembuatan:</strong> {doc.createdAt}
                          </p>
                          <p>
                            <strong>Link Dokumen:</strong>{" "}
                            <a href={doc.linkToDocument} className="text-blue-500 hover:underline">
                              Lihat Dokumen
                            </a>
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
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

