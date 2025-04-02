"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTeacherFeatures } from "@/lib/teacherFeatureManager"
import { BookOpen, Calendar, ClipboardList, UserCheck, BadgeCheck } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboard() {
  const [mounted, setMounted] = useState(false)
  
  // In a real app, get this from auth context
  const teacherId = "teacher4" // Should match the ID in other components
  const { features, hasFeature, loading } = useTeacherFeatures(teacherId)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
          Selamat Datang, Guru
        </h1>
        <p className="text-muted-foreground mt-1">
          Akses semua fitur mengajar Anda dari satu tempat
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Jadwal Hari Ini</CardTitle>
            <CardDescription>Senin, 25 Maret 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Matematika Kelas 10A</p>
                  <p className="text-sm text-muted-foreground">08:00 - 09:30</p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">Sekarang</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Matematika Kelas 11B</p>
                  <p className="text-sm text-muted-foreground">10:00 - 11:30</p>
                </div>
                <span className="text-sm text-muted-foreground">1j 30m lagi</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Matematika Kelas 12A</p>
                  <p className="text-sm text-muted-foreground">13:00 - 14:30</p>
                </div>
                <span className="text-sm text-muted-foreground">4j 30m lagi</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/teacher/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                Lihat Jadwal Penuh
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>RPP Terbaru</CardTitle>
            <CardDescription>RPP yang baru dibuat atau diperbarui</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium">Matematika Kelas 10 - Persamaan Kuadrat</p>
                <p className="text-sm text-muted-foreground">Dibuat: 22 Maret 2024</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium">Matematika Kelas 11 - Turunan Fungsi</p>
                <p className="text-sm text-muted-foreground">Dibuat: 20 Maret 2024</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium">Matematika Kelas 12 - Integral</p>
                <p className="text-sm text-muted-foreground">Dibuat: 15 Maret 2024</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/teacher/lessons">
                <BookOpen className="mr-2 h-4 w-4" />
                Kelola RPP
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Aktivitas</CardTitle>
            <CardDescription>Ringkasan aktivitas terbaru Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-green-500" />
                  <p className="text-sm">Anda membuat RPP baru</p>
                </div>
                <p className="text-xs text-muted-foreground ml-6">Hari ini, 08:15</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-blue-500" />
                  <p className="text-sm">Absensi direkam untuk 10A</p>
                </div>
                <p className="text-xs text-muted-foreground ml-6">Hari ini, 08:05</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-purple-500" />
                  <p className="text-sm">Laporan harian diselesaikan</p>
                </div>
                <p className="text-xs text-muted-foreground ml-6">Kemarin, 15:30</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Mulai Aktivitas Baru
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Fitur Tersedia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Default RPP feature */}
          <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="default">Aktif</Badge>
            </div>
            <h3 className="font-medium text-lg mb-1">Pembuatan RPP & Soal Ujian</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Buat dan kelola rencana pembelajaran dan bank soal
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/teacher/lessons">Akses Fitur</Link>
            </Button>
          </div>
          
          {/* Attendance feature */}
          <div className={`p-4 rounded-lg border shadow-sm ${hasFeature('attendance') ? 'bg-card text-card-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-full ${hasFeature('attendance') ? 'bg-primary/10' : 'bg-muted'}`}>
                <UserCheck className={`h-5 w-5 ${hasFeature('attendance') ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <Badge variant={hasFeature('attendance') ? "default" : "outline"}>
                {hasFeature('attendance') ? 'Aktif' : 'Tidak Aktif'}
              </Badge>
            </div>
            <h3 className="font-medium text-lg mb-1">Sistem Absensi</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Sistem absensi otomatis untuk guru dan siswa
            </p>
            {hasFeature('attendance') ? (
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/teacher/attendance">Akses Fitur</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/pricing">Upgrade Paket</Link>
              </Button>
            )}
          </div>
          
          {/* Daily Reports feature */}
          <div className={`p-4 rounded-lg border shadow-sm ${hasFeature('daily_reports') ? 'bg-card text-card-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-full ${hasFeature('daily_reports') ? 'bg-primary/10' : 'bg-muted'}`}>
                <ClipboardList className={`h-5 w-5 ${hasFeature('daily_reports') ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <Badge variant={hasFeature('daily_reports') ? "default" : "outline"}>
                {hasFeature('daily_reports') ? 'Aktif' : 'Tidak Aktif'}
              </Badge>
            </div>
            <h3 className="font-medium text-lg mb-1">Laporan Kegiatan Harian</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Dokumentasikan aktivitas mengajar harian dengan mudah
            </p>
            {hasFeature('daily_reports') ? (
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/teacher/daily-reports">Akses Fitur</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/pricing">Upgrade Paket</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Badge({ children, className, variant = "default" }: { 
  children: React.ReactNode; 
  className?: string;
  variant?: "default" | "outline";
}) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      variant === "default" 
        ? "bg-primary/10 text-primary" 
        : "border border-muted-foreground/20 text-muted-foreground"
    } ${className}`}>
      {children}
    </span>
  )
} 