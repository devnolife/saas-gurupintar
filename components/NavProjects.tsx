import type * as React from "react"
import Link from "next/link"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

interface Project {
  name: string
  url: string
  icon: React.ElementType
}

interface NavProjectsProps {
  projects: Project[]
}

export function NavProjects({ projects }: NavProjectsProps) {
  return (
    <div>
      <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">Projects</h3>
      <SidebarMenu>
        {projects.map((project) => (
          <SidebarMenuItem key={project.name}>
            <SidebarMenuButton asChild>
              <Link href={project.url} className="flex items-center">
                <project.icon className="mr-2 h-4 w-4" />
                {project.name}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  )
}

