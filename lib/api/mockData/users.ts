// Generate mock data for users
import { faker } from "@faker-js/faker"

export interface User {
  id: number
  name: string
  email: string
  role: "Admin" | "Operator" | "Teacher" | "Headmaster"
  status: "Active" | "Inactive" | "Pending"
  lastActive: string
  avatar: string
  phone: string
  joinDate: string
  school: string
  permissions: string[]
  bio: string
}

export function generateMockUsers(count: number): User[] {
  const users: User[] = []
  const roles: ("Admin" | "Operator" | "Teacher" | "Headmaster")[] = ["Admin", "Operator", "Teacher", "Headmaster"]
  const statuses: ("Active" | "Inactive" | "Pending")[] = ["Active", "Inactive", "Pending"]

  const schools = [
    "SMA Negeri 1 Jakarta",
    "SMA Negeri 2 Surabaya",
    "SMA Negeri 3 Bandung",
    "SMA Santo Aloysius",
    "SMA Negeri 1 Yogyakarta",
    "SMA Negeri 5 Jakarta",
    "System Admin",
  ]

  const permissionsByRole = {
    Admin: ["Full Access", "System Configuration", "User Management"],
    Operator: ["View Reports", "Edit Teachers", "Manage Classes"],
    Teacher: ["Create Lessons", "View Students"],
    Headmaster: ["View Reports", "Approve Curriculum", "Manage School"],
  }

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = `${firstName} ${lastName}`
    const email = faker.internet.email({ firstName, lastName }).toLowerCase()

    const role = faker.helpers.arrayElement(roles)
    const status = faker.helpers.arrayElement(statuses)
    const school = role === "Admin" ? "System Admin" : faker.helpers.arrayElement(schools)

    const joinDate = faker.date.past({ years: 2 }).toISOString().split("T")[0]
    const lastActive = faker.helpers.arrayElement([
      "Today at 2:34 PM",
      "Yesterday at 10:15 AM",
      "3 days ago",
      "Just now",
      "1 week ago",
    ])

    users.push({
      id: i + 1,
      name,
      email,
      role,
      status,
      lastActive,
      avatar: `/placeholder.svg?height=40&width=40`,
      phone: faker.phone.number(),
      joinDate,
      school,
      permissions: permissionsByRole[role],
      bio: faker.lorem.paragraph(),
    })
  }

  return users
}

