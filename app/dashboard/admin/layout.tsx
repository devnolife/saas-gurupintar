"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout
      role="admin"
      avatarSrc="/avatars/admin.png"
      avatarFallback="AD"
      userName="Admin"
      userTitle="Super Admin"
    >
      {children}
    </DashboardLayout>
  )
}

