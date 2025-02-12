import { TeacherLayout } from "@/components/TeacherLayout"
import type React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TeacherLayout >
      {children}
    </TeacherLayout>
  )
}

