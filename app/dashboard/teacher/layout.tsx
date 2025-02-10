import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/Sidebar"
import { LayoutDashboard, BookOpen, Calendar, Settings } from "lucide-react"
import type React from "react" // Added import for React

const teacherItems = [
  { title: "Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
  { title: "Rencana Pembelajaran", href: "/dashboard/teacher/lessons", icon: BookOpen },
  { title: "Jadwal", href: "/dashboard/teacher/schedule", icon: Calendar },
  { title: "Pengaturan", href: "/dashboard/teacher/settings", icon: Settings },
]

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar user={{ name: "Guru", role: "teacher" }} items={teacherItems} />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  )
}

