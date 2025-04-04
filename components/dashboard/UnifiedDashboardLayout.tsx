"use client"

import React, { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Bell, HelpCircle, Menu, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { RoleSidebar } from "./RoleSidebar"
import { useAuth } from "@/hooks/use-auth"

interface UnifiedDashboardLayoutProps {
  children: React.ReactNode
  role?: "admin" | "operator" | "teacher" | "headmaster"
}

export function UnifiedDashboardLayout({ 
  children, 
  role 
}: UnifiedDashboardLayoutProps) {
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()
  
  // Use the role from props or from the authenticated user
  const activeRole = role || user?.role || "teacher"
  
  // Get user initials for avatar fallback
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "GP"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <RoleSidebar role={activeRole} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm px-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h2 className={cn(
                "text-xl font-bold",
                "bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
              )}>
                Guru Pintar
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative rounded-full bg-muted/30 hover:bg-muted/50">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white">
                  {activeRole === "headmaster" ? "2" : "3"}
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-muted/30 hover:bg-muted/50">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Avatar className="h-9 w-9 border border-border ring-2 ring-primary/20 transition-all hover:ring-primary/40">
                <AvatarImage 
                  src={user?.avatar || `/avatars/${activeRole}.png`} 
                  alt={user?.name || activeRole} 
                />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
            <div className="max-w-[1920px] mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
