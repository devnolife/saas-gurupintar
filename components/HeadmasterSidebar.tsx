"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LogOut,
  Calendar,
  Search,
  Bell,
  HelpCircle,
  ChevronRight,
  Crown,
  TrendingUp,
  ClipboardList,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ThemeToggle } from "@/components/ThemeToggle"

import {
  HomeIcon,
  UsersIcon,
  GraduationCapIcon,
  BookOpenIcon,
  CalendarIcon,
  TrophyIcon,
  BarChartIcon,
  ClipboardIcon,
  UserCogIcon,
  SettingsIcon,
  Building2,
} from "lucide-react"

// Navigation items for the headmaster role
const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard/headmaster",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    title: "Informasi Sekolah",
    href: "/dashboard/headmaster/school-info",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Teachers",
    href: "/dashboard/headmaster/teachers",
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    title: "Students",
    href: "/dashboard/headmaster/students",
    icon: <GraduationCapIcon className="h-5 w-5" />,
  },
  {
    title: "Curriculum",
    href: "/dashboard/headmaster/curriculum",
    icon: <BookOpenIcon className="h-5 w-5" />,
  },
  {
    title: "Calendar",
    href: "/dashboard/headmaster/calendar",
    icon: <CalendarIcon className="h-5 w-5" />,
  },
  {
    title: "Achievements",
    href: "/dashboard/headmaster/achievements",
    icon: <TrophyIcon className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/headmaster/analytics",
    icon: <BarChartIcon className="h-5 w-5" />,
  },
  {
    title: "Reports",
    href: "/dashboard/headmaster/reports",
    icon: <ClipboardIcon className="h-5 w-5" />,
  },
  {
    title: "Operators",
    href: "/dashboard/headmaster/operators",
    icon: <UserCogIcon className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/headmaster/settings",
    icon: <SettingsIcon className="h-5 w-5" />,
  },
]

// Recent projects for quick access
const recentProjects = [
  { title: "Performa Guru", url: "#", icon: TrendingUp },
  { title: "Kalender Sekolah", url: "#", icon: Calendar },
  { title: "Rencana Kurikulum", url: "#", icon: ClipboardList },
]

export function HeadmasterSidebar() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before rendering complex UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter navigation items based on search term
  const filteredNavItems = navigationItems.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // Detect scroll position for shadow effect - with error handling
  useEffect(() => {
    if (!mounted) return

    const handleScroll = (e: Event) => {
      try {
        if (e.target) {
          const target = e.target as HTMLElement
          setIsScrolled(target.scrollTop > 10)
        }
      } catch (error) {
        console.error("Error in scroll handler:", error)
      }
    }

    try {
      const scrollArea = scrollAreaRef.current
      if (scrollArea) {
        scrollArea.addEventListener("scroll", handleScroll)
        return () => {
          try {
            if (scrollArea) {
              scrollArea.removeEventListener("scroll", handleScroll)
            }
          } catch (error) {
            console.error("Error removing scroll listener:", error)
          }
        }
      }
    } catch (error) {
      console.error("Error setting up scroll listener:", error)
    }

    return undefined
  }, [mounted])

  // Handle logout with confirmation
  const handleLogout = () => {
    setLogoutDialogOpen(true)
  }

  const confirmLogout = () => {
    // Redirect to login page
    window.location.href = "/login"
    setLogoutDialogOpen(false)
  }

  // Don't render anything until mounted
  if (!mounted) {
    return <div className="w-64 bg-white dark:bg-gray-900 border-r border-border/10"></div>
  }

  return (
    <TooltipProvider delayDuration={300}>
      <SidebarProvider>
        <Sidebar
          collapsible="icon"
          className="border-r border-border/10 transition-all duration-300 m-0 p-0 bg-white dark:bg-gray-900/95 backdrop-blur-sm"
        >
          <SidebarHeader
            className={cn(
              "px-6 py-5 transition-all duration-300 sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
              isScrolled && "shadow-sm",
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-primary to-primary-light p-2.5 rounded-xl shadow-md">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Guru Pintar
              </h2>
            </div>

            <div className="relative group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                placeholder="Cari menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-border/20 rounded-xl h-10 focus-visible:ring-primary/20 bg-muted/30 transition-all focus-visible:bg-white dark:focus-visible:bg-gray-800"
              />
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4 py-2">
            <ScrollArea className="h-[calc(100vh-15rem)] sidebar-scroll-area" ref={scrollAreaRef}>
              <div className="space-y-6">
                <div>
                  <div className="px-4 py-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      Menu Utama
                    </h3>
                  </div>
                  <SidebarMenu>
                    {filteredNavItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "group flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all text-sm",
                                pathname === item.href
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-foreground hover:bg-muted/50",
                                hoveredItem === item.title && pathname !== item.href && "bg-muted/30 translate-x-1",
                              )}
                              onMouseEnter={() => setHoveredItem(item.title)}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center h-8 w-8 rounded-lg transition-all",
                                  pathname === item.href ? "bg-primary/20" : "bg-muted/30 group-hover:bg-primary/10",
                                )}
                              >
                                {item.icon}
                              </div>
                              <span className="transition-all duration-300 flex-1">{item.title}</span>
                              {pathname === item.href && <ChevronRight className="h-4 w-4 text-primary opacity-70" />}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="font-medium">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>

                {recentProjects.length > 0 && (
                  <div>
                    <div className="px-4 py-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        Akses Cepat
                      </h3>
                    </div>
                    <SidebarMenu>
                      {recentProjects.map((project) => (
                        <SidebarMenuItem key={project.title}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={project.url}
                                className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm hover:bg-muted/50 transition-all hover:translate-x-1"
                              >
                                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-muted/30 group-hover:bg-primary/10 transition-all">
                                  <project.icon className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-all" />
                                </div>
                                <span className="transition-all duration-300 flex-1">{project.title}</span>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="font-medium">
                              {project.title}
                            </TooltipContent>
                          </Tooltip>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </div>
                )}
              </div>
            </ScrollArea>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/10 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4 p-2 rounded-xl hover:bg-muted/30 transition-all duration-300 cursor-pointer">
              <Avatar className="h-10 w-10 border-2 border-primary/20 transition-all duration-300 hover:border-primary">
                <AvatarImage src="/placeholder.svg" alt="Kepala Sekolah" />
                <AvatarFallback className="bg-primary/10 text-primary">KS</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Dr. Hadi Wijaya</p>
                <p className="text-xs text-muted-foreground truncate">Kepala Sekolah</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 rounded-xl border-border/20 hover:bg-destructive/10 hover:text-destructive text-sm mb-4 transition-all duration-300"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar</span>
            </Button>

            <div className="flex justify-between mt-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-lg hover:bg-primary/10 transition-all duration-300"
                  >
                    <Bell className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifikasi</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-lg hover:bg-primary/10 transition-all duration-300"
                  >
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bantuan</TooltipContent>
              </Tooltip>

              <ThemeToggle />
            </div>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>
      </SidebarProvider>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent className="max-w-md rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin keluar? Anda perlu login kembali untuk mengakses akun Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-lg">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-destructive hover:bg-destructive/90 rounded-lg">
              Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}

