"use client"

import { useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TeacherFeature, hasFeatureAccess } from "@/lib/teacherFeatureManager"
import { ShieldAlert, PackageOpen } from "lucide-react"

interface FeatureProtectionProps {
  feature: TeacherFeature
  teacherId: string
  children: ReactNode
  fallback?: ReactNode
}

export function FeatureProtection({
  feature,
  teacherId,
  children,
  fallback,
}: FeatureProtectionProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would fetch from an API
    const checkAccess = async () => {
      try {
        const access = hasFeatureAccess(teacherId, feature)
        setHasAccess(access)
      } catch (error) {
        console.error("Error checking feature access:", error)
        setHasAccess(false)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [teacherId, feature])

  if (loading) {
    return <div className="p-8 flex justify-center">Loading...</div>
  }

  if (hasAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  // Default upgrade prompt
  return (
    <div className="animate-in fade-in duration-500 p-8 max-w-4xl mx-auto">
      <Card className="border-dashed border-2">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-fit">
            <PackageOpen className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Fitur Premium</CardTitle>
          <CardDescription>
            Anda perlu meng-upgrade paket Anda untuk mengakses fitur ini
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>
            Fitur <strong>{getFeatureName(feature)}</strong> hanya tersedia pada paket premium kami.
            Upgrade paket Anda sekarang untuk mendapatkan akses ke semua fitur.
          </p>
          <div className="bg-muted p-4 rounded-lg max-w-md mx-auto">
            <h3 className="font-medium mb-2">Manfaat {getFeatureName(feature)}:</h3>
            <ul className="text-left list-disc pl-5 space-y-1">
              {getFeatureBenefits(feature).map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Kembali
          </Button>
          <Button onClick={() => router.push("/pricing")}>
            Upgrade Paket
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Helper functions to get feature details
function getFeatureName(feature: TeacherFeature): string {
  switch (feature) {
    case "rpp_exam":
      return "Pembuatan RPP dan Soal Ujian"
    case "attendance":
      return "Sistem Absensi Guru dan Siswa"
    case "daily_reports":
      return "Pembuatan Laporan Kegiatan Harian Guru"
    default:
      return "Fitur Premium"
  }
}

function getFeatureBenefits(feature: TeacherFeature): string[] {
  switch (feature) {
    case "rpp_exam":
      return [
        "Templat RPP sesuai kurikulum terbaru",
        "Bank soal dengan berbagai tipe",
        "Generator soal ujian otomatis",
        "Export ke berbagai format dokumen",
      ]
    case "attendance":
      return [
        "Absensi dengan verifikasi selfie",
        "Pelacakan kehadiran siswa",
        "Laporan kehadiran real-time",
        "Notifikasi keterlambatan otomatis",
      ]
    case "daily_reports":
      return [
        "Template laporan kegiatan harian",
        "Dokumentasi kegiatan pembelajaran",
        "Catatan perkembangan siswa",
        "Dasbor analitik performa mengajar",
      ]
    default:
      return ["Fitur tambahan", "Dukungan prioritas", "Akses tanpa batas"]
  }
} 