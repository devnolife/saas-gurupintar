import { cn } from "@/lib/utils"

interface QuotaDisplayProps {
  title: string
  current: number
  max: number
  unit?: string
  className?: string
}

export function QuotaDisplay({ title, current, max, unit = "items", className }: QuotaDisplayProps) {
  const percentage = Math.min(100, Math.round((current / max) * 100))
  const remaining = max - current

  // Determine color based on usage
  const getProgressColor = () => {
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-amber-500"
    return "bg-green-500"
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{title}</span>
        <span>
          {current} / {max} {unit}
        </span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground">
        {remaining === 0 ? (
          <span className="text-red-500 font-medium">No {unit} remaining. Please upgrade.</span>
        ) : (
          <span>
            {remaining} {unit} remaining
          </span>
        )}
      </div>
    </div>
  )
}

