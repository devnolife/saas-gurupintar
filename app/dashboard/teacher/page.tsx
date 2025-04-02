"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TeacherPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/dashboard/teacher/dashboard")
  }, [router])

  // Return empty div or loading state while redirecting
  return <div className="flex items-center justify-center h-screen">Redirecting...</div>
}

