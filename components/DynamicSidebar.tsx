"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"

// Define the shape of a menu item
export interface MenuItem {
  id: string
  title: string
  href: string
  icon: React.ElementType
  requiredFeature?: string
}

interface DynamicSidebarProps {
  title: string
  menuItems: MenuItem[]
  isLoading?: boolean
  enabledFeatures?: string[]
  showLogout?: boolean
  onLogout?: () => void
}

export function DynamicSidebar({
  title,
  menuItems,
  isLoading = false,
  enabledFeatures = [],
  showLogout = true,
  onLogout,
}: DynamicSidebarProps) {
  const pathname = usePathname()

  // Filter items based on enabled features
  const filteredItems = menuItems.filter(item => {
    if (!item.requiredFeature) return true
    return enabledFeatures.includes(item.requiredFeature)
  })

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <Skeleton className="h-8 w-4/5" />
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <Skeleton className="h-10 w-full" />
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.id}>
                <Button
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive ? "bg-primary text-primary-foreground" : ""
                  )}
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
      {showLogout && (
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  )
} 
