import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// POST /api/auth/logout - User logout
export async function POST(request: NextRequest) {
  try {
    // Clear session cookie
    cookies().delete("session")

    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("Error during logout:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}

