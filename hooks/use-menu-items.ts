"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  Settings,
  FileText,
  School,
  DollarSign,
  CreditCard,
  PieChart,
  BarChart,
  ClipboardList,
  UserCheck,
  GraduationCap,
  Home,
  Bell,
  HelpCircle,
  User,
  Briefcase,
  LineChart
} from "lucide-react"

// Define the shape of a menu item
export interface MenuItem {
  id: string
  title: string
  href: string
  icon: React.ElementType
  requiredFeature?: string
}

// This mapping is used to convert icon names from the API to actual icon components
const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  Settings,
  FileText,
  School,
  DollarSign,
  CreditCard,
  PieChart,
  BarChart,
  ClipboardList,
  UserCheck,
  GraduationCap,
  Home,
  Bell,
  HelpCircle,
  User,
  Briefcase,
  LineChart
}

// Interface for the API response
interface ApiMenuItem {
  id: string
  title: string
  href: string
  iconName: string // Name of the icon in the iconMap
  requiredFeature?: string
}

// Helper function to convert API menu items to component props
function mapApiMenuItems(apiItems: ApiMenuItem[]): MenuItem[] {
  return apiItems.map(item => ({
    id: item.id,
    title: item.title,
    href: item.href,
    icon: iconMap[item.iconName] || Settings, // Fallback to Settings icon
    requiredFeature: item.requiredFeature
  }))
}

// Mock API call - will be replaced with actual API call
async function fetchMenuItems(role: string): Promise<MenuItem[]> {
  // In a real app, this would be an API call like:
  // const response = await fetch(`/api/menu-items/${role}`)
  // const data = await response.json()
  // return mapApiMenuItems(data)

  // Mock data for each role
  const mockApiData: Record<string, ApiMenuItem[]> = {
    admin: [
      { id: "admin-1", title: "Dashboard", href: "/dashboard/admin", iconName: "LayoutDashboard" },
      { id: "admin-2", title: "Users", href: "/dashboard/admin/users", iconName: "Users" },
      { id: "admin-3", title: "Schools", href: "/dashboard/admin/schools", iconName: "School" },
      { id: "admin-4", title: "Operators", href: "/dashboard/admin/operators", iconName: "Briefcase" },
      { id: "admin-5", title: "Teachers", href: "/dashboard/admin/teachers", iconName: "Users" },
      { id: "admin-6", title: "Pricing", href: "/dashboard/admin/pricing", iconName: "DollarSign" },
      { id: "admin-7", title: "Transactions", href: "/dashboard/admin/transactions", iconName: "CreditCard" },
      { id: "admin-8", title: "Reports", href: "/dashboard/admin/reports", iconName: "FileText" },
      { id: "admin-9", title: "Analytics", href: "/dashboard/admin/analytics", iconName: "LineChart" },
      { id: "admin-10", title: "Settings", href: "/dashboard/admin/settings", iconName: "Settings" }
    ],
    operator: [
      { id: "operator-1", title: "Dashboard", href: "/dashboard/operator", iconName: "LayoutDashboard" },
      { id: "operator-2", title: "Teachers", href: "/dashboard/operator/teachers", iconName: "Users" },
      { id: "operator-3", title: "Students", href: "/dashboard/operator/students", iconName: "GraduationCap" },
      { id: "operator-4", title: "Classes", href: "/dashboard/operator/classes", iconName: "School" },
      { id: "operator-5", title: "Schedule", href: "/dashboard/operator/schedule", iconName: "Calendar" },
      { id: "operator-6", title: "Attendance", href: "/dashboard/operator/attendance", iconName: "UserCheck" },
      { id: "operator-7", title: "Reports", href: "/dashboard/operator/reports", iconName: "FileText" },
      { id: "operator-8", title: "Settings", href: "/dashboard/operator/settings", iconName: "Settings" }
    ],
    teacher: [
      { id: "teacher-1", title: "Dashboard", href: "/dashboard/teacher", iconName: "LayoutDashboard" },
      { id: "teacher-2", title: "RPP & Soal Ujian", href: "/dashboard/teacher/lessons", iconName: "BookOpen", requiredFeature: "rpp_exam" },
      { id: "teacher-3", title: "Absensi", href: "/dashboard/teacher/attendance", iconName: "UserCheck", requiredFeature: "attendance" },
      { id: "teacher-4", title: "Laporan Harian", href: "/dashboard/teacher/daily-reports", iconName: "ClipboardList", requiredFeature: "daily_reports" },
      { id: "teacher-5", title: "Jadwal", href: "/dashboard/teacher/schedule", iconName: "Calendar" },
      { id: "teacher-6", title: "Siswa", href: "/dashboard/teacher/students", iconName: "GraduationCap" },
      { id: "teacher-7", title: "Nilai", href: "/dashboard/teacher/grades", iconName: "BarChart" },
      { id: "teacher-8", title: "Pengaturan", href: "/dashboard/teacher/settings", iconName: "Settings" }
    ],
    headmaster: [
      { id: "headmaster-1", title: "Dashboard", href: "/dashboard/headmaster", iconName: "LayoutDashboard" },
      { id: "headmaster-2", title: "Guru", href: "/dashboard/headmaster/teachers", iconName: "Users" },
      { id: "headmaster-3", title: "Operator", href: "/dashboard/headmaster/operators", iconName: "Briefcase" },
      { id: "headmaster-4", title: "Siswa", href: "/dashboard/headmaster/students", iconName: "GraduationCap" },
      { id: "headmaster-5", title: "Informasi Sekolah", href: "/dashboard/headmaster/school-info", iconName: "School" },
      { id: "headmaster-6", title: "Laporan", href: "/dashboard/headmaster/reports", iconName: "FileText" },
      { id: "headmaster-7", title: "Analitik", href: "/dashboard/headmaster/analytics", iconName: "LineChart" },
      { id: "headmaster-8", title: "Pengaturan", href: "/dashboard/headmaster/settings", iconName: "Settings" }
    ]
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Return mock data for the requested role, or empty array if role not found
  return mapApiMenuItems(mockApiData[role] || [])
}

// The hook
export function useMenuItems(role: string) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function getMenuItems() {
      try {
        setIsLoading(true)
        const items = await fetchMenuItems(role)

        if (isMounted) {
          setMenuItems(items)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch menu items'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    getMenuItems()

    return () => {
      isMounted = false
    }
  }, [role])

  return { menuItems, isLoading, error }
}
