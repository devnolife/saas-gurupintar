"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { HeadmasterSidebar } from "@/components/HeadmasterSidebar"
import { useAuth } from "@/hooks/use-auth"
import { hasFeatureAccess } from "@/lib/subscriptionService"

export function HeadmasterLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and has the headmaster role
    if (!user) {
      router.push("/login")
      return
    }

    if (user.role !== "headmaster") {
      router.push("/dashboard")
      return
    }

    // Check if the user has access to headmaster features
    const hasAccess = hasFeatureAccess(user.id, "headmaster_features")
    if (!hasAccess) {
      // Redirect to pricing page if they don't have access
      router.push("/#pricing")
    }
  }, [user, router])

  if (!user || user.role !== "headmaster") {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <HeadmasterSidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">{children ? children : null}</main>
      </div>
    </div>
  )
}

