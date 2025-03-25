// Generate mock data for teachers
import { faker } from "@faker-js/faker"

export interface Teacher {
  id: number
  name: string
  email: string
  subject: string
  status: "Active" | "Inactive" | "Pending Payment" | "Pending Approval"
  school: string
  lastActive: string
  students: number
  completedLessons: number
  joinDate: string
  avatar: string
  phone: string
  address: string
  bio: string
}

export function generateMockTeachers(count: number): Teacher[] {
  const teachers: Teacher[] = []
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Physics",
    "Chemistry",
    "Biology",
    "Geography",
    "Literature",
    "Art",
    "Music",
    "Physical Education",
    "Computer Science",
    "Economics",
  ]

  const statuses: ("Active" | "Inactive" | "Pending Payment" | "Pending Approval")[] = [
    "Active",
    "Inactive",
    "Pending Payment",
    "Pending Approval",
  ]

  const schools = [
    "SMA Negeri 1 Jakarta",
    "SMA Negeri 2 Surabaya",
    "SMA Negeri 3 Bandung",
    "SMA Santo Aloysius",
    "SMA Negeri 1 Yogyakarta",
    "SMA Negeri 5 Jakarta",
  ]

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = `${firstName} ${lastName}`
    const email = faker.internet.email({ firstName, lastName }).toLowerCase()

    const subject = faker.helpers.arrayElement(subjects)
    const status = faker.helpers.arrayElement(statuses)
    const school = faker.helpers.arrayElement(schools)

    const students = faker.number.int({ min: 0, max: 50 })
    const completedLessons = faker.number.int({ min: 0, max: 300 })

    const joinDate = faker.date.past({ years: 2 }).toISOString().split("T")[0]
    const lastActive = faker.date.recent({ days: 30 }).toISOString()

    teachers.push({
      id: i + 1,
      name,
      email,
      subject,
      status,
      school,
      lastActive: faker.helpers.arrayElement([
        "Just now",
        "2 hours ago",
        "Yesterday",
        "3 days ago",
        "1 week ago",
        "2 weeks ago",
      ]),
      students,
      completedLessons,
      joinDate,
      avatar: `/placeholder.svg?height=40&width=40`,
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      bio: faker.lorem.paragraph(),
    })
  }

  return teachers
}

