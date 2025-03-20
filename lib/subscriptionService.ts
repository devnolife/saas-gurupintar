export interface Subscription {
  id: string
  schoolId: string
  plan: string
  maxTeachers: number
  maxDocuments: number
  startDate: string
  endDate: string
  status?: "active" | "inactive"
  features: string[]
}

// Mock subscription data
const subscriptions = {
  operator1: {
    id: "sub1",
    schoolId: "school1",
    plan: "basic",
    maxTeachers: 50,
    maxDocuments: 500,
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    status: "active",
    features: ["basic_reports"],
  },
  operator2: {
    id: "sub2",
    schoolId: "school2",
    plan: "premium",
    maxTeachers: 100,
    maxDocuments: 1000,
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    status: "active",
    features: ["reports", "advanced_analytics", "bulk_operations"],
  },
  headmaster1: {
    id: "sub3",
    schoolId: "school3",
    plan: "premium",
    maxTeachers: 150,
    maxDocuments: 1500,
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    status: "active",
    features: ["headmaster_features", "reports", "advanced_analytics"],
  },
}

/**
 * Get subscription information for a user
 */
export function getSubscription(userId: string): Subscription | null {
  if (subscriptions[userId]) {
    return subscriptions[userId] as Subscription
  }
  return null
}

/**
 * Check if a user has access to a specific feature
 */
export function hasFeatureAccess(userId: string, feature: string): boolean {
  const subscription = getSubscription(userId)
  return !!subscription && subscription.features.includes(feature)
}

