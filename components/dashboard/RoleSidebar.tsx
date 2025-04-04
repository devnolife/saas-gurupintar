"use client"

import React, { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { useMenuItems } from "@/hooks/use-menu-items"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Search, LogOut, Sparkles } from "lucide-react"

interface RoleSidebarProps {
  role: "admin" | "operator" | "teacher" | "headmaster"
}

export function RoleSidebar({ role }: RoleSidebarProps) {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const { menuItems, isLoading } = useMenuItems(role)

  // Filter navigation items based on search term
  const filteredNavItems = menuItems.filter((item) => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle scroll events to add shadow to header when scrolled
  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (!scrollArea) return

    const handleScroll = () => {
      setIsScrolled(scrollArea.scrollTop > 10)
    }

    scrollArea.addEventListener("scroll", handleScroll)
    return () => scrollArea.removeEventListener("scroll", handleScroll)
  }, [])

  // Get role-specific title
  const getRoleTitle = () => {
    switch (role) {
      case "admin":
        return "Admin Dashboard"
      case "operator":
        return "Operator Dashboard"
      case "teacher":
        return "Dashboard Guru"
      case "headmaster":
        return "Dashboard Kepala Sekolah"
      default:
        return "Dashboard"
    }
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Sidebar
        collapsible="icon"
        className="border-r border-border/10 transition-all duration-300 m-0 p-0 bg-white dark:bg-gray-900/95 backdrop-blur-sm"
      >
        <SidebarHeader
          className={cn(
            "px-6 py-5 transition-all duration-300 sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
            isScrolled && "shadow-sm",
          )}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-primary to-primary-light p-2.5 rounded-xl shadow-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              {getRoleTitle()}
            </h2>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4 py-2">
          <ScrollArea className="h-[calc(100vh-15rem)] sidebar-scroll-area" ref={scrollAreaRef}>
            <div className="space-y-6">
              <div>
                <div className="px-4 py-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Navigation
                  </h3>
                </div>
                <SidebarMenu>
                  {isLoading ? (
                    // Show loading placeholders
                    Array.from({ length: 5 }).map((_, i) => (
                      <SidebarMenuItem key={i}>
                        <div className="flex items-center gap-3 rounded-xl px-4 py-2.5">
                          <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
                          <div className="h-4 w-24 rounded-md bg-muted animate-pulse" />
                        </div>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    // Show actual menu items
                    filteredNavItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "group flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all text-sm",
                                pathname === item.href
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-foreground hover:bg-muted/50",
                                hoveredItem === item.id && pathname !== item.href && "bg-muted/30 translate-x-1",
                              )}
                              onMouseEnter={() => setHoveredItem(item.id)}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center" className="flex items-center">
                            <p>{item.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </div>
            </div>
          </ScrollArea>
        </SidebarContent>

        <div className="mt-auto p-4 border-t border-border/10">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => setLogoutDialogOpen(true)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout from your account?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Sidebar>
    </TooltipProvider>
  )
}
