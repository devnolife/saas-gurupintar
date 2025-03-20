export type Teacher = {
  id: string
  name: string
  subject: string
  qualification: string
  experience: number
  contactNumber: string
  email: string
  address: string
  joinDate: string
  classes: string[]
  performance: {
    studentFeedback: number
    attendanceRate: number
    lessonCompletion: number
    overallRating: number
  }
  imageUrl: string
  bio: string
}

export const teachers: Teacher[] = [
  {
    id: "TCH001",
    name: "Dr. Bambang Suryanto",
    subject: "Mathematics",
    qualification: "Ph.D. in Mathematics",
    experience: 15,
    contactNumber: "+62 812-3456-7890",
    email: "bambang.suryanto@gurupintar.edu",
    address: "Jl. Merdeka No. 45, Jakarta",
    joinDate: "2010-08-15",
    classes: ["10A", "11B", "12A"],
    performance: {
      studentFeedback: 4.8,
      attendanceRate: 98,
      lessonCompletion: 95,
      overallRating: 4.7,
    },
    imageUrl: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Bambang is a dedicated mathematics educator with a passion for making complex concepts accessible to all students. He has published several papers on mathematics education and regularly conducts workshops for teachers.",
  },
  {
    id: "TCH002",
    name: "Siti Rahayu, M.Sc.",
    subject: "Biology",
    qualification: "M.Sc. in Biological Sciences",
    experience: 10,
    contactNumber: "+62 813-9876-5432",
    email: "siti.rahayu@gurupintar.edu",
    address: "Jl. Sudirman No. 78, Jakarta",
    joinDate: "2014-07-20",
    classes: ["9C", "10B", "11A"],
    performance: {
      studentFeedback: 4.6,
      attendanceRate: 96,
      lessonCompletion: 92,
      overallRating: 4.5,
    },
    imageUrl: "/placeholder.svg?height=100&width=100",
    bio: "Siti Rahayu is known for her interactive teaching methods and field-based learning approaches. She organizes annual biodiversity expeditions for students and has developed a comprehensive biology lab curriculum.",
  },
  {
    id: "TCH003",
    name: "Agus Wijaya, M.Ed.",
    subject: "History",
    qualification: "M.Ed. in History Education",
    experience: 12,
    contactNumber: "+62 857-1234-5678",
    email: "agus.wijaya@gurupintar.edu",
    address: "Jl. Gatot Subroto No. 34, Jakarta",
    joinDate: "2012-08-05",
    classes: ["9A", "10C", "12B"],
    performance: {
      studentFeedback: 4.7,
      attendanceRate: 97,
      lessonCompletion: 94,
      overallRating: 4.6,
    },
    imageUrl: "/placeholder.svg?height=100&width=100",
    bio: "Agus Wijaya brings history to life through storytelling and multimedia presentations. He has developed a digital archive of local historical documents that serves as a valuable resource for students and researchers alike.",
  },
  {
    id: "TCH004",
    name: "Dr. Dewi Anggraini",
    subject: "Physics",
    qualification: "Ph.D. in Physics",
    experience: 14,
    contactNumber: "+62 878-8765-4321",
    email: "dewi.anggraini@gurupintar.edu",
    address: "Jl. Thamrin No. 23, Jakarta",
    joinDate: "2011-07-25",
    classes: ["11C", "12A", "12C"],
    performance: {
      studentFeedback: 4.5,
      attendanceRate: 95,
      lessonCompletion: 96,
      overallRating: 4.6,
    },
    imageUrl: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Dewi specializes in experimental physics and has set up an advanced physics laboratory at the school. Her students consistently perform well in national science competitions and many have pursued careers in STEM fields.",
  },
  {
    id: "TCH005",
    name: "Budi Santoso, M.A.",
    subject: "English Literature",
    qualification: "M.A. in English Literature",
    experience: 8,
    contactNumber: "+62 819-2345-6789",
    email: "budi.santoso@gurupintar.edu",
    address: "Jl. Asia Afrika No. 56, Jakarta",
    joinDate: "2016-08-10",
    classes: ["9B", "10A", "11B"],
    performance: {
      studentFeedback: 4.9,
      attendanceRate: 99,
      lessonCompletion: 97,
      overallRating: 4.8,
    },
    imageUrl: "/placeholder.svg?height=100&width=100",
    bio: "Budi Santoso is a published author who brings his creative writing experience into the classroom. He runs the school's literary magazine and has helped many students publish their first works.",
  },
  {
    id: "TCH006",
    name: "Rina Wulandari, M.Sc.",
    subject: "Chemistry",
    qualification: "M.Sc. in Chemistry",
    experience: 9,
    contactNumber: "+62 838-7654-3210",
    email: "rina.wulandari@gurupintar.edu",
    address: "Jl. Diponegoro No. 89, Jakarta",
    joinDate: "2015-07-30",
    classes: ["10B", "11A", "12B"],
    performance: {
      studentFeedback: 4.4,
      attendanceRate: 94,
      lessonCompletion: 91,
      overallRating: 4.3,
    },
    imageUrl: "/placeholder.svg?height=100&width=100",
    bio: "Rina Wulandari has industrial experience in chemical engineering which she leverages to provide real-world applications in her teaching. She coordinates the annual science fair and mentors students in research projects.",
  },
  {
    id: "TCH007",
    name: "Hendra Gunawan, M.Pd.",
    subject: "Physical Education",
    qualification: "M.Pd. in Sports Science",
    experience: 11,
    contactNumber: "+62 896-5432-1098",
    email: "hendra.gunawan@gurupintar.edu",
    address: "Jl. Hayam Wuruk No. 67, Jakarta",
    joinDate: "2013-08-20",
    classes: ["9A", "9B", "9C", "10A", "10B", "10C"],
    performance: {
      studentFeedback: 4.7,
      attendanceRate: 98,
      lessonCompletion: 99,
      overallRating: 4.8,
    },
    imageUrl: "/placeholder.svg?height=100&width=100",
    bio: "Hendra is a former national athlete who brings professional sports experience to his teaching. He has revitalized the school's sports program and coached several teams to regional championships.",
  },
  {
    id: "TCH008",
    name: "Maya Kusuma, M.Kom.",
    subject: "Computer Science",
    qualification: "M.Kom. in Computer Science",
    experience: 7,
    contactNumber: "+62 877-6543-2109",
    email: "maya.kusuma@gurupintar.edu",
    address: "Jl. Imam Bonjol No. 12, Jakarta",
    joinDate: "2017-08-05",
    classes: ["10C", "11C", "12C"],
    performance: {
      studentFeedback: 4.8,
      attendanceRate: 97,
      lessonCompletion: 93,
      overallRating: 4.7,
    },
    imageUrl: "/placeholder.svg?height=100&width=100",
    bio: "Maya has worked as a software developer before transitioning to education. She has established coding clubs and hackathons at the school and maintains partnerships with tech companies for student internships.",
  },
]

export const getTeacherById = (id: string): Teacher | undefined => {
  return teachers.find((teacher) => teacher.id === id)
}

