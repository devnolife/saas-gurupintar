"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getRemainingQuota } from "@/lib/accountQuotaManager"
import { Button } from "@/components/ui/button"

interface QuotaDisplayProps {
  schoolId: string
  onUpgradeRequest: () => void
}

export function QuotaDisplay({ schoolId, onUpgradeRequest }: QuotaDisplayProps) {
  const [quota, setQuota] = useState<{ operators: number; teachers: number } | undefined>(undefined)

  useState(() => {
    const q = getRemainingQuota(schoolId)
    setQuota(q)
  }, [schoolId])

  if (!quota) {
    return <Card>Loading...</Card>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Quotas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Guru</p>
            <p className="text-lg font-bold">{quota.teachers}</p>
          </div>
          <Progress value={quota.teachers} max={50} className="w-24" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Operator</p>
            <p className="text-lg font-bold">{quota.operators}</p>
          </div>
          <Progress value={quota.operators} max={2} className="w-24" />
        </div>
        {quota.teachers <= 0 || quota.operators <= 0 ? (
          <Button onClick={onUpgradeRequest} variant="outline">
            Upgrade Plan
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

