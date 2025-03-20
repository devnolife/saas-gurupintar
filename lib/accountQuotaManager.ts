// Mock data for account quotas
const schoolQuotas = {
  school1: {
    maxTeacherAccounts: 50,
    usedTeacherAccounts: 42,
    maxDocuments: 500,
    usedDocuments: 320,
  },
  school2: {
    maxTeacherAccounts: 25,
    usedTeacherAccounts: 10,
    maxDocuments: 250,
    usedDocuments: 75,
  },
}

// Teacher document quotas
const teacherQuotas = {
  teacher1: {
    maxDocuments: 50,
    usedDocuments: 32,
  },
  teacher2: {
    maxDocuments: 30,
    usedDocuments: 15,
  },
}

/**
 * Get the maximum number of teacher accounts allowed for a school
 */
export function getTeacherQuota(schoolId: string): number {
  return schoolQuotas[schoolId]?.maxTeacherAccounts || 0
}

/**
 * Get the number of teacher accounts already created for a school
 */
export function getUsedTeacherQuota(schoolId: string): number {
  return schoolQuotas[schoolId]?.usedTeacherAccounts || 0
}

/**
 * Get the remaining number of teacher accounts that can be created
 */
export function getRemainingQuota(schoolId: string): number {
  const maxQuota = getTeacherQuota(schoolId)
  const usedQuota = getUsedTeacherQuota(schoolId)
  return Math.max(0, maxQuota - usedQuota)
}

/**
 * Use a specified amount of teacher account quota
 */
export function useQuota(schoolId: string, amount = 1): boolean {
  if (!schoolQuotas[schoolId]) return false

  const remainingQuota = getRemainingQuota(schoolId)
  if (remainingQuota < amount) return false

  schoolQuotas[schoolId].usedTeacherAccounts += amount
  return true
}

/**
 * Increase the maximum teacher account quota for a school
 */
export function increaseQuota(schoolId: string, amount: number): boolean {
  if (!schoolQuotas[schoolId]) return false

  schoolQuotas[schoolId].maxTeacherAccounts += amount
  return true
}

/**
 * Get the maximum number of documents a teacher can generate
 */
export function getTeacherDocumentQuota(teacherId: string): number {
  return teacherQuotas[teacherId]?.maxDocuments || 0
}

/**
 * Get the number of documents a teacher has already generated
 */
export function getTeacherUsedDocumentQuota(teacherId: string): number {
  return teacherQuotas[teacherId]?.usedDocuments || 0
}

/**
 * Get the remaining number of documents a teacher can generate
 */
export function getTeacherRemainingDocumentQuota(teacherId: string): number {
  const maxQuota = getTeacherDocumentQuota(teacherId)
  const usedQuota = getTeacherUsedDocumentQuota(teacherId)
  return Math.max(0, maxQuota - usedQuota)
}

/**
 * Use a specified amount of document generation quota for a teacher
 */
export function useTeacherDocumentQuota(teacherId: string, amount = 1): boolean {
  if (!teacherQuotas[teacherId]) return false

  const remainingQuota = getTeacherRemainingDocumentQuota(teacherId)
  if (remainingQuota < amount) return false

  teacherQuotas[teacherId].usedDocuments += amount
  return true
}

/**
 * Increase the maximum document quota for a teacher
 */
export function increaseTeacherDocumentQuota(teacherId: string, amount: number): boolean {
  if (!teacherQuotas[teacherId]) {
    teacherQuotas[teacherId] = {
      maxDocuments: amount,
      usedDocuments: 0,
    }
    return true
  }

  teacherQuotas[teacherId].maxDocuments += amount
  return true
}

/**
 * Get subscription information for a school
 */
export function getSchoolSubscription(schoolId: string) {
  // Mock implementation - replace with actual data fetching
  if (schoolId === "school1") {
    return {
      id: "sub1",
      schoolId: "school1",
      plan: "Premium",
      maxTeachers: 50,
      maxDocuments: 500,
      startDate: "2023-01-01",
      endDate: "2024-01-01",
    }
  }
  return null
}

/**
 * Check if a school can add more teachers
 */
export function canAddTeacher(schoolId: string): boolean {
  return getRemainingQuota(schoolId) > 0
}

/**
 * Get quota usage for a school
 */
export function getQuotaUsage(schoolId: string) {
  // Mock implementation - replace with actual data fetching
  if (schoolId === "school1") {
    return {
      teachers: getUsedTeacherQuota(schoolId),
      documents: schoolQuotas[schoolId]?.usedDocuments || 0,
    }
  }
  return null
}

