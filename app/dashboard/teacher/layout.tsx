"use client"

import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar" // Pastikan ini ada
import { Sidebar } from "@/components/Sidebar" // Arahkan ke file sidebar fix yang baru
import { LayoutDashboard, BookOpen, Calendar, Settings } from "lucide-react"

const teacherItems = [
  {
    title: "Dashboard",
    href: "/dashboard/teacher",
    icon: LayoutDashboard,
  },
  {
    title: "Rencana Pembelajaran",
    href: "/dashboard/teacher/lessons",
    icon: BookOpen,
  },
  {
    title: "Jadwal",
    href: "/dashboard/teacher/schedule",
    icon: Calendar,
  },
  {
    title: "Pengaturan",
    href: "/dashboard/teacher/settings",
    icon: Settings,
  },
]

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white">
        <Sidebar
          user={{ name: "Guru", role: "teacher" }}
          items={teacherItems}
        />
        {/* Konten utama */}
        <main className="flex-1 p-8">
          {/* Tambahkan container untuk membatasi lebar & memusatkan konten */}
          <div className="mx-auto max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
