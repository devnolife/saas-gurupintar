import type React from "react"
import { BaseLayout } from "./BaseLayout"
import { AdminSidebar } from "./AdminSidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return <BaseLayout sidebar={<AdminSidebar />}>{children}</BaseLayout>
}

