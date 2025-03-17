import type React from "react"
import { BaseLayout } from "./BaseLayout"
import { OperatorSidebar } from "./OperatorSidebar"

interface OperatorLayoutProps {
  children: React.ReactNode
}

export function OperatorLayout({ children }: OperatorLayoutProps) {
  return <BaseLayout sidebar={<OperatorSidebar />}>{children}</BaseLayout>
}

