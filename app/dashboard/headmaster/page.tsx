"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, School, FileText, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

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
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true)

    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Don't render anything on server side
  if (!isClient) {
    return null
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-[250px] mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-[120px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-[60px] mb-2" />
                  <Skeleton className="h-4 w-[100px]" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    )
  }

  return (
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
              Selamat datang di dashboard Kepala Sekolah. Di sini Anda dapat melihat informasi penting tentang sekolah
              Anda.
            </p>
            <Button asChild>
              <Link href="/dashboard/headmaster/analytics">Lihat Analitik Lengkap</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

