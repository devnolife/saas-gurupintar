import { deleteCookie, getCookie, setCookie } from "cookies-next"

// Define user session type
export interface UserSession {
  id: string
  name: string
  email: string
  role: "admin" | "operator" | "teacher" | "student" | "headmaster"
}

// Session management
export const SESSION_COOKIE_NAME = "guru_pintar_session"

// Get current user session
export function getCurrentUser(): UserSession | null {
  try {
    const sessionData = getCookie(SESSION_COOKIE_NAME)
    if (!sessionData) return null

    return JSON.parse(String(sessionData)) as UserSession
  } catch (error) {
    console.error("Error parsing user session:", error)
    return null
  }
}

// Set user session
export function setUserSession(user: UserSession): void {
  setCookie(SESSION_COOKIE_NAME, JSON.stringify(user), {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })

  // Also store in localStorage as a backup
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_COOKIE_NAME, JSON.stringify(user))
  }
}

// Clear user session (logout)
export function clearUserSession(): void {
  deleteCookie(SESSION_COOKIE_NAME, { path: "/" })

  // Also clear from localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_COOKIE_NAME)
  }
}

