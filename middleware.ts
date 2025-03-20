import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simplified middleware to avoid initialization issues
export function middleware(request: NextRequest) {
  // For development, allow all requests to proceed
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next()
  }

  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname

  // In production, implement proper authentication checks
  // For now, we'll just allow all requests to proceed
  return NextResponse.next()
}

// Limit middleware to specific paths to reduce initialization overhead
export const config = {
  matcher: ["/dashboard/:path*"],
}

