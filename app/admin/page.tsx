"use client"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Users, BookOpen, Award, TrendingUp } from "lucide-react"

const data = [
  { name: "Jan", users: 400, materials: 240, certifications: 100 },
  { name: "Feb", users: 300, materials: 139, certifications: 80 },
  { name: "Mar", users: 200, materials: 980, certifications: 200 },
  { name: "Apr", users: 278, materials: 390, certifications: 150 },
  { name: "May", users: 189, materials: 480, certifications: 120 },
  { name: "Jun", users: 239, materials: 380, certifications: 110 },
]

const stats = [
  { title: "Total Pengguna", value: "5,423", icon: Users, color: "text-blue-600" },
  { title: "Materi Tersedia", value: "1,234", icon: BookOpen, color: "text-green-600" },
  { title: "Sertifikasi Diberikan", value: "892", icon: Award, color: "text-yellow-600" },
  { title: "Pertumbuhan Bulanan", value: "12.5%", icon: TrendingUp, color: "text-purple-600" },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Statistik Bulanan</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" name="Pengguna" />
              <Bar dataKey="materials" fill="#22c55e" name="Materi" />
              <Bar dataKey="certifications" fill="#eab308" name="Sertifikasi" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

