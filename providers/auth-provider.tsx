"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)

    // If on a protected route and not logged in, redirect to login
    const isProtectedRoute =
      pathname?.startsWith("/dashboard") && !pathname?.includes("/login") && !pathname?.includes("/register")

    if (isProtectedRoute && !currentUser) {
      router.push("/login")
    }

    // If logged in and trying to access a role-specific route that doesn't match the user's role
    if (currentUser && isProtectedRoute) {
      const userRole = currentUser.role
      const isAdminRoute = pathname?.includes("/admin")
      const isOperatorRoute = pathname?.includes("/operator")
      const isTeacherRoute = pathname?.includes("/teacher")
      const isHeadmasterRoute = pathname?.includes("/headmaster")
      const isStudentRoute = pathname?.includes("/student")

      if (
        (isAdminRoute && userRole !== "admin") ||
        (isOperatorRoute && userRole !== "operator") ||
        (isTeacherRoute && userRole !== "teacher") ||
        (isHeadmasterRoute && userRole !== "headmaster") ||
        (isStudentRoute && userRole !== "student")
      ) {
        // Redirect to the appropriate dashboard based on role
        if (userRole === "admin") {
          router.push("/dashboard/admin")
        } else if (userRole === "operator") {
          router.push("/dashboard/operator")
        } else if (userRole === "teacher") {
          router.push("/dashboard/teacher")
        } else if (userRole === "headmaster") {
          router.push("/dashboard/headmaster")
        } else if (userRole === "student") {
          router.push("/dashboard/student")
        }
      }
    }
  }, [pathname, router])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

