import type * as React from "react"

import { cn } from "@/lib/utils"

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({ heading, description, actions, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("md:flex md:items-center md:justify-between space-y-2 md:space-y-0", className)} {...props}>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{heading}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

