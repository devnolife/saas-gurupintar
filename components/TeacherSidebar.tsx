"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail , SidebarProvider } from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/TeamSwitcher"
import { NavMain } from "@/components/NavMain"
import { NavProjects } from "@/components/NavProjects"
import { NavUser } from "@/components/NavUser"
import { LayoutDashboard, BookOpen, Calendar, FileText, Settings2 } from "lucide-react"

const teacherData = {
  teams: [
    { name: "Math Department", logo: BookOpen, plan: "Standard" },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/teacher",
      icon: LayoutDashboard,
      items: [
        { title: "Generate RPP", url: "/dashboard/teacher", isActive: true },
        { title: "Generate Syllabus", url: "/dashboard/teacher/syllabus" },
        { title: "History", url: "/dashboard/teacher/history" },
      ],
    },
    { title: "Lesson Plans", url: "/dashboard/teacher/lessons", icon: BookOpen },
    { title: "Schedule", url: "/dashboard/teacher/schedule", icon: Calendar },
    { title: "Reports", url: "/dashboard/teacher/reports", icon: FileText },
    { title: "Settings", url: "/dashboard/teacher/settings", icon: Settings2 },
  ],
  projects: [
    { name: "Lesson Plans", url: "#", icon: BookOpen },
  ],
}

export function TeacherSidebar() {
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
        <NavUser user={{ name: "Teacher", email: "teacher@example.com", avatar: "/default-avatar.png" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    </SidebarProvider>
  )
}
