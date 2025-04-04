"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import { BaseLayout } from "./BaseLayout"
import { DynamicSidebar } from "./DynamicSidebar"
import { useMenuItems } from "@/hooks/use-menu-items"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAuth()
  const { menuItems, isLoading } = useMenuItems("admin")

  return (
    <BaseLayout
      sidebar={
        <DynamicSidebar
          title="Admin Dashboard"
          menuItems={menuItems}
          isLoading={isLoading}
          onLogout={logout}
        />
      }
    >
      {children}
    </BaseLayout>
  )
}

