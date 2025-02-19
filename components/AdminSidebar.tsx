"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarProvider } from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/TeamSwitcher"
import { NavMain } from "@/components/NavMain"
import { NavProjects } from "@/components/NavProjects"
import { NavUser } from "@/components/NavUser"
import { LayoutDashboard, Users, School, FileText, Settings2, DollarSign, CreditCard, PieChart, GalleryVerticalEnd, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

const adminData = {
  teams: [
    { name: "Tim Admin", logo: Users, plan: "Enterprise" },
  ],
  navMain: [
    { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard, isActive: true },
    { title: "Kelola Pengguna", url: "/dashboard/admin/users", icon: Users },
    { title: "Kelola Sekolah", url: "/dashboard/admin/schools", icon: School },
    { title: "Manajemen Harga", url: "/dashboard/admin/pricing", icon: DollarSign },
    { title: "Transaksi", url: "/dashboard/admin/transactions", icon: DollarSign },
    { title: "Laporan", url: "/dashboard/admin/reports", icon: CreditCard },
    { title: "Analitik Guru", url: "/dashboard/admin/teacher-analytics", icon: PieChart },
    { title: "Pengaturan", url: "/dashboard/admin/settings", icon: Settings2 },
  ],
  projects: [
    { name: "Analitik Pengguna", url: "#", icon: FileText },
    { name: "Kinerja Sekolah", url: "#", icon: GalleryVerticalEnd },
  ],
}

export function AdminSidebar() {
  const { user, logout } = useAuth()

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
          <NavUser
            user={
              user
                ? { name: user.name, email: user.email, avatar: "/default-avatar.png" }
                : null
            }
          />
          <Button onClick={logout} variant="ghost" className="mt-2 w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}
