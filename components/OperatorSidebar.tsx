"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarRail } from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/TeamSwitcher"
import { NavMain } from "@/components/NavMain"
import { NavProjects } from "@/components/NavProjects"
import { NavUser } from "@/components/NavUser"
import { LayoutDashboard, Users, FileText, Settings2, Calendar } from "lucide-react"

const operatorData = {
  teams: [
    { name: "Tim Operator", logo: Users, plan: "Pro" },
  ],
  navMain: [
    { title: "Dashboard", url: "/dashboard/operator", icon: LayoutDashboard, isActive: true },
    { title: "Kelola Guru", url: "/dashboard/operator/teachers", icon: Users },
    { title: "Laporan", url: "/dashboard/operator/reports", icon: FileText },
    { title: "Buat Template Soal", url: "/dashboard/operator/templates", icon: FileText },
    { title: "Pengaturan", url: "/dashboard/operator/settings", icon: Settings2 },
  ],
  projects: [
    { name: "Evaluasi Guru", url: "#", icon: FileText },
    { name: "Kalender Sekolah", url: "#", icon: Calendar },
  ],
}

export function OperatorSidebar() {
  return (
    <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border/50 px-2 py-3">
        <TeamSwitcher teams={operatorData.teams} />
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <NavMain items={operatorData.navMain} />
        <div className="my-4 border-t border-border/50" />
        <NavProjects projects={operatorData.projects} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 px-2 py-3">
        <NavUser user={{ name: "Operator", email: "operator@example.com", avatar: "defaultAvatar.png" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    </SidebarProvider>
  )
}
