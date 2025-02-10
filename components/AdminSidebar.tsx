import { Sidebar } from "./Sidebar"
import { LayoutDashboard, Users, School, Settings } from "lucide-react"

interface AdminSidebarProps {
  user: {
    name: string
    role: string
  }
}

const adminItems = [
  { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Kelola Operator", href: "/dashboard/admin/operators", icon: Users },
  { title: "Kelola Sekolah", href: "/dashboard/admin/schools", icon: School },
  { title: "Pengaturan", href: "/dashboard/admin/settings", icon: Settings },
]

export function AdminSidebar({ user }: AdminSidebarProps) {
  return <Sidebar user={user} items={adminItems} />
}

