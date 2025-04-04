import type React from "react"
import { UnifiedDashboardLayout } from "@/components/dashboard/UnifiedDashboardLayout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedDashboardLayout role="admin">
      {children}
    </UnifiedDashboardLayout>
  )
}

