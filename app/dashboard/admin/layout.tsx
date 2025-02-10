'use client'

import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/Sidebar"
import { LayoutDashboard, Users, School, Settings } from "lucide-react"
import type React from "react" // Import React

const adminItems = [
  { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Kelola Operator", href: "/dashboard/admin/operators", icon: Users },
  { title: "Kelola Sekolah", href: "/dashboard/admin/schools", icon: School },
  { title: "Pengaturan", href: "/dashboard/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar user={{ name: "Admin Utama", role: "admin" }} items={adminItems} />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  )
}

