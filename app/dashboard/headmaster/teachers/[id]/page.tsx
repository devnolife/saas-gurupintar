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
  { date: "2023-07-10", status: "present", timeIn: "07:15", timeOut: "14:30" },
  { date: "2023-07-09", status: "present", timeIn: "07:10", timeOut: "14:30" },
  { date: "2023-07-08", status: "present", timeIn: "07:05", timeOut: "14:30" },
  { date: "2023-07-07", status: "late", timeIn: "08:20", timeOut: "14:30", reason: "Traffic jam" },
  { date: "2023-07-06", status: "present", timeIn: "07:00", timeOut: "14:30" },
  { date: "2023-07-05", status: "absent", reason: "Sick leave" },
  { date: "2023-07-04", status: "present", timeIn: "07:05", timeOut: "14:30" },
  { date: "2023-07-03", status: "present", timeIn: "07:10", timeOut: "14:30" },
  { date: "2023-07-02", status: "weekend" },
  { date: "2023-07-01", status: "weekend" },
]

// Mock schedule data
const schedule = [
  { day: "Monday", classes: ["7A (08:00-09:30)", "8B (10:00-11:30)", "9C (13:00-14:30)"] },
  { day: "Tuesday", classes: ["7A (10:00-11:30)", "9C (13:00-14:30)"] },
  { day: "Wednesday", classes: ["8B (08:00-09:30)", "7A (10:00-11:30)"] },
  { day: "Thursday", classes: ["9C (08:00-09:30)", "8B (10:00-11:30)"] },
  { day: "Friday", classes: ["7A (08:00-09:30)", "8B (10:00-11:30)"] },
]

export default function TeacherDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Teacher Profile: {teacherData.name}</h1>
      
      {/* Basic profile information would go here */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Documents section */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
          {/* Documents table would go here */}
        </div>
        
        {/* Attendance section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Attendance</h2>
          {/* Attendance list would go here */}
        </div>
      </div>
      
      {/* Schedule section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
        {/* Schedule table would go here */}
      </div>
    </div>
  )
}

