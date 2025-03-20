export type Subscription = {
  plan: string
  features: string[]
  status: "active" | "inactive" | "pending"
  startDate: string
  endDate: string
}

// Mock subscription data
const subscriptions = {
  operator1: {
    plan: "basic",
    features: ["basic_reports"],
    status: "active",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
  },
  headmaster1: {
    plan: "premium",
    features: ["headmaster_features", "advanced_reports", "analytics"],
    status: "active",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
  },
}

/**
 * Get user subscription details
 */
export function getSubscription(userId: string): Subscription | null {
  return subscriptions[userId as keyof typeof subscriptions] || null
}

/**
 * Check if a user has access to a specific feature
 */
export function hasFeatureAccess(userId: string, feature: string): boolean {
  const subscription = getSubscription(userId)
  return !!subscription && subscription.features.includes(feature)
}

