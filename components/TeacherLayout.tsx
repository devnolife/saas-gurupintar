import type React from "react"
import { BaseLayout } from "./BaseLayout"
import { TeacherSidebar } from "./TeacherSidebar"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
interface TeacherLayoutProps {
  children: React.ReactNode
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  return <BaseLayout sidebar={<TeacherSidebar />}>{children}</BaseLayout>
}

