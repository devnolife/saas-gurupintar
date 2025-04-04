"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import { BaseLayout } from "./BaseLayout"
import { DynamicSidebar } from "./DynamicSidebar"
import { useMenuItems } from "@/hooks/use-menu-items"

interface HeadmasterLayoutProps {
  children: React.ReactNode
}

export function HeadmasterLayout({ children }: HeadmasterLayoutProps) {
  const { logout } = useAuth()
  const { menuItems, isLoading } = useMenuItems("headmaster")

  return (
    <BaseLayout
      sidebar={
        <DynamicSidebar
          title="Dashboard Kepala Sekolah"
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

