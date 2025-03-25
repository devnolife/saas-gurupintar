// Generate mock data for students
import { faker } from "@faker-js/faker"

export interface Student {
  id: number
  name: string
  email: string
  grade: string
  class: string
  status: "Aktif" | "Sakit" | "Izin"
  attendance: string
  average: string
  parentName: string
  avatar: string
}

export function generateMockStudents(count: number): Student[] {
  const students: Student[] = []
  const grades = ["7", "8", "9", "10", "11", "12"]
  const classes = ["A", "B", "C", "D"]
  const statuses: ("Aktif" | "Sakit" | "Izin")[] = ["Aktif", "Sakit", "Izin"]

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = `${firstName} ${lastName}`
    const email = faker.internet.email({ firstName, lastName }).toLowerCase()

    const grade = faker.helpers.arrayElement(grades)
    const classLetter = faker.helpers.arrayElement(classes)
    const status = faker.helpers.arrayElement(statuses)

    // Generate a weighted status (more likely to be 'Aktif')
    const weightedStatus = faker.helpers.arrayElement([
      "Aktif",
      "Aktif",
      "Aktif",
      "Aktif",
      "Aktif",
      "Aktif",
      "Aktif",
      "Aktif",
      "Sakit",
      "Sakit",
      "Izin",
    ]) as "Aktif" | "Sakit" | "Izin"

    const attendance = `${faker.number.int({ min: 80, max: 100 })}%`
    const average = faker.number.float({ min: 70, max: 95, precision: 0.1 }).toFixed(1)

    const parentFirstName = faker.person.firstName()
    const parentLastName = lastName // Same last name as student
    const parentName = `${parentFirstName} ${parentLastName}`

    students.push({
      id: i + 1,
      name,
      email,
      grade,
      class: classLetter,
      status: weightedStatus,
      attendance,
      average,
      parentName,
      avatar: `/placeholder.svg?height=40&width=40`,
    })
  }

  return students
}

