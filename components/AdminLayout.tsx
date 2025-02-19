"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { BaseLayout } from "./BaseLayout"
import { AdminSidebar } from "./AdminSidebar"
import { useAuth } from "@/hooks/useAuth"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading, logout, checkSession } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      logout()
      
    }
  }, [user, isLoading, logout, router])

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkSession()
    }, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [checkSession])

  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (!user || user.role !== "ADMIN") {
    return null
  }

  
  return (
    <BaseLayout sidebar={<AdminSidebar />}>
      {children}
    </BaseLayout>
  )
}
