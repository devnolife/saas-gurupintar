"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { clearUserSession, getCurrentUser, setUserSession, type UserSession } from "@/lib/auth"

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize user on mount
  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  // Login function
  const login = (userData: UserSession) => {
    setUserSession(userData)
    setUser(userData)
  }

  // Logout function
  const logout = () => {
    clearUserSession()
    setUser(null)
    router.push("/")
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }
}

