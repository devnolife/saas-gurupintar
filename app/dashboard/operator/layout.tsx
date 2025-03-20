"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout 
      role="operator"
      avatarSrc="/avatars/operator.png"
      avatarFallback="OP"
      userName="Operator"
      userTitle="Operator Sekolah"
    >
      {children}
    </DashboardLayout>
  )
}

