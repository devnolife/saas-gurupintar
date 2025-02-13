/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import type { LucideIcon } from "lucide-react"

interface SidebarProps {
  user: {
    name: string
    role: string
  }
  items: {
    title: string
    href: string
    icon: LucideIcon
  }[]
}

export function Sidebar({ user, items }: SidebarProps) {
  const pathname = usePathname()
  const { open } = useSidebar()

  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Guru Pintar</h2>
          <p className="text-sm text-muted-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      pathname === item.href && "bg-primary/10 text-primary",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/auth/login">Keluar</Link>
        </Button>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

