import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

// Use strings directly instead of enums to avoid any import issues
async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.transaction.deleteMany(),
    prisma.subscription.deleteMany(),
    prisma.achievement.deleteMany(),
    prisma.event.deleteMany(),
    prisma.attendance.deleteMany(),
    prisma.class.deleteMany(),
    prisma.syllabus.deleteMany(),
    prisma.rPP.deleteMany(),
    prisma.student.deleteMany(),
    prisma.headmaster.deleteMany(),
    prisma.teacher.deleteMany(),
    prisma.operator.deleteMany(),
    prisma.admin.deleteMany(),
    prisma.school.deleteMany(),
    prisma.user.deleteMany(),
  ])

  // Create School
  const school = await prisma.school.create({
    data: {
      name: "SMA Negeri 1 Example",
      address: "Jl. Pendidikan No. 123",
      city: "Jakarta",
      province: "DKI Jakarta",
      postalCode: "12345",
      phone: "021-1234567",
      email: "sman1@example.com",
      website: "www.sman1example.com",
      principalName: "Dr. Suharto",
      foundedYear: 1975,
      type: "PUBLIC", // Using string directly
      accreditation: "A",
      status: "ACTIVE", // Using string directly
    }
  })

  // Create Admin User
  const adminPassword = await hash('admin123', 12)
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin System",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN", // Using string directly
      phone: "081234567890",
      status: "ACTIVE", // Using string directly
      admin: {
        create: {
          permissions: ["ALL"]
        }
      }
    }
  })

  // Create Operator User
  const operatorPassword = await hash('operator123', 12)
  const operatorUser = await prisma.user.create({
    data: {
      name: "John Operator",
      email: "operator@example.com",
      password: operatorPassword,
      role: "OPERATOR", // Using string directly
      phone: "081234567891",
      status: "ACTIVE", // Using string directly
      operator: {
        create: {
          region: "Jakarta",
          company: "EdTech Solutions",
          position: "School Coordinator",
          department: "Operations",
          schoolId: school.id,
          subscription: {
            create: {
              tier: "PREMIUM", // Using string directly
              name: "Premium School Package",
              price: 1000000,
              features: ["All Features", "Premium Support", "Unlimited Storage"],
              purchaseDate: new Date(),
              expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
              status: "ACTIVE" // Using string directly
            }
          }
        }
      }
    }
  })

  // Create Teacher User
  const teacherPassword = await hash('teacher123', 12)
  const teacherUser = await prisma.user.create({
    data: {
      name: "Sarah Teacher",
      email: "teacher@example.com",
      password: teacherPassword,
      role: "TEACHER", // Using string directly
      phone: "081234567892",
      status: "ACTIVE", // Using string directly
      teacher: {
        create: {
          subject: "Mathematics",
          qualification: "Master of Education",
          experience: 5,
          schoolId: school.id
        }
      }
    }
  })

  // Create Headmaster User
  const headmasterPassword = await hash('headmaster123', 12)
  const headmasterUser = await prisma.user.create({
    data: {
      name: "David Headmaster",
      email: "headmaster@example.com",
      password: headmasterPassword,
      role: "HEADMASTER", // Using string directly
      phone: "081234567893",
      status: "ACTIVE", // Using string directly
      headmaster: {
        create: {
          schoolId: school.id
        }
      }
    }
  })

  // Create Student User
  const studentPassword = await hash('student123', 12)
  const studentUser = await prisma.user.create({
    data: {
      name: "Alice Student",
      email: "student@example.com",
      password: studentPassword,
      role: "STUDENT", // Using string directly
      phone: "081234567894",
      status: "ACTIVE", // Using string directly
      student: {
        create: {
          grade: "11",
          class: "11-A",
          age: 16,
          gender: "FEMALE", // Using string directly
          parentName: "Mr. and Mrs. Student",
          schoolId: school.id
        }
      }
    }
  })

  // Create Class
  const class1 = await prisma.class.create({
    data: {
      name: "XI IPA 1",
      grade: "11",
      academicYear: "2023/2024",
      schoolId: school.id,
      teachers: {
        connect: {
          id: (await prisma.teacher.findFirst({ where: { userId: teacherUser.id } }))!.id
        }
      },
      students: {
        connect: {
          id: (await prisma.student.findFirst({ where: { userId: studentUser.id } }))!.id
        }
      }
    }
  })

  // Create RPP
  const rpp = await prisma.rPP.create({
    data: {
      title: "Matematika Dasar - Aljabar",
      subject: "Mathematics",
      grade: "11",
      duration: "2 jam",
      identitasModule: "Modul 1: Pengenalan Aljabar",
      kompetensiAwal: "Siswa memahami konsep dasar matematika",
      learningObjectives: ["Memahami konsep aljabar", "Menyelesaikan persamaan linear"],
      status: "PUBLISHED",
      creatorId: teacherUser.id,
      teacherId: (await prisma.teacher.findFirst({ where: { userId: teacherUser.id } }))!.id
    }
  })

  // Create Syllabus
  const syllabus = await prisma.syllabus.create({
    data: {
      title: "Silabus Matematika Kelas 11",
      subject: "Mathematics",
      grade: "11",
      description: "Silabus pembelajaran matematika untuk kelas 11 semester 1",
      objectives: ["Pemahaman konsep aljabar", "Kemampuan analisis matematis"],
      topics: {
        topic1: {
          name: "Aljabar",
          duration: "4 weeks",
          subtopics: ["Persamaan Linear", "Pertidaksamaan"]
        }
      },
      resources: {
        books: ["Matematika Dasar 11", "Kumpulan Soal Matematika"],
        online: ["Khan Academy", "GeoGebra"]
      },
      assessmentMethods: ["Quiz", "Ujian Tengah Semester", "Projek"],
      status: "PUBLISHED",
      teacherId: (await prisma.teacher.findFirst({ where: { userId: teacherUser.id } }))!.id
    }
  })

  // Create Attendance
  const attendance = await prisma.attendance.create({
    data: {
      date: new Date(),
      status: "PRESENT",
      location: "Room 101",
      notes: "On time",
      userId: studentUser.id,
      studentId: (await prisma.student.findFirst({ where: { userId: studentUser.id } }))!.id
    }
  })

  // Create Event
  const event = await prisma.event.create({
    data: {
      title: "Mathematics Competition",
      description: "Annual school mathematics competition",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      location: "School Hall",
      organizer: "Mathematics Department",
      type: "ACADEMIC",
      status: "UPCOMING",
      participants: ["Class XI IPA 1", "Class XI IPA 2"],
      imageUrl: "https://example.com/event-image.jpg",
      creatorId: teacherUser.id,
      schoolId: school.id
    }
  })

  // Create Achievement
  const achievement = await prisma.achievement.create({
    data: {
      title: "First Place in Regional Mathematics Olympiad",
      level: "PROVINSI",
      date: new Date(),
      organizer: "Provincial Education Department",
      category: "AKADEMIK",
      participants: ["Alice Student"],
      coach: "Sarah Teacher",
      image: "https://example.com/achievement.jpg",
      schoolId: school.id
    }
  })

  // Create Transaction
  const transaction = await prisma.transaction.create({
    data: {
      amount: 1000000,
      description: "Premium subscription payment",
      paymentMethod: "Bank Transfer",
      status: "COMPLETED"
    }
  })

  console.log('Database seeded successfully')
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 