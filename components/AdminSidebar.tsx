"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail ,SidebarProvider } from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/TeamSwitcher"
import { NavMain } from "@/components/NavMain"
import { NavProjects } from "@/components/NavProjects"
import { NavUser } from "@/components/NavUser"
import { LayoutDashboard, Users, School, FileText, Settings2 } from "lucide-react"
const adminData = {
  teams: [
    { name: "Admin Team", logo: Users, plan: "Enterprise" },
  ],
  navMain: [
    { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard, isActive: true },
    { title: "Manage Users", url: "/dashboard/admin/users", icon: Users },
    { title: "Manage Schools", url: "/dashboard/admin/schools", icon: School },
    { title: "Reports", url: "/dashboard/admin/reports", icon: FileText },
    { title: "Settings", url: "/dashboard/admin/settings", icon: Settings2 },
  ],
  projects: [
    { name: "User Analytics", url: "#", icon: FileText },
  ],
}

export function AdminSidebar() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b border-border/50 px-2 py-3">
          <TeamSwitcher teams={adminData.teams} />
        </SidebarHeader>
        <SidebarContent className="px-2 py-4">
          <NavMain items={adminData.navMain} />
          <div className="my-4 border-t border-border/50" />
          <NavProjects projects={adminData.projects} />
        </SidebarContent>
        <SidebarFooter className="border-t border-border/50 px-2 py-3">
          <NavUser user={{ name: "Admin", email: "admin@example.com", avatar: "/default-avatar.png" }} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}
