import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/Sidebar"
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react"
import type React from "react" // Import React

const operatorItems = [
  { title: "Dashboard", href: "/dashboard/operator", icon: LayoutDashboard },
  { title: "Kelola Guru", href: "/dashboard/operator/teachers", icon: Users },
  { title: "Laporan", href: "/dashboard/operator/reports", icon: FileText },
  { title: "Pengaturan", href: "/dashboard/operator/settings", icon: Settings },
]

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar user={{ name: "Operator Sekolah", role: "operator" }} items={operatorItems} />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  )
}

