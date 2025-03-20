"use client"

// Mock teacher data
const teacherData = {
  id: 1,
  name: "Budi Santoso",
  email: "budi.santoso@example.com",
  phone: "081234567890",
  subject: "Matematika",
  classes: ["7A", "8B", "9C"],
  status: "Aktif",
  joinDate: "2018-07-15",
  lastActive: "2023-07-10",
  education: "S2 Pendidikan Matematika",
  avatarUrl: "/placeholder.svg",
  bio: "Guru matematika dengan pengalaman 10 tahun mengajar. Berfokus pada metode pembelajaran yang interaktif dan menyenangkan untuk membantu siswa memahami konsep matematika.",
  address: "Jl. Pendidikan No. 45, Kota Contoh",
  documentsCreated: 45,
  attendanceRate: 97,
  achievementsCount: 3,
  completedTrainings: 8,
}

// Mock documents data
const documents = [
  {
    id: 1,
    title: "RPP Matematika Kelas 7 - Aljabar",
    type: "RPP",
    createdAt: "2023-06-10",
    status: "approved",
    reviewedBy: "Dr. Hadi Wijaya",
  },
  {
    id: 2,
    title: "Silabus Matematika Kelas 8",
    type: "Silabus",
    createdAt: "2023-06-15",
    status: "approved",
    reviewedBy: "Dr. Hadi Wijaya",
  },
  {
    id: 3,
    title: "RPP Matematika Kelas 9 - Statistika",
    type: "RPP",
    createdAt: "2023-06-20",
    status: "pending",
    reviewedBy: "-",
  },
  {
    id: 4,
    title: "Rencana Evaluasi Pembelajaran Matematika",
    type: "Evaluasi",
    createdAt: "2023-06-25",
    status: "rejected",
    reviewedBy: "Dr. Hadi Wijaya",
    rejectionReason: "Perlu revisi pada metode evaluasi",
  },
  {
    id: 5,
    title: "Program Semester Matematika",
    type: "Prosem",
    createdAt: "2023-07-01",
    status: "approved",
    reviewedBy: "Dr. Hadi Wijaya",
  },
]

// Mock attendance data
const attendance = [
  { date: "2023-07-10", status: "present", timeIn: "07:15", timeOut: "14:30" },\
  { date: "2023-07

