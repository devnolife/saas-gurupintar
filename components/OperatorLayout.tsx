"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { BaseLayout } from "./BaseLayout"
import { OperatorSidebar } from "./OperatorSidebar"
import { useAuth } from "@/hooks/useAuth"

interface OperatorLayoutProps {
  children: React.ReactNode
}

export default function OperatorLayout({ children }: OperatorLayoutProps) {
  const { user, isLoading, logout, checkSession } = useAuth()
  const router = useRouter()

  // 1. Pastikan user adalah OPERATOR. Jika bukan, logout (atau redirect).
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "OPERATOR")) {
      logout()
      // router.push("/login") // Jika ingin langsung redirect ke halaman login
    }
  }, [user, isLoading, logout, router])

  // 2. Cek session berkala, misalnya setiap 5 menit
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkSession()
    }, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [checkSession])

  // 3. Jika masih loading, jangan render konten (hindari flash yang salah)
  if (isLoading) {
    return <div>Loading...</div>
  }

  // 4. Jika user tidak ada atau bukan OPERATOR, hentikan render
  if (!user || user.role !== "OPERATOR") {
    return null
  }

  // 5. Jika semua valid, render layout
  return (
    <BaseLayout sidebar={<OperatorSidebar />}>
      {children}
    </BaseLayout>
  )
}
