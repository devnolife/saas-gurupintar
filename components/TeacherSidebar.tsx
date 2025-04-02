"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  FileText,
  ClipboardList,
  UserCheck,
  GiftIcon
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTeacherFeatures, TeacherFeature } from "@/lib/teacherFeatureManager"
import { Skeleton } from "./ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  feature?: TeacherFeature;
}

export function TeacherSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  // In a real application, you'd get the current teacher's ID from authentication context
  const teacherId = "teacher4" // Example teacher ID
  const { features, hasFeature, loading } = useTeacherFeatures(teacherId)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Define all possible navigation items with their associated features
  const allNavigationItems: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/teacher",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />
    },
    {
      title: "RPP & Soal Ujian",
      href: "/teacher/lessons",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      feature: "rpp_exam"
    },
    {
      title: "Absensi",
      href: "/teacher/attendance",
      icon: <UserCheck className="mr-2 h-4 w-4" />,
      feature: "attendance"
    },
    {
      title: "Laporan Harian",
      href: "/teacher/daily-reports",
      icon: <ClipboardList className="mr-2 h-4 w-4" />,
      feature: "daily_reports"
    },
    {
      title: "Jadwal",
      href: "/teacher/schedule",
      icon: <Calendar className="mr-2 h-4 w-4" />
    },
    {
      title: "Siswa",
      href: "/teacher/students",
      icon: <Users className="mr-2 h-4 w-4" />
    },
    {
      title: "Pengaturan",
      href: "/teacher/settings",
      icon: <Settings className="mr-2 h-4 w-4" />
    }
  ]

  // Filter navigation items based on teacher's features
  const getFilteredNavItems = (): NavigationItem[] => {
    return allNavigationItems.filter(item => {
      // If the item has no feature requirement, always show it
      if (!item.feature) return true;
      
      // Otherwise, check if the teacher has access to the feature
      return hasFeature(item.feature);
    });
  }

  // If not mounted or still loading features, show skeleton
  if (!mounted || loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <Skeleton className="h-8 w-4/5" />
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i}>
                <Skeleton className="h-10 w-full" />
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    )
  }

  const filteredNavItems = getFilteredNavItems()
  // Count features that are available to the teacher
  const activeFeatureCount = features.length;
  // Count total available features
  const totalFeatureCount = 3; // rpp_exam, attendance, daily_reports

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Guru</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-sm text-muted-foreground">Fitur: {activeFeatureCount}/{totalFeatureCount}</div>
            <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${(activeFeatureCount / totalFeatureCount) * 100}%` }}
              ></div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/pricing">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <GiftIcon className="h-4 w-4 text-primary" />
                    <span className="sr-only">Upgrade</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upgrade paket untuk fitur tambahan</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {filteredNavItems.map((item) => (
              <li key={item.title}>
                <Button 
                  asChild 
                  variant={pathname === item.href ? "default" : "ghost"} 
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href ? "bg-primary text-primary-foreground" : ""
                  )}
                >
                  <Link href={item.href}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}

