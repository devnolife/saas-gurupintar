import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

// Use strings directly instead of enums to avoid any import issues
async function main() {
  console.log("Starting database seeding...")

  // First, clear the database to avoid duplicates
  await clearDatabase()

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "password123", // In production, hash this password
      role: "ADMIN",
      status: "ACTIVE",
      admin: {
        create: {
          permissions: ["MANAGE_USERS", "MANAGE_TEACHERS", "MANAGE_SCHOOLS", "MANAGE_SUBSCRIPTIONS"],
        },
      },
    },
  })
  console.log(`Created admin user: ${adminUser.name} (${adminUser.email})`)

  // Create a school
  const school = await prisma.school.create({
    data: {
      name: "SMA Negeri 1 Jakarta",
      address: "Jl. Medan Merdeka Selatan No.1, Jakarta",
      city: "Jakarta",
      province: "DKI Jakarta",
      postalCode: "10110",
      phone: "+62 21-1234567",
      email: "contact@sman1jkt.sch.id",
      type: "PUBLIC",
      status: "ACTIVE",
    },
  })
  console.log(`Created school: ${school.name}`)

  // Create teacher user
  const teacherUser = await prisma.user.create({
    data: {
      name: "Teacher User",
      email: "teacher@example.com",
      password: "password123", // In production, hash this password
      role: "TEACHER",
      status: "ACTIVE",
      teacher: {
        create: {
          subject: "Mathematics",
          qualification: "Master of Education",
          experience: 5,
          schoolId: school.id,
        },
      },
    },
  })
  console.log(`Created teacher user: ${teacherUser.name} (${teacherUser.email})`)

  // Create student user
  const studentUser = await prisma.user.create({
    data: {
      name: "Student User",
      email: "student@example.com",
      password: "password123", // In production, hash this password
      role: "STUDENT",
      status: "ACTIVE",
      student: {
        create: {
          grade: "11",
          class: "11-A",
          age: 16,
          gender: "MALE",
          parentName: "Parent Name",
          schoolId: school.id,
        },
      },
    },
  })
  console.log(`Created student user: ${studentUser.name} (${studentUser.email})`)

  console.log("Database seeding completed.")
}

// Helper function to clear the database
async function clearDatabase() {
  const tablesToClear = [
    "admin",
    "teacher",
    "student",
    "headmaster",
    "operator",
    "user",
    "school",
  ]

  for (const table of tablesToClear) {
    try {
      // @ts-ignore - Dynamic table name
      await prisma[table].deleteMany({})
      console.log(`Cleared table: ${table}`)
    } catch (error) {
      console.error(`Error clearing table ${table}:`, error)
    }
  }
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 