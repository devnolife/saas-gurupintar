// Generate mock data for achievements
import { faker } from "@faker-js/faker"

export interface Achievement {
  id: number
  title: string
  level: "Kabupaten" | "Provinsi" | "Nasional" | "Internasional"
  date: string
  organizer: string
  category: "Akademik" | "Olahraga" | "Seni" | "Sekolah" | "Pendidikan" | "Literasi"
  participants: string[]
  coach: string
  image: string
}

export function generateMockAchievements(count: number): Achievement[] {
  const achievements: Achievement[] = []
  const levels: ("Kabupaten" | "Provinsi" | "Nasional" | "Internasional")[] = [
    "Kabupaten",
    "Provinsi",
    "Nasional",
    "Internasional",
  ]

  const categories: ("Akademik" | "Olahraga" | "Seni" | "Sekolah" | "Pendidikan" | "Literasi")[] = [
    "Akademik",
    "Olahraga",
    "Seni",
    "Sekolah",
    "Pendidikan",
    "Literasi",
  ]

  const organizers = [
    "Dinas Pendidikan Kabupaten",
    "Dinas Pendidikan Provinsi",
    "Kementerian Pendidikan",
    "LIPI",
    "KONI Kabupaten",
    "KONI Provinsi",
    "Universitas Indonesia",
    "Universitas Gadjah Mada",
  ]

  const academicCompetitions = [
    "Olimpiade Matematika",
    "Olimpiade Fisika",
    "Olimpiade Kimia",
    "Olimpiade Biologi",
    "Lomba Karya Ilmiah Remaja",
    "Debat Bahasa Inggris",
    "Lomba Cerdas Cermat",
  ]

  const sportCompetitions = [
    "Lomba Catur",
    "Lomba Lari",
    "Lomba Renang",
    "Lomba Basket",
    "Lomba Voli",
    "Lomba Futsal",
    "Lomba Badminton",
  ]

  const artCompetitions = [
    "Lomba Menulis Cerpen",
    "Lomba Baca Puisi",
    "Lomba Melukis",
    "Lomba Menyanyi",
    "Lomba Tari Tradisional",
    "Lomba Fotografi",
    "Lomba Film Pendek",
  ]

  const schoolCompetitions = [
    "Lomba Kebersihan Sekolah",
    "Lomba Sekolah Sehat",
    "Lomba Perpustakaan",
    "Lomba Lingkungan Sekolah",
    "Lomba Kantin Sehat",
  ]

  const educationCompetitions = [
    "Guru Teladan",
    "Lomba Inovasi Pembelajaran",
    "Lomba Media Pembelajaran",
    "Lomba Pengelolaan Kelas",
  ]

  const literacyCompetitions = [
    "Penulis Buku Ajar Terbaik",
    "Lomba Literasi Digital",
    "Lomba Perpustakaan Kelas",
    "Lomba Gerakan Literasi Sekolah",
  ]

  const competitionsByCategory = {
    Akademik: academicCompetitions,
    Olahraga: sportCompetitions,
    Seni: artCompetitions,
    Sekolah: schoolCompetitions,
    Pendidikan: educationCompetitions,
    Literasi: literacyCompetitions,
  }

  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement(categories)
    const competitions = competitionsByCategory[category]
    const competitionName = faker.helpers.arrayElement(competitions)

    const level = faker.helpers.arrayElement(levels)
    const position = faker.helpers.arrayElement(["Juara 1", "Juara 2", "Juara 3", "Finalis", "Peserta Terbaik"])

    const title = `${position} ${competitionName}`
    const date = faker.date.past({ years: 1 }).toISOString().split("T")[0]
    const organizer = faker.helpers.arrayElement(organizers)

    // Generate 1-3 participants
    const participantCount = faker.number.int({ min: 1, max: 3 })
    const participants = Array.from({ length: participantCount }, () => faker.person.fullName())

    const coach = faker.person.fullName()

    achievements.push({
      id: i + 1,
      title,
      level,
      date,
      organizer,
      category,
      participants,
      coach,
      image: `/placeholder.svg`,
    })
  }

  return achievements
}

