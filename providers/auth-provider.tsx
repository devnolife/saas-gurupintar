"use client"

import { createContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser, type UserSession } from "@/lib/auth"

interface AuthContextType {
  user: UserSession | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    try {
      // Check if user is logged in
      const currentUser = getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error("Error in auth provider:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    try {
      // If on a protected route and not logged in, redirect to login
      const isProtectedRoute =
        pathname?.startsWith("/dashboard") && !pathname?.includes("/login") && !pathname?.includes("/register")

      // For development, we'll skip the authentication check
      if (process.env.NODE_ENV === "development") {
        return
      }

      const currentUser = getCurrentUser()
      if (isProtectedRoute && !currentUser) {
        router.push("/login")
      }
    } catch (error) {
      console.error("Error in auth redirect:", error)
    }
  }, [pathname, router, mounted])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

