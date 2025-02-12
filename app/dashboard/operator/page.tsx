"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, FileText, Search } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for charts
const activityData = [
  { month: "Jan", teachers: 40, classes: 120 },
  { month: "Feb", teachers: 45, classes: 130 },
  { month: "Mar", teachers: 50, classes: 140 },
  { month: "Apr", teachers: 48, classes: 135 },
  { month: "May", teachers: 52, classes: 145 },
  { month: "Jun", teachers: 55, classes: 150 },
  { month: "Jul", teachers: 58, classes: 155 },
]

// Dummy data for recent activities
const recentActivities = [
  { id: 1, action: "Guru baru ditambahkan", user: "Admin", timestamp: "2023-06-10 09:30" },
  { id: 2, action: "Kelas baru dibuat", user: "Budi Santoso", timestamp: "2023-06-09 14:45" },
  { id: 3, action: "Laporan bulanan dihasilkan", user: "Sistem", timestamp: "2023-06-08 00:01" },
  { id: 4, action: "Pengaturan diperbarui", user: "Admin", timestamp: "2023-06-07 11:20" },
  { id: 5, action: "Guru dinonaktifkan", user: "Admin", timestamp: "2023-06-06 16:15" },
]

export default function OperatorDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredActivities = recentActivities.filter(
    (activity) =>
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dasbor Operator</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58</div>
            <p className="text-xs text-muted-foreground">+3 bulan ini</p>
            <Progress value={58} max={100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kelas Aktif</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">155</div>
            <p className="text-xs text-muted-foreground">+5 bulan ini</p>
            <Progress value={155} max={200} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laporan Dihasilkan</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
            <Progress value={28} max={30} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="teachers" stroke="#8884d8" name="Guru" />
                  <Line yAxisId="right" type="monotone" dataKey="classes" stroke="#82ca9d" name="Kelas" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari aktivitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableCaption>Daftar aktivitas terbaru</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Aksi</TableHead>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tindakan Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button>Tambah Guru</Button>
            <Button>Buat Kelas Baru</Button>
            <Button>Hasilkan Laporan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
