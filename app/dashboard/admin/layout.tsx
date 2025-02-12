import { AdminLayout } from "@/components/AdminLayout"
import type React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout >
      {children}
    </AdminLayout>
  )
}
