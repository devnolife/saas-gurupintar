import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"

interface DashboardCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ComponentType<any>
  trend?: {
    value: number
    isPositive: boolean
  }
  colorScheme?: "primary" | "secondary" | "accent" | "warning"
  className?: string
}

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  colorScheme = "primary",
  className = "",
}: DashboardCardProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    warning: "bg-orange-500/10 text-orange-500",
  }

  return (
    <Card className={cn("border-none shadow-md bg-white dark:bg-gray-900 rounded-2xl overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && (
          <div className={cn("p-2 rounded-full", colorClasses[colorScheme])}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className="flex items-center mt-2">
            {trend && (
              <span
                className={cn(
                  "mr-1 flex items-center text-xs font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500",
                )}
              >
                {trend.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {trend.value}%
              </span>
            )}
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

