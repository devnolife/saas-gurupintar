// Generate mock data for events
import { faker } from "@faker-js/faker"

export interface Event {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  organizer: string
  type: "Academic" | "Sport" | "Art" | "School" | "Meeting" | "Holiday"
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled"
  participants: string[]
}

export function generateMockEvents(count: number): Event[] {
  const events: Event[] = []
  const types: ("Academic" | "Sport" | "Art" | "School" | "Meeting" | "Holiday")[] = [
    "Academic",
    "Sport",
    "Art",
    "School",
    "Meeting",
    "Holiday",
  ]

  const statuses: ("Upcoming" | "Ongoing" | "Completed" | "Cancelled")[] = [
    "Upcoming",
    "Ongoing",
    "Completed",
    "Cancelled",
  ]

  const locations = [
    "Aula Sekolah",
    "Lapangan Sekolah",
    "Ruang Kelas",
    "Laboratorium",
    "Perpustakaan",
    "Gedung Olahraga",
    "Aula Kota",
    "Hotel Grand",
  ]

  const organizers = [
    "OSIS",
    "Dewan Guru",
    "Kepala Sekolah",
    "Komite Sekolah",
    "Dinas Pendidikan",
    "Kementerian Pendidikan",
    "Ekstrakurikuler",
  ]

  const academicEvents = [
    "Ujian Tengah Semester",
    "Ujian Akhir Semester",
    "Olimpiade Sekolah",
    "Lomba Cerdas Cermat",
    "Seminar Pendidikan",
    "Workshop Pembelajaran",
  ]

  const sportEvents = [
    "Pertandingan Basket",
    "Pertandingan Voli",
    "Pertandingan Futsal",
    "Lomba Lari",
    "Lomba Renang",
    "Pekan Olahraga Sekolah",
  ]

  const artEvents = ["Pentas Seni", "Festival Musik", "Lomba Tari", "Pameran Lukisan", "Drama Sekolah", "Konser Musik"]

  const schoolEvents = [
    "Upacara Bendera",
    "Rapat Komite Sekolah",
    "Pertemuan Orang Tua",
    "Wisuda",
    "Masa Orientasi Siswa",
    "Perayaan Hari Guru",
  ]

  const meetingEvents = [
    "Rapat Guru",
    "Rapat OSIS",
    "Rapat Evaluasi",
    "Rapat Kurikulum",
    "Rapat Persiapan Ujian",
    "Rapat Koordinasi",
  ]

  const holidayEvents = ["Libur Semester", "Libur Hari Raya", "Libur Nasional", "Libur Khusus", "Cuti Bersama"]

  const eventsByType = {
    Academic: academicEvents,
    Sport: sportEvents,
    Art: artEvents,
    School: schoolEvents,
    Meeting: meetingEvents,
    Holiday: holidayEvents,
  }

  for (let i = 0; i < count; i++) {
    const type = faker.helpers.arrayElement(types)
    const events = eventsByType[type]
    const title = faker.helpers.arrayElement(events)

    const startDate = faker.date
      .between({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        to: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      })
      .toISOString()

    // End date is 1-3 days after start date
    const endDate = new Date(
      new Date(startDate).getTime() + faker.number.int({ min: 1, max: 3 }) * 24 * 60 * 60 * 1000,
    ).toISOString()

    // Determine status based on dates
    let status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled"
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (end < now) {
      status = faker.helpers.arrayElement(["Completed", "Completed", "Completed", "Cancelled"])
    } else if (start > now) {
      status = "Upcoming"
    } else {
      status = "Ongoing"
    }

    const location = faker.helpers.arrayElement(locations)
    const organizer = faker.helpers.arrayElement(organizers)

    // Generate 1-50 participants based on event type
    let participantCount = 0
    if (type === "Meeting") {
      participantCount = faker.number.int({ min: 5, max: 20 })
    } else if (type === "Holiday") {
      participantCount = 0
    } else {
      participantCount = faker.number.int({ min: 10, max: 50 })
    }

    const participants = Array.from({ length: participantCount }, () => faker.person.fullName())

    events.push({
      id: i + 1,
      title,
      description: faker.lorem.paragraph(),
      startDate,
      endDate,
      location,
      organizer,
      type,
      status,
      participants,
    })
  }

  return events
}

