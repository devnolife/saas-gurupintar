// Generate mock data for RPPs (Lesson Plans)
import { faker } from "@faker-js/faker"

export interface RPP {
  id: string
  title: string
  subject: string
  grade: string
  duration: string
  identitasModule: string
  kompetensiAwal: string
  profilPelajarPancasila: string
  saranaPrasarana: string
  targetPesertaDidik: string
  modelPembelajaran: string
  learningObjectives: string[]
  assessment: string
  refleksiGuru: string
  refleksiPesertaDidik: string
  pengayaanRemedial: string
  bahanBacaan: string
  glosarium: string
  createdAt: string
  createdBy: string
  status: "Draft" | "Published" | "Archived"
}

export function generateMockRPPs(count: number): RPP[] {
  const rpps: RPP[] = []
  const subjects = [
    "Matematika",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "IPA",
    "IPS",
    "Fisika",
    "Kimia",
    "Biologi",
    "Sejarah",
    "Geografi",
    "Ekonomi",
  ]

  const grades = ["VII", "VIII", "IX", "X", "XI", "XII"]
  const durations = ["2 x 45 menit", "3 x 45 menit", "4 x 45 menit"]
  const statuses: ("Draft" | "Published" | "Archived")[] = ["Draft", "Published", "Archived"]

  const modelPembelajarans = [
    "Problem Based Learning",
    "Project Based Learning",
    "Inquiry Learning",
    "Discovery Learning",
    "Cooperative Learning",
  ]

  for (let i = 0; i < count; i++) {
    const subject = faker.helpers.arrayElement(subjects)
    const grade = faker.helpers.arrayElement(grades)
    const duration = faker.helpers.arrayElement(durations)

    const title = `RPP: ${subject} untuk Kelas ${grade}`
    const createdAt = faker.date.past({ years: 1 }).toISOString()
    const createdBy = faker.person.fullName()
    const status = faker.helpers.arrayElement(statuses)

    const learningObjectives = Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () =>
      faker.lorem.sentence(),
    )

    rpps.push({
      id: `rpp-${(i + 1).toString().padStart(3, "0")}`,
      title,
      subject,
      grade,
      duration,
      identitasModule: faker.lorem.paragraph(),
      kompetensiAwal: faker.lorem.paragraph(),
      profilPelajarPancasila: faker.lorem.paragraph(),
      saranaPrasarana: faker.lorem.paragraph(),
      targetPesertaDidik: faker.lorem.paragraph(),
      modelPembelajaran: faker.helpers.arrayElement(modelPembelajarans),
      learningObjectives,
      assessment: faker.lorem.paragraph(),
      refleksiGuru: faker.lorem.paragraph(),
      refleksiPesertaDidik: faker.lorem.paragraph(),
      pengayaanRemedial: faker.lorem.paragraph(),
      bahanBacaan: faker.lorem.paragraph(),
      glosarium: faker.lorem.paragraph(),
      createdAt,
      createdBy,
      status,
    })
  }

  return rpps
}

