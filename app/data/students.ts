export type Student = {
  id: string
  name: string
  grade: string
  class: string
  age: number
  gender: "Male" | "Female"
  parentName: string
  contactNumber: string
  address: string
  enrollmentDate: string
  attendance: number
  academicPerformance: {
    math: number
    science: number
    language: number
    socialStudies: number
    average: number
  }
  extracurricular: string[]
  imageUrl: string
}

export const students: Student[] = [
  {
    id: "STU001",
    name: "Ahmad Rizki",
    grade: "10",
    class: "A",
    age: 16,
    gender: "Male",
    parentName: "Budi Santoso",
    contactNumber: "+62 812-3456-7890",
    address: "Jl. Merdeka No. 123, Jakarta",
    enrollmentDate: "2022-07-15",
    attendance: 95,
    academicPerformance: {
      math: 85,
      science: 92,
      language: 78,
      socialStudies: 88,
      average: 85.75,
    },
    extracurricular: ["Basketball", "Debate Club"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "STU002",
    name: "Siti Nuraini",
    grade: "11",
    class: "B",
    age: 17,
    gender: "Female",
    parentName: "Dewi Kusuma",
    contactNumber: "+62 813-9876-5432",
    address: "Jl. Sudirman No. 45, Jakarta",
    enrollmentDate: "2021-07-20",
    attendance: 98,
    academicPerformance: {
      math: 95,
      science: 90,
      language: 92,
      socialStudies: 85,
      average: 90.5,
    },
    extracurricular: ["Science Club", "Student Council"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "STU003",
    name: "Rudi Hermawan",
    grade: "9",
    class: "C",
    age: 15,
    gender: "Male",
    parentName: "Agus Hermawan",
    contactNumber: "+62 857-1234-5678",
    address: "Jl. Gatot Subroto No. 78, Jakarta",
    enrollmentDate: "2023-07-10",
    attendance: 90,
    academicPerformance: {
      math: 75,
      science: 82,
      language: 88,
      socialStudies: 80,
      average: 81.25,
    },
    extracurricular: ["Soccer", "Art Club"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "STU004",
    name: "Maya Putri",
    grade: "12",
    class: "A",
    age: 18,
    gender: "Female",
    parentName: "Hendra Wijaya",
    contactNumber: "+62 878-8765-4321",
    address: "Jl. Thamrin No. 56, Jakarta",
    enrollmentDate: "2020-07-25",
    attendance: 97,
    academicPerformance: {
      math: 88,
      science: 94,
      language: 96,
      socialStudies: 92,
      average: 92.5,
    },
    extracurricular: ["Choir", "Math Olympiad"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "STU005",
    name: "Dimas Pratama",
    grade: "10",
    class: "B",
    age: 16,
    gender: "Male",
    parentName: "Eko Pratama",
    contactNumber: "+62 819-2345-6789",
    address: "Jl. Asia Afrika No. 34, Jakarta",
    enrollmentDate: "2022-07-18",
    attendance: 92,
    academicPerformance: {
      math: 90,
      science: 85,
      language: 75,
      socialStudies: 82,
      average: 83,
    },
    extracurricular: ["Robotics Club", "Swimming"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "STU006",
    name: "Anisa Rahmawati",
    grade: "11",
    class: "A",
    age: 17,
    gender: "Female",
    parentName: "Bambang Rahmawan",
    contactNumber: "+62 838-7654-3210",
    address: "Jl. Diponegoro No. 67, Jakarta",
    enrollmentDate: "2021-07-22",
    attendance: 96,
    academicPerformance: {
      math: 92,
      science: 88,
      language: 94,
      socialStudies: 90,
      average: 91,
    },
    extracurricular: ["Drama Club", "Photography"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "STU007",
    name: "Bima Arya",
    grade: "9",
    class: "B",
    age: 15,
    gender: "Male",
    parentName: "Surya Arya",
    contactNumber: "+62 896-5432-1098",
    address: "Jl. Hayam Wuruk No. 89, Jakarta",
    enrollmentDate: "2023-07-12",
    attendance: 88,
    academicPerformance: {
      math: 78,
      science: 80,
      language: 85,
      socialStudies: 75,
      average: 79.5,
    },
    extracurricular: ["Computer Club", "Badminton"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "STU008",
    name: "Putri Indah",
    grade: "12",
    class: "C",
    age: 18,
    gender: "Female",
    parentName: "Joko Susilo",
    contactNumber: "+62 877-6543-2109",
    address: "Jl. Imam Bonjol No. 23, Jakarta",
    enrollmentDate: "2020-07-28",
    attendance: 99,
    academicPerformance: {
      math: 96,
      science: 95,
      language: 90,
      socialStudies: 94,
      average: 93.75,
    },
    extracurricular: ["Student Council", "Debate Club"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
]

export const getStudentById = (id: string): Student | undefined => {
  return students.find((student) => student.id === id)
}

