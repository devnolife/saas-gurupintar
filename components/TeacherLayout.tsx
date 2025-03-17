import type React from "react"
import { BaseLayout } from "./BaseLayout"
import { TeacherSidebar } from "./TeacherSidebar"

interface TeacherLayoutProps {
  children: React.ReactNode
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  return <BaseLayout sidebar={<TeacherSidebar />}>{children}</BaseLayout>
}

