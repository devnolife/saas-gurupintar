"use client"

import type React from "react"

import { DashboardSidebar } from "./DashboardSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        <DashboardSidebar />
        <SidebarInset className="bg-gray-50">
          <header className="flex h-16 items-center gap-4 border-b bg-white px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              {/* Add your header content here (notifications, profile, etc.) */}
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

