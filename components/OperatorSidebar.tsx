"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarRail } from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/TeamSwitcher"
import { NavMain } from "@/components/NavMain"
import { NavProjects } from "@/components/NavProjects"
import { NavUser } from "@/components/NavUser"
import { LayoutDashboard, Users, FileText, Settings2 } from "lucide-react"

const operatorData = {
  teams: [
    { name: "Operator Team", logo: Users, plan: "Pro" },
  ],
  navMain: [
    { title: "Dashboard", url: "/dashboard/operator", icon: LayoutDashboard, isActive: true },
    { title: "Manage Teachers", url: "/dashboard/operator/teachers", icon: Users },
    { title: "Reports", url: "/dashboard/operator/reports", icon: FileText },
    { title: "Settings", url: "/dashboard/operator/settings", icon: Settings2 },
  ],
  projects: [
    { name: "Teacher Evaluations", url: "#", icon: FileText },
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
