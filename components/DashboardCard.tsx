import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { ArrowDown, ArrowUp } from "lucide-react"

interface DashboardCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  colorScheme?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger"
  className?: string
}

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  colorScheme = "primary",
  className,
}: DashboardCardProps) {
  const colorMap = {
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/20",
      gradient: "from-primary/20 to-primary/5",
    },
    secondary: {
      bg: "bg-secondary/10",
      text: "text-secondary",
      border: "border-secondary/20",
      gradient: "from-secondary/20 to-secondary/5",
    },
    accent: {
      bg: "bg-accent/10",
      text: "text-accent",
      border: "border-accent/20",
      gradient: "from-accent/20 to-accent/5",
    },
    success: {
      bg: "bg-green-500/10",
      text: "text-green-500",
      border: "border-green-500/20",
      gradient: "from-green-500/20 to-green-500/5",
    },
    warning: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
      border: "border-yellow-500/20",
      gradient: "from-yellow-500/20 to-yellow-500/5",
    },
    danger: {
      bg: "bg-red-500/10",
      text: "text-red-500",
      border: "border-red-500/20",
      gradient: "from-red-500/20 to-red-500/5",
    },
  }

  return (
    <Card className={cn("overflow-hidden border-none shadow-md hover:shadow-lg transition-all", className)}>
      {/* Remove the gradient div completely */}
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-medium text-foreground">{title}</p>
          <div className={cn("p-3 rounded-xl", colorMap[colorScheme].bg)}>
            <Icon className={cn("h-6 w-6", colorMap[colorScheme].text)} />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-1">{value}</h3>
        {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
        {trend && (
          <div
            className={cn(
              "flex items-center mt-2 text-sm font-medium",
              trend.isPositive ? "text-green-500" : "text-red-500",
            )}
          >
            {trend.isPositive ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
            <span>{Math.abs(trend.value)}%</span>
            <span className="text-muted-foreground ml-1">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

