"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import { BaseLayout } from "./BaseLayout"
import { DynamicSidebar } from "./DynamicSidebar"
import { useMenuItems } from "@/hooks/use-menu-items"

interface OperatorLayoutProps {
  children: React.ReactNode
}

export function OperatorLayout({ children }: OperatorLayoutProps) {
  const { logout } = useAuth()
  const { menuItems, isLoading } = useMenuItems("operator")

  return (
    <BaseLayout
      sidebar={
        <DynamicSidebar
          title="Operator Dashboard"
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

