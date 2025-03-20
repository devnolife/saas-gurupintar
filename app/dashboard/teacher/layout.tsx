"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout 
      role="teacher"
      avatarSrc="/avatars/teacher.png"
      avatarFallback="GR"
      userName="Bapak/Ibu Guru"
      userTitle="Guru"
    >
      {children}
    </DashboardLayout>
  )
}

