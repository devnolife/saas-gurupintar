import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import type React from "react"

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="relative w-full h-screen">
        {/* Sidebar overlay */}
        <AppSidebar role="operator" />
        {/* Toggle button for Sidebar */}
        <SidebarTrigger className="fixed top-4 left-4 z-50" />
        <div className="w-full h-full overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
