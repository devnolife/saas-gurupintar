"use client"

import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import type React from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Bell, HelpCircle, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollToTop } from "@/components/scroll-to-top"

export type UserRole = "admin" | "teacher" | "operator" | "headmaster" | "student"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: UserRole
  avatarSrc?: string
  avatarFallback?: string
  userName?: string
  userTitle?: string
}

export function DashboardLayout({ 
  children, 
  role, 
  avatarSrc = "/placeholder.svg",
  avatarFallback = "U",
  userName = "User",
  userTitle = "Role"
}: DashboardLayoutProps) {
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(true)

  // This ensures we're fully rendering on the client side
  useEffect(() => {
    setIsClient(true)
    
    // Add a small delay to ensure everything is properly loaded
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  if (!isClient) {
    return (
      <div className="flex-1 p-8">
        <Skeleton className="h-[80vh] w-full" />
      </div>
    );
  }

  // Role-specific configuration for avatar and header text
  const roleConfig = {
    admin: {
      fallback: "AD",
      title: "Admin"
    },
    teacher: {
      fallback: "GR",
      title: "Guru"
    },
    operator: {
      fallback: "OP",
      title: "Operator"
    },
    headmaster: {
      fallback: "KS",
      title: "Kepala Sekolah"
    },
    student: {
      fallback: "SW",
      title: "Siswa"
    }
  }

  // Use configured values or fall back to props
  const fallback = avatarFallback || roleConfig[role].fallback
  const title = userTitle || roleConfig[role].title

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <AppSidebar role={role} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-6 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                Guru Pintar
              </h2>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari..."
                  className="pl-9 border-none bg-muted/30 focus-visible:ring-primary/20 rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">2</Badge>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Avatar className="h-9 w-9 border border-border ring-2 ring-primary/20 transition-all hover:ring-primary/40">
                <AvatarImage src={avatarSrc} alt={userName} />
                <AvatarFallback className="bg-primary/10 text-primary">{fallback}</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 min-h-[calc(100vh-4rem)]">
            <div className="max-w-[1600px] mx-auto h-full min-h-[calc(100vh-4rem-3rem)]">
              {loading ? (
                <div className="p-8 h-full">
                  <Skeleton className="h-[80vh] w-full" />
                </div>
              ) : (
                <div className="h-full min-h-[calc(100vh-4rem-4rem)]">{children}</div>
              )}
            </div>
          </main>
          <ScrollToTop />
        </div>
      </div>
    </SidebarProvider>
  )
}

