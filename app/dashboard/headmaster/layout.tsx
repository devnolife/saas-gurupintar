"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { UnifiedDashboardLayout } from "@/components/dashboard/UnifiedDashboardLayout"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HeadmasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(true)

  // This ensures we're fully rendering on the client side
  useEffect(() => {
    setIsClient(true)

    // Add a small delay to ensure everything is properly loaded
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  if (!isClient) {
    return (
      <div className="flex-1 p-8">
        <Skeleton className="h-[80vh] w-full" />
      </div>
    );
  }

  return (
    <UnifiedDashboardLayout role="headmaster">
      <div className="max-w-[1600px] mx-auto">
        {loading ? (
          <div className="p-8">
            <Skeleton className="h-[80vh] w-full" />
          </div>
        ) : (
          children
        )}
      </div>
      <ScrollToTop />
    </UnifiedDashboardLayout>
  )
}

