"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, Users, BookOpen, Settings, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { icon: LayoutDashboard, name: "Dashboard", href: "/admin" },
  { icon: Users, name: "Pengguna", href: "/admin/users" },
  { icon: BookOpen, name: "Materi", href: "/admin/materials" },
  { icon: Settings, name: "Pengaturan", href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg">
        <div className="p-4 bg-primary text-white">
          <h1 className="text-2xl font-bold">Guru Pintar Admin</h1>
        </div>
        <nav className="flex-1 p-4">
          {sidebarItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span
                className={`flex items-center p-2 rounded-lg mb-2 transition-colors ${pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full flex items-center justify-center">
            <LogOut className="mr-2 h-4 w-4" /> Keluar
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:hidden"
          >
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <h1 className="text-2xl font-bold">Guru Pintar Admin</h1>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <nav className="flex-1 p-4">
              {sidebarItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={toggleSidebar}>
                  <span
                    className={`flex items-center p-2 rounded-lg mb-2 transition-colors ${pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <LogOut className="mr-2 h-4 w-4" /> Keluar
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

