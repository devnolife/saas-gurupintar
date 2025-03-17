"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Book, Clock, Award } from "lucide-react"

interface StudentUser {
  name: string
  class: string
  school: string
}

export default function StudentDashboardPage() {
  const [user, setUser] = useState<StudentUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would fetch the user data from your state management solution or local storage
    const fakeUser = { name: "Andi Pratama", class: "12A", school: "SMA Negeri 1 Jakarta" }
    setUser(fakeUser)
  }, [])

  const handleLogout = () => {
    // In a real application, you would clear the user data from your state management solution or local storage
    router.push("/login")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Selamat Datang, {user.name}!</h1>
            <p className="text-gray-600">
              Kelas {user.class} - {user.school}
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="bg-white hover:bg-gray-100">
            Keluar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jadwal Hari Ini</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Pelajaran</div>
              <p className="text-xs text-muted-foreground">Matematika, Bahasa Indonesia, ...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tugas Menunggu</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Tugas</div>
              <p className="text-xs text-muted-foreground">Fisika, Biologi, Sejarah</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waktu Belajar</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 Jam</div>
              <p className="text-xs text-muted-foreground">Minggu ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pencapaian</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Lencana</div>
              <p className="text-xs text-muted-foreground">Diperoleh bulan ini</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Mengumpulkan tugas Matematika</span>
                <span className="text-sm text-muted-foreground">2 jam yang lalu</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Mengikuti kuis Bahasa Inggris</span>
                <span className="text-sm text-muted-foreground">Kemarin</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Menyelesaikan modul Fisika</span>
                <span className="text-sm text-muted-foreground">2 hari yang lalu</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

