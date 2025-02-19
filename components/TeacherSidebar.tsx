"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail , SidebarProvider } from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/TeamSwitcher"
import { NavMain } from "@/components/NavMain"
import { NavProjects } from "@/components/NavProjects"
import { NavUser } from "@/components/NavUser"
import { LayoutDashboard, BookOpen, Calendar, FileText, Settings2, GalleryVerticalEnd, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useAuth } from "@/hooks/useAuth"

const teacherData = {
  teams: [
    { name: "Departemen Matematika", logo: BookOpen, plan: "Standard" },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/teacher",
      icon: LayoutDashboard,
      items: [
        { title: "Buat RPP", url: "/dashboard/teacher", isActive: true },
        { title: "Buat Silabus", url: "/dashboard/teacher/syllabus" },
        { title: "Riwayat", url: "/dashboard/teacher/history" },
      ],
    },
    { title: "Rencana Pelajaran", url: "/dashboard/teacher/lessons", icon: BookOpen },
    { title: "Jadwal", url: "/dashboard/teacher/schedule", icon: Calendar },
    { title: "Laporan", url: "/dashboard/teacher/reports", icon: FileText },
    { title: "Pengaturan", url: "/dashboard/teacher/settings", icon: Settings2 },
  ],
  projects: [
    { name: "Rencana Pelajaran", url: "#", icon: BookOpen },
    { name: "Kemajuan Siswa", url: "#", icon: GalleryVerticalEnd },
  ],
}

export function TeacherSidebar() {
  const { user, logout } = useAuth()
  return (
    <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border/50 px-2 py-3">
        <TeamSwitcher teams={teacherData.teams} />
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <NavMain items={teacherData.navMain} />
        <div className="my-4 border-t border-border/50" />
        <NavProjects projects={teacherData.projects} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 px-2 py-3">
          <NavUser user={user ? { ...user, avatar: "/default-avatar.png" } : null} />
          <Button onClick={logout} variant="ghost" className="w-full justify-start mt-2">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    </SidebarProvider>
  )
}
