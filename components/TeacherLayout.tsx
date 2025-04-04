"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import { BaseLayout } from "./BaseLayout"
import { DynamicSidebar } from "./DynamicSidebar"
import { useMenuItems } from "@/hooks/use-menu-items"
import { useTeacherFeatures } from "@/lib/teacherFeatureManager"

interface TeacherLayoutProps {
  children: React.ReactNode
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  const { logout, user } = useAuth()
  const { menuItems, isLoading: menuLoading } = useMenuItems("teacher")

  const teacherId = user?.id || "teacher4"
  const { features, loading: featuresLoading } = useTeacherFeatures(teacherId)

  const isLoading = menuLoading || featuresLoading

  return (
    <BaseLayout
      sidebar={
        <DynamicSidebar
          title="Dashboard Guru"
          menuItems={menuItems}
          isLoading={isLoading}
          enabledFeatures={features}
          onLogout={logout}
        />
      }
    >
      {children}
    </BaseLayout>
  )
}

