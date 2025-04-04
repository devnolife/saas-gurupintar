import type React from "react"
import { UnifiedDashboardLayout } from "@/components/dashboard/UnifiedDashboardLayout"

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedDashboardLayout role="operator">
      {children}
    </UnifiedDashboardLayout>
  )
}

