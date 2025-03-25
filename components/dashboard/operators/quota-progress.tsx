import { Progress } from "@/components/ui/progress"

interface QuotaUsage {
  total: number
  used: number
  remaining: number
  lastUpdated: string
}

interface QuotaProgressProps {
  quotaUsage: QuotaUsage
}

export function QuotaProgress({ quotaUsage }: QuotaProgressProps) {
  const percentage = Math.round((quotaUsage.used / quotaUsage.total) * 100)

  // Determine color based on usage percentage
  const getProgressColor = () => {
    if (percentage < 60) return "bg-green-500"
    if (percentage < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>
          {quotaUsage.used.toLocaleString()} / {quotaUsage.total.toLocaleString()}
        </span>
        <span className="font-medium">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>{quotaUsage.total.toLocaleString()}</span>
      </div>
    </div>
  )
}

