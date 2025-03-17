"use client"

import type * as React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BookOpen,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  GalleryVerticalEnd,
  LayoutDashboard,
  LogOut,
  PieChart,
  School,
  Search,
  Settings2,
  Sparkles,
  Users,
  Bell,
  HelpCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Flattened navigation items for each role (removed subItems)
const roleData = {
  admin: {
    navItems: [
      { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
      { title: "Users", url: "/dashboard/admin/users", icon: Users },
      { title: "Operators", url: "/dashboard/admin/operators", icon: Users },
      { title: "Teachers", url: "/dashboard/admin/teachers", icon: Users },
      { title: "Schools", url: "/dashboard/admin/schools", icon: School },
      { title: "Pricing", url: "/dashboard/admin/pricing", icon: DollarSign },
      { title: "Transactions", url: "/dashboard/admin/transactions", icon: CreditCard },
      { title: "Reports", url: "/dashboard/admin/reports", icon: FileText },
      { title: "Analytics", url: "/dashboard/admin/teacher-analytics", icon: PieChart },
      { title: "Settings", url: "/dashboard/admin/settings", icon: Settings2 },
    ],
    projects: [
      { name: "User Analytics", url: "#", icon: PieChart },
      { name: "School Performance", url: "#", icon: GalleryVerticalEnd },
    ],
  },
  operator: {
    navItems: [
      { title: "Dashboard", url: "/dashboard/operator", icon: LayoutDashboard },
      { title: "Teachers", url: "/dashboard/operator/teachers", icon: Users },
      { title: "Reports", url: "/dashboard/operator/reports", icon: FileText },
      { title: "Settings", url: "/dashboard/operator/settings", icon: Settings2 },
    ],
    projects: [
      { title: "Teacher Evaluations", url: "#", icon: FileText },
      { title: "School Calendar", url: "#", icon: Calendar },
    ],
  },
  teacher: {
    navItems: [
      { title: "Dashboard", url: "/dashboard/teacher", icon: LayoutDashboard },
      { title: "Generate RPP", url: "/dashboard/teacher", icon: FileText },
      { title: "Generate Silabus", url: "/dashboard/teacher/syllabus", icon: FileText },
      { title: "History", url: "/dashboard/teacher/history", icon: FileText },
      { title: "Lessons", url: "/dashboard/teacher/lessons", icon: BookOpen },
      { title: "Schedule", url: "/dashboard/teacher/schedule", icon: Calendar },
      { title: "Reports", url: "/dashboard/teacher/reports", icon: FileText },
      { title: "Settings", url: "/dashboard/teacher/settings", icon: Settings2 },
    ],
    projects: [
      { title: "Lesson Plans", url: "#", icon: BookOpen },
      { title: "Student Progress", url: "#", icon: GalleryVerticalEnd },
    ],
  },
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: "admin" | "operator" | "teacher"
}

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  const data = roleData[role]
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Filter navigation items based on search term
  const filteredNavItems = data.navItems.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/10 shadow-sm transition-all duration-300 m-0 p-0"
      {...props}
    >
      <SidebarHeader className="px-6 py-6">
        <div className="flex items-center gap-3 mb-8 transition-transform duration-300 hover:scale-105">
          <div className="bg-gradient-primary p-2.5 rounded-xl shadow-md">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gradient">Guru Pintar</h2>
        </div>

        <div className="relative transition-all duration-200 hover:shadow-md rounded-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 border-border/20 rounded-xl h-10 focus-visible:ring-primary/20 bg-muted/30 transition-all duration-200"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <ScrollArea className="h-[calc(100vh-15rem)]">
          <div className="space-y-8">
            <div>
              <div className="px-4 py-2">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground/80">Navigation</h3>
              </div>
              <SidebarMenu>
                {filteredNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link
                      href={item.url}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 text-sm",
                        pathname === item.url
                          ? "bg-primary/10 text-primary font-medium shadow-sm"
                          : "text-foreground hover:bg-muted/50",
                        hoveredItem === item.title && pathname !== item.url && "bg-muted/30 translate-x-1",
                      )}
                      onMouseEnter={() => setHoveredItem(item.title)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg transition-all duration-300",
                          pathname === item.url ? "bg-primary/20" : "bg-muted/30 group-hover:bg-primary/10",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 transition-all duration-300",
                            pathname === item.url ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                          )}
                        />
                      </div>
                      <span className="transition-all duration-300">{item.title}</span>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>

            {data.projects.length > 0 && (
              <div>
                <div className="px-4 py-2">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground/80">
                    Recent Projects
                  </h3>
                </div>
                <SidebarMenu>
                  {data.projects.map((project) => (
                    <SidebarMenuItem key={project.title || project.name}>
                      <Link
                        href={project.url}
                        className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm hover:bg-muted/50 transition-all duration-300 hover:translate-x-1"
                      >
                        <div className="p-2 rounded-lg bg-muted/30 group-hover:bg-primary/10 transition-all duration-300">
                          <project.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300" />
                        </div>
                        <span className="transition-all duration-300">{project.title || project.name}</span>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </div>
            )}
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/10 p-4">
        <div className="flex items-center gap-3 mb-4 p-2 rounded-xl hover:bg-muted/30 transition-all duration-300">
          <Avatar className="h-10 w-10 border border-primary/20 transition-all duration-300 hover:border-primary">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 rounded-lg border-border/20 hover:bg-primary/5 hover:text-primary text-sm mb-4 transition-all duration-300 hover:translate-x-1"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>

        <div className="flex justify-between mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            <Bell className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-300" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-300" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            <Settings2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-300" />
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

