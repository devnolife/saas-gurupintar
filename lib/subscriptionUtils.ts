import prisma from "./prisma"

export async function canGenerateDocument(userId: string, documentType: "RPP" | "Syllabus"): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { school: { include: { subscription: true } } },
  })

  if (!user || !user.school || !user.school.subscription) {
    return false
  }

  const { subscription } = user.school
  const currentDate = new Date()

  // Check if the subscription is active
  if (currentDate < subscription.startDate || currentDate > subscription.endDate) {
    return false
  }

  // Get the count of documents created this month
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  let count
  if (documentType === "RPP") {
    count = await prisma.rPP.count({
      where: {
        authorId: userId,
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })
    return count < subscription.maxRPPsPerMonth
  } else {
    count = await prisma.syllabus.count({
      where: {
        authorId: userId,
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })
    return count < subscription.maxSyllabiPerMonth
  }
}

