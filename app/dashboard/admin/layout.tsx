import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import type React from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Bell, HelpCircle, Search, Sparkles, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <AppSidebar role="admin" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm px-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-primary to-primary-light p-1.5 rounded-lg shadow-sm">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Guru Pintar
                </h2>
              </div>
            </div>

            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search anything..."
                  className="pl-9 border-none bg-muted/30 focus-visible:ring-primary/20 rounded-full h-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative rounded-full bg-muted/30 hover:bg-muted/50">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-muted/30 hover:bg-muted/50">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Avatar className="h-9 w-9 border-2 border-primary/20 hover:border-primary transition-colors duration-300">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">JD</AvatarFallback>
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

