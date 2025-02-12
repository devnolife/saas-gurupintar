import { OperatorLayout  } from "@/components/OperatorLayout"
import type React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <OperatorLayout >
      {children}
    </OperatorLayout>
  )
}
