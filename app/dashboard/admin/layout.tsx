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
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 border-b shadow-sm border-border/10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-primary to-primary-light p-1.5 rounded-lg shadow-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-primary to-primary-light bg-clip-text">
                  Guru Pintar
                </h2>
              </div>
            </div>

            <div className="flex-1 hidden max-w-xl mx-8 md:block">
              <div className="relative">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search anything..."
                  className="border-none rounded-full pl-9 bg-muted/30 focus-visible:ring-primary/20 h-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative rounded-full bg-muted/30 hover:bg-muted/50">
                <Bell className="w-5 h-5" />
                <Badge className="absolute flex items-center justify-center w-5 h-5 p-0 text-white -top-1 -right-1 bg-primary">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-muted/30 hover:bg-muted/50">
                <HelpCircle className="w-5 h-5" />
              </Button>
              <ThemeToggle />
              <Avatar className="transition-colors duration-300 border-2 h-9 w-9 border-primary/20 hover:border-primary">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="font-medium bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 p-0 overflow-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
            <div className="max-w-[1920px] mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

