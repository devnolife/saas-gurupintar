export interface SchoolActivity {
  id: string
  name: string
  date: string
  endDate?: string
  description: string
  location: string
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  type: "academic" | "extracurricular" | "administrative" | "holiday" | "other"
  participants?: string[]
  organizer: string
  attachments?: string[]
  media?: {
    type: "image" | "video" | "document"
    url: string
    thumbnail?: string
  }[]
}

// Mock data for school activities
export const mockSchoolActivities: SchoolActivity[] = [
  {
    id: "act-001",
    name: "Science Fair 2023",
    date: "2023-08-15",
    endDate: "2023-08-16",
    description: "Annual science fair showcasing student projects from all grades",
    location: "School Auditorium",
    status: "upcoming",
    type: "academic",
    participants: ["Grade 7-12 Students", "Science Teachers"],
    organizer: "Science Department",
    attachments: ["science-fair-schedule.pdf", "project-guidelines.pdf"],
    media: [
      {
        type: "image",
        url: "/placeholder.svg?height=300&width=400",
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "act-002",
    name: "Teacher Professional Development Workshop",
    date: "2023-07-25",
    endDate: "2023-07-27",
    description: "Three-day workshop on modern teaching methodologies",
    location: "Conference Room A",
    status: "ongoing",
    type: "administrative",
    participants: ["All Teachers", "Administrative Staff"],
    organizer: "School Principal",
    attachments: ["workshop-agenda.pdf"],
  },
  {
    id: "act-003",
    name: "End of Semester Exams",
    date: "2023-06-10",
    endDate: "2023-06-20",
    description: "Final examinations for all subjects",
    location: "All Classrooms",
    status: "completed",
    type: "academic",
    participants: ["All Students", "All Teachers"],
    organizer: "Academic Department",
    attachments: ["exam-schedule.pdf", "exam-guidelines.pdf"],
  },
  {
    id: "act-004",
    name: "School Anniversary Celebration",
    date: "2023-09-05",
    description: "Celebration of the school's 25th anniversary",
    location: "School Grounds",
    status: "upcoming",
    type: "extracurricular",
    participants: ["All Students", "All Staff", "Alumni", "Parents"],
    organizer: "Anniversary Committee",
    attachments: ["celebration-program.pdf"],
    media: [
      {
        type: "image",
        url: "/placeholder.svg?height=300&width=400",
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
      {
        type: "document",
        url: "anniversary-booklet.pdf",
      },
    ],
  },
  {
    id: "act-005",
    name: "Parent-Teacher Conference",
    date: "2023-07-08",
    description: "Biannual meeting between parents and teachers to discuss student progress",
    location: "Multiple Classrooms",
    status: "completed",
    type: "administrative",
    participants: ["All Teachers", "Parents"],
    organizer: "School Administration",
    attachments: ["conference-schedule.pdf"],
  },
]

// Function to get school activities (simulating an API call)
export function getSchoolActivities(): SchoolActivity[] {
  return mockSchoolActivities
}

// Function to get activities by status
export function getActivitiesByStatus(status: SchoolActivity["status"]): SchoolActivity[] {
  return mockSchoolActivities.filter((activity) => activity.status === status)
}

// Function to get activity by ID
export function getActivityById(id: string): SchoolActivity | undefined {
  return mockSchoolActivities.find((activity) => activity.id === id)
}

