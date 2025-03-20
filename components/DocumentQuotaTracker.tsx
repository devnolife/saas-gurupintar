"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { FileText, PlusCircle } from "lucide-react"

interface DocumentQuotaTrackerProps {
  totalQuota: number
  usedQuota: number
  onUpgrade?: () => void
}

export function DocumentQuotaTracker({ totalQuota, usedQuota, onUpgrade }: DocumentQuotaTrackerProps) {
  const remainingQuota = totalQuota - usedQuota
  const percentageUsed = (usedQuota / totalQuota) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          Document Generation Quota
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{usedQuota} used</span>
              <span>{remainingQuota} remaining</span>
            </div>
            <Progress value={percentageUsed} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-2xl font-bold">{usedQuota}</p>
              <p className="text-xs text-muted-foreground">Documents Generated</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-2xl font-bold">{totalQuota}</p>
              <p className="text-xs text-muted-foreground">Total Quota</p>
            </div>
          </div>

          {onUpgrade && remainingQuota < 10 && (
            <Button onClick={onUpgrade} className="w-full" variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Upgrade Quota
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

