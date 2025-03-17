"use client"

import { useSearchParams } from "next/navigation"
import { TeacherPricingPage } from "@/components/TeacherPricingPage"

export default function PricingPage() {
  const searchParams = useSearchParams()
  const schoolId = searchParams.get("schoolId")
  const teacherId = searchParams.get("teacherId")

  if (!schoolId || !teacherId) {
    return <div>Invalid parameters</div>
  }

  return <TeacherPricingPage schoolId={schoolId} teacherId={teacherId} />
}

