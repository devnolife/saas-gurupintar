// Types
type PlanType = "Basic" | "Standard" | "Premium" | "Enterprise"

interface SchoolSubscription {
  id: string
  schoolId: string
  planType: PlanType
  maxOperators: number
  maxTeachers: number
  currentOperators: number
  currentTeachers: number
  expirationDate: Date
}

// Mock database
const subscriptions: SchoolSubscription[] = [
  {
    id: "1",
    schoolId: "school1",
    planType: "Standard",
    maxOperators: 2,
    maxTeachers: 50,
    currentOperators: 1,
    currentTeachers: 30,
    expirationDate: new Date("2024-12-31"),
  },
  {
    id: "2",
    schoolId: "school2",
    planType: "Premium",
    maxOperators: 3,
    maxTeachers: 100,
    currentOperators: 2,
    currentTeachers: 75,
    expirationDate: new Date("2024-12-31"),
  },
]

// Utility functions
export function getSchoolSubscription(schoolId: string): SchoolSubscription | undefined {
  return subscriptions.find((sub) => sub.schoolId === schoolId)
}

export function canAddOperator(schoolId: string): boolean {
  const subscription = getSchoolSubscription(schoolId)
  if (!subscription) return false
  return subscription.currentOperators < subscription.maxOperators
}

export function canAddTeacher(schoolId: string): boolean {
  const subscription = getSchoolSubscription(schoolId)
  if (!subscription) return false
  return subscription.currentTeachers < subscription.maxTeachers
}

export function addOperator(schoolId: string): boolean {
  const subscription = getSchoolSubscription(schoolId)
  if (!subscription || !canAddOperator(schoolId)) return false
  subscription.currentOperators++
  return true
}

export function addTeacher(schoolId: string): boolean {
  const subscription = getSchoolSubscription(schoolId)
  if (!subscription || !canAddTeacher(schoolId)) return false
  subscription.currentTeachers++
  return true
}

export function getQuotaUsage(schoolId: string): { operators: number; teachers: number } | undefined {
  const subscription = getSchoolSubscription(schoolId)
  if (!subscription) return undefined
  return {
    operators: subscription.currentOperators,
    teachers: subscription.currentTeachers,
  }
}

export function getRemainingQuota(schoolId: string): { operators: number; teachers: number } | undefined {
  const subscription = getSchoolSubscription(schoolId)
  if (!subscription) return undefined
  return {
    operators: subscription.maxOperators - subscription.currentOperators,
    teachers: subscription.maxTeachers - subscription.currentTeachers,
  }
}

export function upgradePlan(schoolId: string, newPlanType: PlanType): boolean {
  const subscription = getSchoolSubscription(schoolId)
  if (!subscription) return false

  // In a real implementation, you would check if the new plan is actually an upgrade
  // and update the maxOperators and maxTeachers accordingly
  subscription.planType = newPlanType
  return true
}

// This function would be called when a school wants to purchase additional teacher accounts
export function purchaseAdditionalTeacherAccounts(schoolId: string, additionalAccounts: number): boolean {
  const subscription = getSchoolSubscription(schoolId)
  if (!subscription) return false

  // In a real implementation, you would handle payment processing here
  subscription.maxTeachers += additionalAccounts
  return true
}

