"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function HeadmasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout 
      role="headmaster"
      avatarSrc="/avatars/headmaster.png"
      avatarFallback="KS"
      userName="Pak Rudi"
      userTitle="Kepala Sekolah"
    >
      {children}
    </DashboardLayout>
  )
}

