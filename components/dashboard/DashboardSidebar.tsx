"use client"

import * as React from "react"
import {
  Users,
  School,
  CreditCard,
  BarChart3,
  Settings,
  BookOpen,
  UserCog,
  Home,
  LogOut,
  ChevronDown,
} from "lucide-react"

import { SearchForm } from "./SearchForm"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Navigation data structure
const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    url: "/dashboard/users",
    badge: "128",
  },
  {
    title: "Operators",
    icon: UserCog,
    url: "/dashboard/operators",
    badge: "24",
  },
  {
    title: "Teachers",
    icon: BookOpen,
    url: "/dashboard/teachers",
    badge: "56",
  },
  {
    title: "Schools",
    icon: School,
    url: "/dashboard/schools",
  },
  {
    title: "Pricing",
    icon: CreditCard,
    url: "/dashboard/pricing",
    submenu: [
      { title: "Plans", url: "/dashboard/pricing/plans" },
      { title: "Discounts", url: "/dashboard/pricing/discounts" },
      { title: "Promotions", url: "/dashboard/pricing/promotions" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    url: "/dashboard/reports",
    submenu: [
      { title: "Analytics", url: "/dashboard/reports/analytics" },
      { title: "Usage", url: "/dashboard/reports/usage" },
      { title: "Revenue", url: "/dashboard/reports/revenue" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/dashboard/settings",
  },
]

// Recent schools data
const recentSchools = [
  { name: "SMA Negeri 1 Jakarta", url: "#" },
  { name: "SMP Cendekia Abadi", url: "#" },
  { name: "SD Global Mandiri", url: "#" },
]

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white border-r border-white/10">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-lg animate-pulse-slow"></div>
            <div className="absolute inset-0.5 bg-purple-900 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">GP</span>
            </div>
          </div>
          <div className="font-bold text-lg bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
            Guru Pintar
          </div>
        </div>
        <SidebarSeparator className="my-4 bg-white/10" />
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <React.Fragment key={item.title}>
                  {item.submenu ? (
                    <Collapsible className="w-full">
                      <SidebarMenuItem>
                        <CollapsibleTrigger className="w-full" asChild>
                          <SidebarMenuButton>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {item.badge && (
                          <Badge variant="outline" className="ml-auto text-xs border-white/20 text-white/70">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuItem>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>{subItem.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto text-xs border-white/20 text-white/70">
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-white/10" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70">Recent Schools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentSchools.map((school) => (
                <SidebarMenuItem key={school.name}>
                  <SidebarMenuButton asChild>
                    <a href={school.url}>
                      <School className="h-4 w-4" />
                      <span>{school.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="bg-white/5 hover:bg-white/10">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="text-xs bg-gradient-to-r from-pink-500 to-indigo-500">AD</AvatarFallback>
              </Avatar>
              <span>Admin User</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-300 hover:text-red-200 hover:bg-red-900/20">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

