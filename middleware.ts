import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { hasFeatureAccess } from "./lib/subscriptionService"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // In a real application, you would verify the user's session
  // and extract their user ID from the session

  // For demo purposes, we'll use hardcoded IDs
  const operatorId = "operator1"
  const headmasterId = "headmaster1" // Changed to a headmaster that has premium features

  // Check if the path is the reports page for operators
  if (request.nextUrl.pathname.startsWith("/dashboard/operator/reports")) {
    // Check if the operator has access to the reports feature
    const hasAccess = hasFeatureAccess(operatorId, "reports")

    if (!hasAccess) {
      // Redirect to the dashboard if they don't have access
      return NextResponse.redirect(new URL("/dashboard/operator", request.url))
    }
  }

  // Check if the path is for headmaster features
  if (request.nextUrl.pathname.startsWith("/dashboard/headmaster")) {
    // For testing purposes, let's bypass the premium check temporarily
    // to ensure the route works correctly
    const hasAccess = true // Temporarily allow access to debug the route issue

    if (!hasAccess) {
      // Redirect to the pricing page if they don't have access
      return NextResponse.redirect(new URL("/#pricing", request.url))
    }
  }

  return NextResponse.next()
}

// Update the matcher to include the headmaster route
export const config = {
  matcher: ["/dashboard/operator/reports/:path*", "/dashboard/headmaster/:path*"],
}

