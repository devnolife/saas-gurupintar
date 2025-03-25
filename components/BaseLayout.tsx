import type React from "react"
import { cn } from "@/lib/utils"

interface BaseLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
  className?: string
}

export function BaseLayout({ children, sidebar, className }: BaseLayoutProps) {
  return (
    <div className={cn("flex h-screen bg-gray-100", className)}>
      <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">{sidebar}</aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

