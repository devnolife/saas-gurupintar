import type React from "react"
import { HeadmasterSidebar } from "@/components/HeadmasterSidebar"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HeadmasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <HeadmasterSidebar />
      <div className="flex-1 overflow-auto">
        <main className="flex-1">{children ? children : null}</main>
        <ScrollToTop />
      </div>
    </div>
  )
}

