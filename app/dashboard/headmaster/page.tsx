"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, School, FileText, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

// Import the component with dynamic to avoid SSR issues
const RadialGradientBackground = dynamic(() => import("@/components/RadialGradientBackground"), { ssr: false })

// Mock data
const stats = {
  totalTeachers: 42,
  activeTeachers: 38,
  totalOperators: 5,
  activeOperators: 5,
  totalStudents: 850,
  activeStudents: 842,
  totalClasses: 28,
}

export default function HeadmasterDashboard() {
  const [isPremium, setIsPremium] = useState(true)

  if (!isPremium) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Fitur Premium</h1>
          <p className="text-gray-600 mb-6">
            Fitur Kepala Sekolah hanya tersedia untuk akun premium. Silakan upgrade akun Anda untuk mengakses fitur ini.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/#pricing">Upgrade Sekarang</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent opacity-70 z-0" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard Kepala Sekolah</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTeachers}</div>
                <p className="text-xs text-muted-foreground mt-2">{stats.activeTeachers} guru aktif</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Operator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOperators}</div>
                <p className="text-xs text-muted-foreground mt-2">{stats.activeOperators} operator aktif</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground mt-2">Dari semua kelas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClasses}</div>
                <p className="text-xs text-muted-foreground mt-2">Semua tingkatan</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto flex flex-col gap-2 p-4" asChild>
                    <Link href="/dashboard/headmaster/teachers">
                      <Users className="h-5 w-5" />
                      <span>Lihat Guru</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col gap-2 p-4" asChild>
                    <Link href="/dashboard/headmaster/reports">
                      <FileText className="h-5 w-5" />
                      <span>Laporan</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col gap-2 p-4" asChild>
                    <Link href="/dashboard/headmaster/calendar">
                      <Calendar className="h-5 w-5" />
                      <span>Jadwal</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col gap-2 p-4" asChild>
                    <Link href="/dashboard/headmaster/school-info">
                      <School className="h-5 w-5" />
                      <span>Sekolah</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Selamat datang di dashboard Kepala Sekolah. Di sini Anda dapat melihat informasi penting tentang
                  sekolah Anda.
                </p>
                <Button asChild>
                  <Link href="/dashboard/headmaster/analytics">Lihat Analitik Lengkap</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

