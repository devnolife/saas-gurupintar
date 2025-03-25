// Generate mock data for schools
import { faker } from "@faker-js/faker"

export interface School {
  id: number
  name: string
  address: string
  city: string
  province: string
  postalCode: string
  phone: string
  email: string
  website: string
  principalName: string
  studentCount: number
  teacherCount: number
  foundedYear: number
  status: "Active" | "Inactive"
  type: "Public" | "Private"
  accreditation: "A" | "B" | "C"
}

export function generateMockSchools(count: number): School[] {
  const schools: School[] = []
  const cities = ["Jakarta", "Surabaya", "Bandung", "Yogyakarta", "Semarang", "Medan", "Makassar"]
  const provinces = [
    "DKI Jakarta",
    "Jawa Timur",
    "Jawa Barat",
    "DI Yogyakarta",
    "Jawa Tengah",
    "Sumatera Utara",
    "Sulawesi Selatan",
  ]
  const types: ("Public" | "Private")[] = ["Public", "Private"]
  const accreditations: ("A" | "B" | "C")[] = ["A", "B", "C"]

  for (let i = 0; i < count; i++) {
    const cityIndex = i % cities.length
    const city = cities[cityIndex]
    const province = provinces[cityIndex]

    const name = `SMA ${faker.helpers.arrayElement(["Negeri", "Swasta"])} ${i + 1} ${city}`
    const type = name.includes("Negeri") ? "Public" : "Private"

    schools.push({
      id: i + 1,
      name,
      address: faker.location.streetAddress(),
      city,
      province,
      postalCode: faker.location.zipCode(),
      phone: faker.phone.number(),
      email: faker.internet.email({ firstName: name.replace(/\s+/g, ".").toLowerCase() }),
      website: `http://www.${name.replace(/\s+/g, "-").toLowerCase()}.sch.id`,
      principalName: faker.person.fullName(),
      studentCount: faker.number.int({ min: 300, max: 1500 }),
      teacherCount: faker.number.int({ min: 20, max: 100 }),
      foundedYear: faker.number.int({ min: 1950, max: 2010 }),
      status: faker.helpers.arrayElement(["Active", "Active", "Active", "Inactive"]),
      type,
      accreditation: faker.helpers.arrayElement(accreditations),
    })
  }

  return schools
}

