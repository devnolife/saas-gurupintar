"use client"

import type * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  Users,
  School,
  FileText,
  Calendar,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/NavMain"
import { NavProjects } from "@/components/NavProjects"
import { NavUser } from "@/components/NavUser"
import { TeamSwitcher } from "@/components/TeamSwitcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data for each role
const roleData = {
  admin: {
    teams: [
      { name: "Admin Team", logo: Command, plan: "Enterprise" },
      { name: "Support Team", logo: AudioWaveform, plan: "Pro" },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/admin",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Manage Users",
        url: "/dashboard/admin/users",
        icon: Users,
        items: [
          { title: "Operators", url: "/dashboard/admin/operators" },
          { title: "Teachers", url: "/dashboard/admin/teachers" },
        ],
      },
      {
        title: "Manage Schools",
        url: "/dashboard/admin/schools",
        icon: School,
      },
      {
        title: "Reports",
        url: "/dashboard/admin/reports",
        icon: FileText,
      },
      {
        title: "Settings",
        url: "/dashboard/admin/settings",
        icon: Settings2,
      },
    ],
    projects: [
      { name: "User Analytics", url: "#", icon: PieChart },
      { name: "School Performance", url: "#", icon: GalleryVerticalEnd },
    ],
  },
  operator: {
    teams: [
      { name: "Operator Team", logo: Frame, plan: "Pro" },
      { name: "School A", logo: School, plan: "Standard" },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/operator",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Manage Teachers",
        url: "/dashboard/operator/teachers",
        icon: Users,
      },
      {
        title: "Reports",
        url: "/dashboard/operator/reports",
        icon: FileText,
      },
      {
        title: "Settings",
        url: "/dashboard/operator/settings",
        icon: Settings2,
      },
    ],
    projects: [
      { name: "Teacher Evaluations", url: "#", icon: FileText },
      { name: "School Calendar", url: "#", icon: Calendar },
    ],
  },
  teacher: {
    teams: [
      { name: "Math Department", logo: PieChart, plan: "Standard" },
      { name: "Science Department", logo: Bot, plan: "Standard" },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/teacher",
        icon: LayoutDashboard,
        items: [
          { title: "Generate RPP", url: "/dashboard/teacher", isActive: true },
          { title: "Generate Silabus", url: "/dashboard/teacher/syllabus" },
          { title: "History", url: "/dashboard/teacher/history" },
        ],
      },
      {
        title: "Lesson Plans",
        url: "/dashboard/teacher/lessons",
        icon: BookOpen,
      },
      {
        title: "Schedule",
        url: "/dashboard/teacher/schedule",
        icon: Calendar,
      },
      {
        title: "Reports",
        url: "/dashboard/teacher/reports",
        icon: FileText,
      },
      {
        title: "Settings",
        url: "/dashboard/teacher/settings",
        icon: Settings2,
      },
    ],
    projects: [
      { name: "Lesson Plans", url: "#", icon: BookOpen },
      { name: "Student Progress", url: "#", icon: GalleryVerticalEnd },
    ],
  },
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: "admin" | "operator" | "teacher"
}

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  const data = roleData[role]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-border/50 px-2 py-3">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <NavMain items={data.navMain} />
        <div className="my-4 border-t border-border/50" />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 px-2 py-3">
        <NavUser user={{ name: "John Doe", email: "john@example.com", avatar: "/avatars/john-doe.jpg" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
