import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type React from "react"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="relative w-full h-screen">
        {/* Sidebar overlay */}
        <AppSidebar role="teacher" />
        {/* Toggle button for Sidebar */}
        <SidebarTrigger className="fixed top-4 left-4 z-50" />
        <div className="w-full h-full overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

