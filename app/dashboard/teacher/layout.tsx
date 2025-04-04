import type React from "react"
import { UnifiedDashboardLayout } from "@/components/dashboard/UnifiedDashboardLayout"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedDashboardLayout role="teacher">
      {children}
    </UnifiedDashboardLayout>
  )
}

