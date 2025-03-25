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

export default function HeadmasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <AppSidebar role="headmaster" />
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
                <AvatarImage src="/avatars/headmaster.png" alt="Kepala Sekolah" />
                <AvatarFallback className="bg-primary/10 text-primary">KS</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            <div className="max-w-[1600px] mx-auto">
              {loading ? (
                <div className="p-8">
                  <Skeleton className="h-[80vh] w-full" />
                </div>
              ) : (
                children
              )}
            </div>
          </main>
          <ScrollToTop />
        </div>
      </div>
    </SidebarProvider>
  )
}

