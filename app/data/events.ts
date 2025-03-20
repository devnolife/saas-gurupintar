export type SchoolEvent = {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  organizer: string
  type: "academic" | "cultural" | "sports" | "administrative" | "holiday"
  participants: string[]
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  imageUrl?: string
}

export const schoolEvents: SchoolEvent[] = [
  {
    id: "EVT001",
    title: "Annual Science Fair",
    description: "Students showcase their science projects and compete for awards in various categories including physics, chemistry, biology, and environmental science.",
    startDate: "2023-05-15T09:00:00",
    endDate: "2023-05-16T16:00:00",
    location: "School Gymnasium",
    organizer: "Science Department",
    type: "academic",
    participants: ["All Science Students", "Science Faculty", "Guest Judges"],
    status: "completed",
    imageUrl: "/placeholder.svg?height=200&width=300"
  },
  {
    id: "EVT002",
    title: "Parent-Teacher Conference",
    description: "Scheduled meetings between parents and teachers to discuss student progress, achievements, and areas for improvement.",
    startDate: "2023-09-25T13:00:00",
    endDate: "2023-09-26T19:00:00",
    location: "Classrooms",
    organizer: "School Administration",
    type: "administrative",
    participants: ["Teachers", "Parents", "School Counselors"],
    status: "upcoming"
  },
  {
    id: "EVT003",
    title: "Inter-School Basketball Tournament",
    description: "Annual basketball competition between schools in the district. Our school team will compete against five other schools for the championship.",
    startDate: "2023-10-10T08:00:00",
    endDate: "2023-10-12T17:00:00",
    location: "School Sports Complex",
    organizer: "Physical Education Department",
    type: "sports",
    participants: ["Basketball Team", "PE Teachers", "Student Supporters"],
    status: "upcoming",
    imageUrl: "/placeholder.svg?height=200&width=300"
  },
  {
    id: "EVT004",
    title: "Cultural Festival",
    description: "A celebration of cultural diversity featuring performances, food stalls, art exhibitions, and traditional costumes from various cultures represented in our school community.",
    startDate: "2023-11-05T10:00:00",
    endDate: "2023-11-05T20:00:00",
    location: "School Grounds",
    organizer: "Cultural Committee",
\

