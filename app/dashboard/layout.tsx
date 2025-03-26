import { ApolloProvider } from "@/providers/ApolloProvider"
import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <ApolloProvider>{children}</ApolloProvider>
}

