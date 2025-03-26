const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
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
    ]);

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
        type: "PUBLIC",
        accreditation: "A",
        status: "ACTIVE",
      }
    });

    // Create Admin User
    const adminPassword = await hash('admin123', 12);
    const adminUser = await prisma.user.create({
      data: {
        name: "Admin System",
        email: "admin@example.com",
        password: adminPassword,
        role: "ADMIN",
        phone: "081234567890",
        status: "ACTIVE",
        admin: {
          create: {
            permissions: ["ALL"]
          }
        }
      }
    });

    // Create Operator User
    const operatorPassword = await hash('operator123', 12);
    const operatorUser = await prisma.user.create({
      data: {
        name: "John Operator",
        email: "operator@example.com",
        password: operatorPassword,
        role: "OPERATOR",
        phone: "081234567891",
        status: "ACTIVE",
        operator: {
          create: {
            region: "Jakarta",
            company: "EdTech Solutions",
            position: "School Coordinator",
            department: "Operations",
            schoolId: school.id,
            subscription: {
              create: {
                tier: "PREMIUM",
                name: "Premium School Package",
                price: 1000000,
                features: ["All Features", "Premium Support", "Unlimited Storage"],
                purchaseDate: new Date(),
                expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                status: "ACTIVE"
              }
            }
          }
        }
      }
    });

    // Create Teacher User
    const teacherPassword = await hash('teacher123', 12);
    const teacherUser = await prisma.user.create({
      data: {
        name: "Sarah Teacher",
        email: "teacher@example.com",
        password: teacherPassword,
        role: "TEACHER",
        phone: "081234567892",
        status: "ACTIVE",
        teacher: {
          create: {
            subject: "Mathematics",
            qualification: "Master of Education",
            experience: 5,
            schoolId: school.id
          }
        }
      }
    });

    // Create Headmaster User
    const headmasterPassword = await hash('headmaster123', 12);
    const headmasterUser = await prisma.user.create({
      data: {
        name: "David Headmaster",
        email: "headmaster@example.com",
        password: headmasterPassword,
        role: "HEADMASTER",
        phone: "081234567893",
        status: "ACTIVE",
        headmaster: {
          create: {
            schoolId: school.id
          }
        }
      }
    });

    // Create Student User
    const studentPassword = await hash('student123', 12);
    const studentUser = await prisma.user.create({
      data: {
        name: "Alice Student",
        email: "student@example.com",
        password: studentPassword,
        role: "STUDENT",
        phone: "081234567894",
        status: "ACTIVE",
        student: {
          create: {
            grade: "11",
            class: "11-A",
            age: 16,
            gender: "FEMALE",
            parentName: "Mr. and Mrs. Student",
            schoolId: school.id
          }
        }
      }
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 