import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import type React from "react"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar role="teacher" />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  )
}
