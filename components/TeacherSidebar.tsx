import { Sidebar } from "./Sidebar"
import { LayoutDashboard, BookOpen, Calendar, Settings } from "lucide-react"

interface TeacherSidebarProps {
  user: {
    name: string
    role: string
  }
}

const teacherItems = [
  { title: "Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
  { title: "Rencana Pembelajaran", href: "/dashboard/teacher/lessons", icon: BookOpen },
  { title: "Jadwal", href: "/dashboard/teacher/schedule", icon: Calendar },
  { title: "Pengaturan", href: "/dashboard/teacher/settings", icon: Settings },
]

export function TeacherSidebar({ user }: TeacherSidebarProps) {
  return <Sidebar user={user} items={teacherItems} />
}

