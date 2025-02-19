"use client"
import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { BaseLayout } from "./BaseLayout"
import { TeacherSidebar } from "./TeacherSidebar"
import { useAuth } from "@/hooks/useAuth"

interface TeacherLayoutProps {
  children: React.ReactNode
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  const { user, isLoading, logout, checkSession } = useAuth()
  const router = useRouter()

  // 1. Jika role tidak sesuai, logout (atau bisa dialihkan ke halaman lain).
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "TEACHER")) {
      logout()
      // router.push("/login") // jika ingin langsung ke halaman login
    }
  }, [user, isLoading, logout, router])

  // 2. Cek session secara berkala, misalnya setiap 5 menit
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkSession()
    }, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [checkSession])

  // 3. Jika masih loading, tampilkan loading state
  if (isLoading) {
    return <div>Loading...</div>
  }

  // 4. Jika user tidak ada atau bukan TEACHER, hentikan render
  if (!user || user.role !== "TEACHER") {
    return null
  }

  // 5. Jika lolos semua pengecekan, render layout
  return (
    <BaseLayout sidebar={<TeacherSidebar />}>
      {children}
    </BaseLayout>
  )
}
