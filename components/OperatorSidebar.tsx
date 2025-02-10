import { Sidebar } from "./Sidebar"
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react"

interface OperatorSidebarProps {
  user: {
    name: string
    role: string
  }
}

const operatorItems = [
  { title: "Dashboard", href: "/dashboard/operator", icon: LayoutDashboard },
  { title: "Kelola Guru", href: "/dashboard/operator/teachers", icon: Users },
  { title: "Laporan", href: "/dashboard/operator/reports", icon: FileText },
  { title: "Pengaturan", href: "/dashboard/operator/settings", icon: Settings },
]

export function OperatorSidebar({ user }: OperatorSidebarProps) {
  return <Sidebar user={user} items={operatorItems} />
}

